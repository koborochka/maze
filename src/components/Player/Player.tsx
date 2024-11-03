import React from 'react';
import { INumPlayer } from '../../interfaces/INumPlayer';
import './Player.css'


const Player: React.FC<INumPlayer> = ({ numPlayer }) => {
  return (
    <div className={`player player--${numPlayer}`}></div>
  );
};

export default Player;