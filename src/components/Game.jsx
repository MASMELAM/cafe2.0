import React, { useState, useEffect, useRef } from 'react';
import useMousePosition from '../hooks/useMousePosition';

import background from '../assets/backgroundimage.jpg';
import textBubble from '../assets/textbubble.png';
import catImg from '../assets/cat.png';
import mouthOpen from '../assets/mouthopen.png';
import mouthClosed from '../assets/mouthclosed.png';
import menuBubbleImg from '../assets/menu_bubble.png';

// ingredient images
import bakingPowderImg from '../assets/baking_powder.png';
import brownSugarImg from '../assets/brown_sugar.png';
import butterImg from '../assets/butter.png';
import chocolateChipsImg from '../assets/chocolate_chips.png';
import cinnamonSticksImg from '../assets/cinnamon_sticks.png';
import cocoaPowderImg from '../assets/cocoa_powder.png';
import creamCheeseImg from '../assets/cream_cheese.png';
import crushedPeppermintImg from '../assets/crushed_peppermint.png';
import eggTrayImg from '../assets/egg_tray.png';
import egg1Img from '../assets/egg1.png';
import egg2Img from '../assets/egg2.png';
import egg3Img from '../assets/egg3.png';
import egg4Img from '../assets/egg4.png';
import flourImg from '../assets/flour.png';
import peppermintExtractImg from '../assets/peppermint_extract.png';
import milkImg from '../assets/milk.png';
import redDyeImg from '../assets/red_dye.png';
import saltImg from '../assets/salt.png';
import sprinklesImg from '../assets/sprinkles.png';
import sugarImg from '../assets/sugar.png';
import vanillaExtractImg from '../assets/vanilla_extract.png';

// utensils
import bowlImg from '../assets/bowl.png';
import bakingTrayImg from '../assets/baking_tray.png';
import knifeImg from '../assets/knife.png';
import muffinTrayImg from '../assets/muffin_tray.png';
import rollingPinImg from '../assets/rolling_pin.png';
import woodenSpoonImg from '../assets/wooden_spoon.png';

// uncooked bowls / trays (currently unused in this snippet, keeping imports)
import bowlCinnamonRollsImg from '../assets/bowl_cinnamon_rolls.png';
import bowlPeppermintImg from '../assets/bowl_peppermint_brownies.png';
import bowlRedVelvetCupcakes from '../assets/bowl_redvelvet_cupcakes.png';
import bowlSprinkleCookies from '../assets/bowl_sprinkle_cookies.png';
import trayBrowniesImg from '../assets/tray_unbaked_brownies.png';
import trayCinnamonRollsImg from '../assets/tray_unbaked_cinnamon_rolls.png';
import trayCookiesImg from '../assets/tray_unbaked_cookies.png';
import trayRedVelvetCupcakesImg from '../assets/tray_unbaked_redvelvet_cupcakes.png';

// cooked (also unused here, keeping imports)
import finishedBrowniesImg from '../assets/finished_brownies.png';
import finishedCinnamonRollsImg from '../assets/finished_cinnamon_rolls.png';
import finishedRedVelvetCupcakesImg from '../assets/finished_redvelvet_cupcakes.png';
import finishedSprinkleCookiesImg from '../assets/finished_sprinkle_cookies.png';

