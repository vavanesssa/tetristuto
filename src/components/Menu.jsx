import React, { useEffect, useState } from 'react';
import ParticleEffectButton from 'react-particle-effect-button';
import useSound from 'use-sound';
import startSfx from '../sounds/start.mp3';

import './Menu.css';

const Menu = ({ onClick }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setStartAnimation(true);
  };

  const [play] = useSound(startSfx);

  const handleAnimationComplete = () => {
    setIsHidden(true);
    console.log('animation completed');
    onClick();
  };

  return (
    <div className="Menu">
      {!isHidden && (
        <ParticleEffectButton
          color="#f9748f"
          duration={800}
          easing="easeOutSine"
          hidden={startAnimation}
          onClick={handleClick}
          onComplete={handleAnimationComplete}
        >
          <button
            className="Button"
            onClick={() => {
              handleClick();
              play();
            }}
          >
            START GAME
          </button>
        </ParticleEffectButton>
      )}
    </div>
  );
};

export default Menu;
