import React, { useState } from 'react';
import textBubble from '../assets/textbubble.png';
import useTypewriter from '../hooks/useTypewriter.js';

export default function InstructionBox({ steps = [], speed = 40, style = {} }) {
  const [index, setIndex] = useState(0);
  const displayedText = useTypewriter(steps[index] || '', speed);

  const nextStep = () => {
    if (index < steps.length - 1) setIndex(index + 1);
  };

  return (
    <div style={{ position: 'relative', ...style }}>
      <img
        src={textBubble}
        alt="Instruction Bubble"
        style={{
          width: '100%', height: 'auto', display: 'block',
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          fontSize: '1.8rem',
          color: '#333',
          textAlign: 'center',
          lineHeight: '1.4em',
        }}
      >
        {displayedText}
      </div>

      {index < steps.length - 1 && (
        <button
          onClick={nextStep}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '12%',
            background: '#f4d03f',
            border: 'none',
            borderRadius: '12px',
            padding: '0.6rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}
