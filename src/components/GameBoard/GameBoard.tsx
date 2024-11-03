import React, { useState } from 'react';
import style from './Gameboard.module.css';
import { IPosition } from '../../interfaces/IPosition';
import Player from '../Player/Player';
import useGameLogic from '../hooks/useGameLogic';
import { INumPlayer } from '../../interfaces/INumPlayer';
import { IPlayer } from '../../interfaces/IPlayer';
import Barrier from '../Barrier/Barrier';

export default function GameBoard() {
  const [player1Pos, setPlayer1Pos] = useState<IPosition>({ x: 0, y: 4 });
  const [player2Pos, setPlayer2Pos] = useState<IPosition>({ x: 8, y: 4 });
  const [currentPlayer, setCurrentPlayer] = useState<INumPlayer>({ numPlayer: 1 });

  const player1: IPlayer = {
    position: player1Pos,
    barriersLeft: 8,
  };

  const player2: IPlayer = {
    position: player2Pos,
    barriersLeft: 8,
  };

  useGameLogic({ currentPlayer, setCurrentPlayer, player1, player2, setPlayer1Pos, setPlayer2Pos });

  const renderRow = (y: number) => {
    return (
      <div className={style.row}>
        {Array.from({ length: 9 }, (_, x) => renderCell({ x, y }))}
      </div>
    );
  };

  const renderCell = (position: IPosition) => {
    let player = null;

    if (player1Pos.x === position.x && player1Pos.y === position.y) {
      player = 1;
    } else if (player2Pos.x === position.x && player2Pos.y === position.y) {
      player = 2;
    }

    return (
      <div className={style.cell}>
        {player ? (player === 1 ? <Player numPlayer={1} /> : <Player numPlayer={2} />) : null}
      </div>
    );
  };

  return (
    <div className="container">
      <Barrier barriersLeft={player1.barriersLeft} orientation='vertical' onClick={()=>{}} />
      <div className={style.canvas}>
        <h2 className={`${style['turn-order']} ${currentPlayer.numPlayer === 1 ? style['turn-order--blue'] : style['turn-order--red']}`}>
          Ход {currentPlayer.numPlayer === 1 ? "синих" : "красных"}
        </h2>
        <div className={style['game-board']}>
          {Array.from({ length: 9 }, (_, y) => renderRow(y))}
        </div>
      </div>
      <Barrier barriersLeft={player2.barriersLeft} orientation='vertical' onClick={()=>{}} />
    </div>
  );
}
/*
import { useState, useEffect } from 'react';

const GameBoard1 = () => {
  const [player1Pos, setPlayer1Pos] = useState({ x: 0, y: 4 });
  const [player2Pos, setPlayer2Pos] = useState({ x: 8, y: 4 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [barriers, setBarriers] = useState([]); // Барьеры
  const [player1BarriersLeft, setPlayer1BarriersLeft] = useState(8);
  const [player2BarriersLeft, setPlayer2BarriersLeft] = useState(8);

  // Функция для установки барьера
  const placeBarrier = (x, y, orientation) => {
    // Проверка: если барьер не выходит за границы и не закрывает путь
    if (canPlaceBarrier(x, y, orientation)) {
      setBarriers([...barriers, { x, y, orientation }]);
      if (currentPlayer === 1) {
        setPlayer1BarriersLeft(player1BarriersLeft - 1);
      } else {
        setPlayer2BarriersLeft(player2BarriersLeft - 1);
      }
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  // Проверка на возможность установки барьера
  const canPlaceBarrier = (x, y, orientation) => {
    // Проверка, что барьер не перекрывает путь полностью и не выходит за границы
    // (Пока упрощенная логика, можно доработать)
    if (orientation === 'horizontal' && y < 8) return true;
    if (orientation === 'vertical' && x < 8) return true;
    return false;
  };

  const handleKeyDown = (e) => {
    if (currentPlayer === 1) {
      movePlayer(e, player1Pos, setPlayer1Pos);
    } else {
      movePlayer(e, player2Pos, setPlayer2Pos);
    }
  };

  const movePlayer = (e, playerPos, setPlayerPos) => {
    const { x, y } = playerPos;
    switch (e.key) {
      case 'ArrowUp':
        if (x > 0) setPlayerPos({ x: x - 1, y });
        break;
      case 'ArrowDown':
        if (x < 8) setPlayerPos({ x: x + 1, y });
        break;
      case 'ArrowLeft':
        if (y > 0) setPlayerPos({ x, y: y - 1 });
        break;
      case 'ArrowRight':
        if (y < 8) setPlayerPos({ x, y: y + 1 });
        break;
      case 'b': // "b" для установки барьера
        if (currentPlayer === 1 && player1BarriersLeft > 0) {
          placeBarrier(x, y, 'horizontal'); // Пример: горизонтальный барьер
        } else if (currentPlayer === 2 && player2BarriersLeft > 0) {
          placeBarrier(x, y, 'horizontal'); // Пример: горизонтальный барьер
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPlayer, player1Pos, player2Pos, player1BarriersLeft, player2BarriersLeft]);

  // Рендер клетки, включая барьеры
  const renderCell = (x, y) => {
    let player = null;

    if (player1Pos.x === x && player1Pos.y === y) {
      player = 'P1';
    } else if (player2Pos.x === x && player2Pos.y === y) {
      player = 'P2';
    }

    // Проверяем наличие барьеров
    const barrier = barriers.find(barrier => barrier.x === x && barrier.y === y);

    return (
      <div className="cell" key={`${x}-${y}`}>
        {player ? <div className="player">{player}</div> : null}
        {barrier ? <div className={`barrier-${barrier.orientation}`}></div> : null}
      </div>
    );
  };

  const renderRow = (rowIdx) => {
    const cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(renderCell(rowIdx, i));
    }
    return (
      <div className="row" key={rowIdx}>
        {cells}
      </div>
    );
  };

  return (
    <div className="game-board">
      {Array.from({ length: 9 }, (_, idx) => renderRow(idx))}
      <div className="info">
        <p>Игрок 1 барьеры: {player1BarriersLeft}</p>
        <p>Игрок 2 барьеры: {player2BarriersLeft}</p>
      </div>
    </div>
  );
};

export GameBoard1;*/
