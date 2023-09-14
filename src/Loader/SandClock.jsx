import React from 'react';
import './sandClock.css';
import { CgSpinnerAlt } from 'react-icons/cg';


const SandClockSpinner = ({ isWider }) => {
  return (
    <div className={`sand-clock-spinner ${isWider ? 'wider-spinner' : ''}`}>
      <div className="icon-container">
        <CgSpinnerAlt className="spinning-sand-clock" />
      </div>
    </div>
  );
};

export default SandClockSpinner;
