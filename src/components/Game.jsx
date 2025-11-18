import React, { useState, useEffect, useRef } from 'react';
import useMousePosition from '../hooks/useMousePosition';
import background from '../assets/backgroundimage.jpg';
import textBubble from '../assets/textbubble.png';
import catImg from '../assets/cat.png';
import mouthOpen from '../assets/mouthopen.png';
import mouthClosed from '../assets/mouthclosed.png';

// ingredient exports
import bakingPowderImg from '../assets/baking_powder.png';
import brownSugarImg from '../assets/brown_sugar.png';
import butterImg from '../assets/butter.png';
import chocolateChipsImg from '../assets/chocolate_chips.png';
import cinnamonSticksImg from '../assets/cinnamon_sticks.png';
import cocoaPowderImg from '../assets/cocoa_powder.png';
import creamCheeseImg from '../assets/cream_cheese.png';
import crushedPeppermintImg from '../assets/crushed_peppermints.png';
import eggsImg from '../assets/eggs.png';
import flourImg from '../assets/flour.png';
import peppermintExtractImg from '../assets/peppermint_extract.png';
import redDyeImg from '../assets/red_dye.png';
import saltImg from '../assets/salt.png';
import sprinklesImg from '../assets/sprinkles.png';
import sugarImg from '../assets/sugar.png';
import vanillaExtractImg from '../assets/vanilla_extract.png';
import bowlImg from '../assets/bowl.png'; // added bowl image

