import React, { useState, useEffect, useRef } from 'react';
import useMousePosition from '../hooks/useMousePosition';
import background from '../assets/backgroundimage.jpg';
import textBubble from '../assets/textbubble.png';
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';
import cat3 from '../assets/cat3.png';
import cat4 from '../assets/cat4.png';
import cat5 from '../assets/cat5.png';

export default function Game() {
  const mouse = useMousePosition();
  const containerRef = useRef(null);

  const SECTION_WIDTH = window.innerWidth;
  const SECTION_HEIGHT = window.innerHeight;

  const TOTAL_COLS = 3;
  const TOTAL_ROWS = 2;

  const WORLD_WIDTH = TOTAL_COLS * SECTION_WIDTH;
  const WORLD_HEIGHT = TOTAL_ROWS * SECTION_HEIGHT;

  // current section indices (0-indexed)
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  // store offset for camera transform
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // prevents repeat-trigger while holding on edge
  const [canMove, setCanMove] = useState(true);

  // moves camera to new section smoothly
  const moveToSection = (newCol, newRow) => {
    const clampedCol = Math.max(0, Math.min(TOTAL_COLS - 1, newCol));
    const clampedRow = Math.max(0, Math.min(TOTAL_ROWS - 1, newRow));

    setCol(clampedCol);
    setRow(clampedRow);
    setOffsetX(-clampedCol * SECTION_WIDTH);
    setOffsetY(-clampedRow * SECTION_HEIGHT);
  };

  useEffect(() => {
    if (!canMove) {
      // wait until cursor leaves edge before allowing another move
      if (
        mouse.x > 0 &&
        mouse.x < window.innerWidth - 1 &&
        mouse.y > 0 &&
        mouse.y < window.innerHeight - 1
      ) {
        setCanMove(true);
      }
      return;
    }

    let moveH = 0;
    let moveV = 0;

    // detect edge touches
    if (mouse.x <= 0) moveH = -1; // left edge
    if (mouse.x >= window.innerWidth - 1) moveH = 1; // right edge
    if (mouse.y <= 0) moveV = -1; // top edge
    if (mouse.y >= window.innerHeight - 1) moveV = 1; // bottom edge

    if (moveH !== 0 || moveV !== 0) {
      moveToSection(col + moveH, row + moveV);
      setCanMove(false);
    }
  }, [mouse, canMove, col, row]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          backgroundImage: `url(${background})`,
          backgroundSize: `${WORLD_WIDTH}px ${WORLD_HEIGHT}px`,
          backgroundPosition: 'center',
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: 'transform 0.4s ease-in-out', // smooth quick jump
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/*section labels for clarity */}
        {[...Array(TOTAL_ROWS * TOTAL_COLS)].map((_, i) => {
          const r = Math.floor(i / TOTAL_COLS);
          const c = i % TOTAL_COLS;
          const sectionNumber = i + 1;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: r * SECTION_HEIGHT,
                left: c * SECTION_WIDTH,
                width: SECTION_WIDTH,
                height: SECTION_HEIGHT,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '3rem',
                color: 'white',
                textShadow: '2px 2px 4px black',
              }}
            >
              Section {sectionNumber}

              {/* show the text bubble only in Section 3 */}
              {sectionNumber === 3 && (
                <img
                  src={textBubble}
                  alt="Text Bubble"
                  style={{
                    position: 'absolute',
                    top: '400px',     // adjust the up/down of the text bubble
                    left: '250px',    // adjust the left/right of text bubble
                    width: '1100px',   // tweak the size of text bubble
                    height: 'auto',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