export default function Game() {
  const mouse = useMousePosition();
  const containerRef = useRef(null);

  // Layout
  const SECTION_WIDTH = window.innerWidth;
  const SECTION_HEIGHT = window.innerHeight;

  const TOTAL_COLS = 3;
  const TOTAL_ROWS = 2;

  const WORLD_WIDTH = TOTAL_COLS * SECTION_WIDTH;
  const WORLD_HEIGHT = TOTAL_ROWS * SECTION_HEIGHT;

  // Bowl object
  const [bowl, setBowl] = useState({
    img: bowlImg,
    section: 2, // middle-left? (since sections are 1..6 laid Left->Right, Top->Bottom)
    x: SECTION_WIDTH / 2 - 135,
    y: SECTION_HEIGHT - 220,
    width: 300,
    height: 200,
  });

  // Ingredients (including utensils you want draggable)
  // NOTE: Each item now has width/height so you can adjust per-item easily.
  const [ingredients, setIngredients] = useState([
    // ----- Section 2: top shelf -----
    { name: 'eggTray', img: eggTrayImg, section: 2, x: 100, y: 60, width: 300, height: 100, addedToBowl: false, draggable: false, world: false },
    { name: 'egg1', img: egg1Img, section: 2, x: 100, y: 60, width: 300, height: 100, addedToBowl: false, draggable: true, world: false },
    { name: 'egg2', img: egg2Img, section: 2, x: 100, y: 60, width: 300, height: 100, addedToBowl: false, draggable: true, world: false },
    { name: 'egg3', img: egg3Img, section: 2, x: 100, y: 60, width: 300, height: 100, addedToBowl: false, draggable: true, world: false },
    { name: 'egg4', img: egg4Img, section: 2, x: 100, y: 60, width: 300, height: 100, addedToBowl: false, draggable: true, world: false },
    { name: 'creamCheese', img: creamCheeseImg, section: 2, x: 425, y: 50, width: 250, height: 115, addedToBowl: false, draggable: true, world: false },
    { name: 'peppermintExtract', img: peppermintExtractImg, section: 2, x: 700, y: 90, width: 40, height: 65, addedToBowl: false, draggable: true, world: false },
    { name: 'redDye', img: redDyeImg, section: 2, x: 755, y: 85, width: 40, height: 70, addedToBowl: false, draggable: true, world: false },
    { name: 'vanillaExtract', img: vanillaExtractImg, section: 2, x: 815, y: 20, width: 70, height: 140, addedToBowl: false, draggable: true, world: false },
    { name: 'cocoaPowder', img: cocoaPowderImg, section: 2, x: 910, y: 40, width: 180, height: 125, addedToBowl: false, draggable: true, world: false },
    { name: 'cinnamonSticks', img: cinnamonSticksImg, section: 2, x: 1100, y: 40, width: 200, height: 120, addedToBowl: false, draggable: true, world: false },
    { name: 'sprinkles', img: sprinklesImg, section: 2, x: 1315, y: 70, width: 70, height: 90, addedToBowl: false, draggable: true, world: false },


    // ----- Section 2: bottom shelf -----
    { name: 'flour', img: flourImg, section: 2, x: 125, y: 195, width: 230, height: 200, addedToBowl: false, draggable: true, world: false },
    { name: 'sugar', img: sugarImg, section: 2, x: 370, y: 210, width: 190, height: 180, addedToBowl: false, draggable: true, world: false },
    { name: 'brownSugar', img: brownSugarImg, section: 2, x: 580, y: 210, width: 190, height: 180, addedToBowl: false, draggable: true, world: false },
    { name: 'milk', img: milkImg, section: 2, x: 800, y: 190, width: 130, height: 210, addedToBowl: false, draggable: true, world: false },
    { name: 'bakingPowder', img: bakingPowderImg, section: 2, x: 955, y: 295, width: 100, height: 100, addedToBowl: false, draggable: true, world: false },
    { name: 'salt', img: saltImg, section: 2, x: 1065, y: 305, width: 70, height: 85, addedToBowl: false, draggable: true, world: false },
    { name: 'butter', img: butterImg, section: 2, x: 1150, y: 285, width: 250, height: 110, addedToBowl: false, draggable: true, world: false },

    // ----- Wooden spoon next to bowl (draggable) -----
    {
      name: 'woodenSpoon',
      img: woodenSpoonImg,
      section: 2,
      x: SECTION_WIDTH / 2 + 160, // to the right of the bowl
      y: SECTION_HEIGHT - 150,
      width: 240,
      height: 100,
      addedToBowl: false,
      draggable: true,
      world: false,
    },

    // ----- Section 5: top shelf -----
    { name: 'chocolateChips', img: chocolateChipsImg, section: 5, x: 130, y: 230, width: 220, height: 220, addedToBowl: false, draggable: true, world: false },
    { name: 'crushedPeppermint', img: crushedPeppermintImg, section: 5, x: 420, y: 285, width: 180, height: 160, addedToBowl: false, draggable: true, world: false },

    // ----- Section 5: bottom shelf -----
    { name: 'bakingTray', img: bakingTrayImg, section: 5, x: 130, y: 550, width: 330, height: 170, addedToBowl: false, draggable: true, world: false },
    // slightly overlapping the baking tray:
    { name: 'muffinTray', img: muffinTrayImg, section: 5, x: 162, y: 540, width: 270, height: 100, addedToBowl: false, draggable: true, world: false },
    { name: 'rollingPin', img: rollingPinImg, section: 5, x: 500, y: 600, width: 360, height: 80, addedToBowl: false, draggable: true, world: false },
    { name: 'knife', img: knifeImg, section: 5, x: 900, y: 580, width: 320, height: 80, addedToBowl: false, draggable: true, world: false },
  ]);

  const [col, setCol] = useState(2);
  const [row, setRow] = useState(0);
  const [offsetX, setOffsetX] = useState(-2 * SECTION_WIDTH);
  const [offsetY, setOffsetY] = useState(0);
  const [canMove, setCanMove] = useState(false);
  const [mouthOpenState, setMouthOpenState] = useState(true);

  // drag states
  const [dragging, setDragging] = useState(null); // name of ingredient being dragged
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // track added ingredients
  const [addedIngredients, setAddedIngredients] = useState([]);

  // camera movement
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
    // Allow camera to move WHILE dragging (so you can carry items across sections).
    // When not dragging, keep the original "safe zone to re-enable moves" behavior.
    if (!dragging && !canMove) {
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
      // While dragging, don't lock movement—keep moving as edges are hit.
      if (!dragging) setCanMove(false);
    }
  }, [mouse, canMove, col, row, dragging]);

  useEffect(() => {
    let timeout;
    const toggleMouth = () => {
      setMouthOpenState((prev) => !prev);
      timeout = setTimeout(toggleMouth, Math.random() * 9000 + 1000);
    };
    toggleMouth();
    return () => clearTimeout(timeout);
  }, []);

  // Convert a local (section-relative) coordinate to world coordinate
  const localToWorld = (i) => {
    const colIndex = (i.section - 1) % TOTAL_COLS;
    const rowIndex = Math.floor((i.section - 1) / TOTAL_COLS);
    return {
      x: i.x + colIndex * SECTION_WIDTH,
      y: i.y + rowIndex * SECTION_HEIGHT,
    };
  };

  // ----- Drag handlers -----
  const handlePointerDown = (e, name) => {
    e.preventDefault();
    const ing = ingredients.find((i) => i.name === name);
    if (!ing || ing.draggable === false) return;

    // compute pointer world coords
    const pointerWorldX = e.clientX - offsetX;
    const pointerWorldY = e.clientY - offsetY;

    // compute ingredient world coords (if not already in world mode)
    let worldX = ing.world ? ing.x : localToWorld(ing).x;
    let worldY = ing.world ? ing.y : localToWorld(ing).y;

    // mark ingredient as world-mode so rendering uses world coords while dragging
    setIngredients((prev) =>
      prev.map((it) =>
        it.name === name ? { ...it, x: worldX, y: worldY, world: true } : it
      )
    );

    // set dragging and offset in world-space
    setDragOffset({ x: pointerWorldX - worldX, y: pointerWorldY - worldY });
    setDragging(name);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const pointerWorldX = e.clientX - offsetX;
    const pointerWorldY = e.clientY - offsetY;

    setIngredients((prev) =>
      prev.map((it) =>
        it.name === dragging && it.draggable
          ? {
              ...it,
              x: pointerWorldX - dragOffset.x,
              y: pointerWorldY - dragOffset.y,
              world: true,
            }
          : it
      )
    );
  };

  const handlePointerUp = (e) => {
    if (!dragging) return;

    // find the ingredient (should be in world mode)
    const ing = ingredients.find((i) => i.name === dragging);
    if (!ing) {
      setDragging(null);
      return;
    }

    // ingredient world position
    const ingWorldX = ing.x;
    const ingWorldY = ing.y;

    // bowl world pos
    const bowlWorldX =
      bowl.x + ((bowl.section - 1) % TOTAL_COLS) * SECTION_WIDTH;
    const bowlWorldY =
      bowl.y + Math.floor((bowl.section - 1) / TOTAL_ROWS) * SECTION_HEIGHT;
    const bowlRight = bowlWorldX + bowl.width;
    const bowlBottom = bowlWorldY + bowl.height;

    // collision: ingredient center inside bowl rectangle
    const ingWidth = ing.width ?? 100;
    const ingHeight = ing.height ?? 100;
    const ingCenterX = ingWorldX + ingWidth / 2;
    const ingCenterY = ingWorldY + ingHeight / 2;

    if (
      ingCenterX >= bowlWorldX &&
      ingCenterX <= bowlRight &&
      ingCenterY >= bowlWorldY &&
      ingCenterY <= bowlBottom
    ) {
      // add to backend tracking
      setAddedIngredients((prev) => [...prev, ing.name]);

      // remove from ingredients (so it fully disappears)
      setIngredients((prev) => prev.filter((i) => i.name !== ing.name));
    } else {
      // Keep it in world mode at dropped coords (so it can live anywhere in the kitchen)
      setIngredients((prev) =>
        prev.map((i) => (i.name === ing.name ? { ...i, world: true } : i))
      );
    }

    setDragging(null);
  };

  // Attach pointer listeners to window while dragging
  useEffect(() => {
    if (!dragging) return;
    const onPointerMove = (e) => handlePointerMove(e);
    const onPointerUp = (e) => handlePointerUp(e);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [dragging, dragOffset, offsetX, offsetY, ingredients]);

  // RENDER
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
            top: bowl.y + Math.floor((bowl.section - 1) / TOTAL_ROWS) * SECTION_HEIGHT,
            width: bowl.width,
            height: bowl.height,
          }}
        />

        {/* Ingredients (and draggable utensils) */}
        {ingredients.map((i) => {
          const isDragging = dragging === i.name;
          const left = i.world
            ? i.x
            : i.x + ((i.section - 1) % TOTAL_COLS) * SECTION_WIDTH;
          const top = i.world
            ? i.y
            : i.y + Math.floor((i.section - 1) / TOTAL_COLS) * SECTION_HEIGHT;

          return (
            <img
              key={i.name}
              src={i.img}
              alt={i.name}
              onPointerDown={(e) => handlePointerDown(e, i.name)}
              style={{
                position: 'absolute',
                left,
                top,
                width: i.width ?? 100,
                height: i.height ?? 100,
                cursor: i.draggable === false ? 'default' : 'grab',
                zIndex: isDragging ? 999 : 2,
                userSelect: 'none',
                touchAction: 'none',
              }}
              draggable={false}
            />
          );
        })}
      </div>
    </div>
  );
}
