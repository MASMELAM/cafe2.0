import React, { useState } from 'react';
import textBubble from '../assets/textbubble.png';
import useTypewriter from '../hooks/useTypewriter.js';

export default function InstructionBox({ 
  steps = [],
  speed = 40,
  setCurrentStep,
  currentStep = 0,
  lockUp = false,
  style = {}
 }) {
  const displayedText = useTypewriter(steps[currentStep] || '', speed);
  
  // const [index, setIndex] = useState(0);
 

  const nextStep = () => {
    if (!lockUp && currentStep < steps.length - 1) {
      setCurStep(s = s + 1);

    }

      
  };

  return (
    <div style={{ position: 'relative', width: '1000px', ...style }}>

      <img
        src={textBubble}
        alt="Instruction Bubble"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75%',
          fontSize: '1.9rem',
          color: '#7a685d',
          textAlign: 'left',
          lineHeight: '1.35em',
          fontFamily: "'Comic Neue', cursive",
          pointerEvents: 'none',
        }}
      >
        {displayedText}
      </div>



      {currentStep < steps.length - 1 && (
        <button
          onClick={nextStep}
          disabled={lockUp}

          style={{
            
            position: 'absolute',
            bottom: '50%',
            right: '20px',
            transform: 'translateY(-50%)',

            background: '#a58a7a',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1.2rem',
            fontSize: '1.1rem',
            cursor: lockUp ? 'default' : 'pointer',
            opacity: lockUp ? 0.5 : 1,
            transition: '0.3s',
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}