export default function Game() {
  const mouse = useMousePosition();
  const containerRef = useRef(null);

  const SECTION_WIDTH = window.innerWidth;
  const SECTION_HEIGHT = window.innerHeight;

  const TOTAL_COLS = 3;
  const TOTAL_ROWS = 2;

  const WORLD_WIDTH = TOTAL_COLS * SECTION_WIDTH;
  const WORLD_HEIGHT = TOTAL_ROWS * SECTION_HEIGHT;

  // ingredients array
  const [ingredients, setIngredients] = useState([
    // Section 2 top shelf
    { name: 'eggs', img: eggsImg, section: 2, x: 100, y: 50, addedToBowl: false },
    { name: 'creamCheese', img: creamCheeseImg, section: 2, x: 250, y: 50, addedToBowl: false },
    { name: 'peppermintExtract', img: peppermintExtractImg, section: 2, x: 400, y: 50, addedToBowl: false },
    { name: 'redDye', img: redDyeImg, section: 2, x: 550, y: 50, addedToBowl: false },
    { name: 'vanillaExtract', img: vanillaExtractImg, section: 2, x: 700, y: 50, addedToBowl: false },
    { name: 'cocoaPowder', img: cocoaPowderImg, section: 2, x: 850, y: 50, addedToBowl: false },
    { name: 'cinnamonSticks', img: cinnamonSticksImg, section: 2, x: 1000, y: 50, addedToBowl: false },

    // Section 2 bottom shelf
    { name: 'flour', img: flourImg, section: 2, x: 100, y: 200, addedToBowl: false },
    { name: 'sugar', img: sugarImg, section: 2, x: 250, y: 200, addedToBowl: false },
    { name: 'brownSugar', img: brownSugarImg, section: 2, x: 400, y: 200, addedToBowl: false },
    { name: 'butter', img: butterImg, section: 2, x: 550, y: 200, addedToBowl: false },
    { name: 'bakingPowder', img: bakingPowderImg, section: 2, x: 700, y: 200, addedToBowl: false },
    { name: 'salt', img: saltImg, section: 2, x: 850, y: 200, addedToBowl: false },

    // Section 5 shelf
    { name: 'chocolateChips', img: chocolateChipsImg, section: 5, x: 100, y: 50, addedToBowl: false },
    { name: 'sprinkles', img: sprinklesImg, section: 5, x: 250, y: 50, addedToBowl: false },
    { name: 'crushedPeppermint', img: crushedPeppermintImg, section: 5, x: 400, y: 50, addedToBowl: false },
  ]);

  // bowl object
  const [bowl, setBowl] = useState({
    img: bowlImg,
    section: 2,
    x: SECTION_WIDTH / 2 - 50, // bottom middle of section 2
    y: SECTION_HEIGHT - 150,
    width: 100,
    height: 100,
  });

  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [canMove, setCanMove] = useState(true);
  const [mouthOpenState, setMouthOpenState] = useState(true);

  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const moveToSection = (newCol, newRow) => {
    const clampedCol = Math.max(0, Math.min(TOTAL_COLS - 1, newCol));
    const clampedRow = Math.max(0, Math.min(TOTAL_ROWS - 1, newRow));

    setCol(clampedCol);
    setRow(clampedRow);
    setOffsetX(-clampedCol * SECTION_WIDTH);
    setOffsetY(-clampedRow * SECTION_HEIGHT);
  };

  const EDGE_THRESHOLD = 50;

  useEffect(() => {
    if (!canMove) {
      if (
        mouse.x > EDGE_THRESHOLD &&
        mouse.x < window.innerWidth - EDGE_THRESHOLD &&
        mouse.y > EDGE_THRESHOLD &&
        mouse.y < window.innerHeight - EDGE_THRESHOLD
      ) {
        setCanMove(true);
      }
      return;
    }

    let moveH = 0;
    let moveV = 0;

    if (mouse.x <= EDGE_THRESHOLD) moveH = -1;
    if (mouse.x >= window.innerWidth - EDGE_THRESHOLD) moveH = 1;
    if (mouse.y <= EDGE_THRESHOLD) moveV = -1;
    if (mouse.y >= window.innerHeight - EDGE_THRESHOLD) moveV = 1;

    if (moveH !== 0 || moveV !== 0) {
      moveToSection(col + moveH, row + moveV);
      setCanMove(false);
    }
  }, [mouse, canMove, col, row]);

  useEffect(() => {
    let timeout;
    const toggleMouth = () => {
      setMouthOpenState((prev) => !prev);
      timeout = setTimeout(toggleMouth, Math.random() * 9000 + 1000);
    };
    toggleMouth();
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseDown = (name) => {
    const ing = ingredients.find((i) => i.name === name);
    setDragging(name);
    setDragOffset({ x: mouse.x - (ing.x + ((ing.section - 1) % TOTAL_COLS) * SECTION_WIDTH),
                    y: mouse.y - (ing.y + Math.floor((ing.section - 1) / TOTAL_COLS) * SECTION_HEIGHT) });
  };

  const handleMouseUp = () => {
    if (dragging) {
      const ing = ingredients.find((i) => i.name === dragging);
      // check if over bowl
      const bowlLeft = bowl.x + ((bowl.section - 1) % TOTAL_COLS) * SECTION_WIDTH;
      const bowlTop = bowl.y + Math.floor((bowl.section - 1) / TOTAL_COLS) * SECTION_HEIGHT;
      const bowlRight = bowlLeft + bowl.width;
      const bowlBottom = bowlTop + bowl.height;

      if (
        mouse.x >= bowlLeft &&
        mouse.x <= bowlRight &&
        mouse.y >= bowlTop &&
        mouse.y <= bowlBottom
      ) {
        // mark ingredient as added to bowl
        setIngredients((prev) =>
          prev.map((i) =>
            i.name === dragging ? { ...i, addedToBowl: true } : i
          )
        );
      }

      setDragging(null);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setIngredients((prev) =>
          prev.map((i) =>
            i.name === dragging
              ? { ...i, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
              : i
          )
        );
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset]);

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
          transition: 'transform 0.4s ease-in-out',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
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

              {/* Section 3: Cat, Mouth, Text Bubble */}
              {sectionNumber === 3 && (
                <>
                  <img
                    src={catImg}
                    alt="Cat"
                    style={{
                      position: 'absolute',
                      top: '130px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '400px',
                      height: 'auto',
                    }}
                  />
                  <img
                    src={mouthOpenState ? mouthOpen : mouthClosed}
                    alt="Mouth"
                    style={{
                      position: 'absolute',
                      top: '200px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '250px',
                      height: 'auto',
                      pointerEvents: 'none',
                    }}
                  />
                  <img
                    src={textBubble}
                    alt="Text Bubble"
                    style={{
                      position: 'absolute',
                      top: '400px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '1100px',
                      height: 'auto',
                    }}
                  />
                </>
              )}
            </div>
          );
        })}

        {/* Bowl */}
        <img
          src={bowl.img}
          alt="bowl"
          style={{
            position: 'absolute',
            left: bowl.x + ((bowl.section - 1) % TOTAL_COLS) * SECTION_WIDTH,
            top: bowl.y + Math.floor((bowl.section - 1) / TOTAL_COLS) * SECTION_HEIGHT,
            width: bowl.width,
            height: bowl.height,
          }}
        />

        {/* Ingredients */}
        {ingredients.map(
          (i) =>
            !i.addedToBowl && (
              <img
                key={i.name}
                src={i.img}
                alt={i.name}
                onMouseDown={() => handleMouseDown(i.name)}
                style={{
                  position: 'absolute',
                  left:
                    i.x +
                    ((dragging === i.name ? 0 : ((i.section - 1) % TOTAL_COLS) * SECTION_WIDTH)),
                  top:
                    i.y +
                    ((dragging === i.name ? 0 : Math.floor((i.section - 1) / TOTAL_COLS) * SECTION_HEIGHT)),
                  width: 100,
                  height: 100,
                  cursor: 'grab',
                }}
              />
            )
        )}
      </div>
    </div>
  );
}
