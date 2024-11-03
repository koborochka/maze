/*import { IPlayer } from './../../interfaces/IPlayer';
import { INumPlayer } from './../../interfaces/INumPlayer';
import { useEffect, useState } from 'react';
import { INumPlayer } from '../../interfaces/INumPlayer';
import { IPlayer } from '../../interfaces/IPlayer';

const useGameLogic = ({currentPlayer, player1, player2}:{
  currentPlayer: INumPlayer;
  player1 : IPlayer;
  player2 : IPlayer,
}) => {
  // const [players, setPlayers] = useState([
  //   { x: 0, y: 4, barriersLeft: 8 },
  //   { x: 8, y: 4, barriersLeft: 8 }
  // ]);

  // const [player1BarriersLeft, setPlayer1BarriersLeft] = useState(8);
  // const [player2BarriersLeft, setPlayer2BarriersLeft] = useState(8);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPlayer, player1.position, player2.position]);

  // Логика перемещения, установки барьеров и смены хода
  const movePlayer = (e, playerPos, setPlayerPos, opponentPos) => {
    const { x, y } = playerPos;
    const { x: opponentX, y: opponentY } = opponentPos;
  
    switch (e.key) {
      case 'ArrowUp':
        if (x > 0 && !(opponentX === x - 1 && opponentY === y)) {
          setPlayerPos({ x: x - 1, y });
        } else if (opponentX === x - 1 && opponentY === y && x > 1) {
          // Прыжок через соперника
          setPlayerPos({ x: x - 2, y });
        }
        break;
      case 'ArrowDown':
        if (x < 8 && !(opponentX === x + 1 && opponentY === y)) {
          setPlayerPos({ x: x + 1, y });
        } else if (opponentX === x + 1 && opponentY === y && x < 7) {
          setPlayerPos({ x: x + 2, y });
        }
        break;
      case 'ArrowLeft':
        if (y > 0 && !(opponentX === x && opponentY === y - 1)) {
          setPlayerPos({ x, y: y - 1 });
        } else if (opponentX === x && opponentY === y - 1 && y > 1) {
          setPlayerPos({ x, y: y - 2 });
        }
        break;
      case 'ArrowRight':
        if (y < 8 && !(opponentX === x && opponentY === y + 1)) {
          setPlayerPos({ x, y: y + 1 });
        } else if (opponentX === x && opponentY === y + 1 && y < 7) {
          setPlayerPos({ x, y: y + 2 });
        }
        break;
      default:
        break;
    }
  };
  
  // const placeBarrier = (x, y, orientation) => {
  //   // Проверка: если барьер не выходит за границы и не закрывает путь
  //   if (canPlaceBarrier(x, y, orientation)) {
  //     setBarriers([...barriers, { x, y, orientation }]);
  //     if (currentPlayer === 1) {
  //       setPlayer1BarriersLeft(player1BarriersLeft - 1);
  //     } else {
  //       setPlayer2BarriersLeft(player2BarriersLeft - 1);
  //     }
  //     setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  //   }
  // };


  return { players, barriers, currentPlayer, movePlayer, placeBarrier };
};

export default useGameLogic;*/


import { useEffect, useState } from 'react';
import { IPlayer } from '../../interfaces/IPlayer';
import { INumPlayer } from '../../interfaces/INumPlayer';
import { IPosition } from '../../interfaces/IPosition';

interface GameLogicParams {
  currentPlayer: INumPlayer;
  setCurrentPlayer: (newNum: INumPlayer) => void;
  player1: IPlayer;
  player2: IPlayer;
  setPlayer1Pos: (newPos: IPosition) => void;
  setPlayer2Pos: (newPos: IPosition) => void;
}

interface GameLogicReturn {
  // Define the return types for players, barriers, etc.
  movePlayer: (e: KeyboardEvent, playerPos: any, setPlayerPos: any, opponentPos: any) => void;
  // Uncomment and define the types for these if needed
  // placeBarrier: (x: number, y: number, orientation: string) => void;
}

const useGameLogic = ({ currentPlayer, setCurrentPlayer, player1, player2, setPlayer1Pos, setPlayer2Pos }: GameLogicParams): GameLogicReturn => {

  useEffect(() => {
    //считывать только нужные
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentPlayer.numPlayer === 1 ) {       
        movePlayer(e, player1.position, setPlayer1Pos, player2.position);
        setCurrentPlayer({numPlayer: 2})
      } else {
        movePlayer(e, player2.position, setPlayer2Pos, player1.position);
        setCurrentPlayer({numPlayer: 1})
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [player1.position, player2.position]);

  const movePlayer = (e: KeyboardEvent, playerPos: IPosition, setPlayerPos: (newPos: IPosition) => void, opponentPos: IPosition) => {
    const { x, y } = playerPos;
   // const { x: opponentX, y: opponentY } = opponentPos;
  
    switch (e.key) {
      case 'ArrowUp':
        //if (x > 0 && !(opponentX === x - 1 && opponentY === y)) {
          setPlayerPos({ x, y: y - 1});
        // } else if (opponentX === x - 1 && opponentY === y && x > 1) {
        //   setPlayerPos({ x, y: y - 2 });
        //}
        break;
      case 'ArrowDown':
       //if (x < 8 && !(opponentX === x + 1 && opponentY === y)) {
          setPlayerPos({ x, y: y + 1 });
        // } else if (opponentX === x + 1 && opponentY === y && x < 7) {
        //   setPlayerPos({ x, y: y + 2 });
        // }
        break;
      case 'ArrowLeft':
       //if (y > 0 && !(opponentX === x && opponentY === y - 1)) {
          setPlayerPos({ x: x - 1, y });
        // } else if (opponentX === x && opponentY === y - 1 && y > 1) {
        //   setPlayerPos({ x, y: y - 2 });
        // }
        break;
      case 'ArrowRight':
        //if (y < 8 && !(opponentX === x && opponentY === y + 1)) {
          setPlayerPos({ x: x + 1, y });
        // } else if (opponentX === x && opponentY === y + 1 && y < 7) {
        //   setPlayerPos({ x, y: y + 2 });
        // }
        break;
      default:
        break;
    }
  };
  
  return { movePlayer };
};

export default useGameLogic;