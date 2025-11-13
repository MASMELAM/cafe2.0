import React from "react";
import textBubble from "../assets/text-bubble.png";
import { useTypewriter } from "react-simple-typewriter";
export default function Instructions() {
    return (
    <div style={{ position: 'relative', ...style }}>
      {/* Text bubble background */}
      <img
        src={textBubble}
        alt="Instruction Bubble"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Typewriter text */}
      <div
        style={{
          position: 'absolute',
          top: '45%', // adjust based on your bubble image
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
    </div>
  );
}

            
