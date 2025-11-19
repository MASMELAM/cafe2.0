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

// import utinsils 
import bowlImg from '../assets/bowl.png';
import bakingTrayImg from '../assets/baking_tray.png';
import knifeImg from '../assets/knife.png';
import muffinTrayImg from '../assets/muffin_tray.png';
import rollingPinImg from '../assets/rolling_pin.png';
import woodenSpoonImg from '../assets/wooden_spoon.png';

// import uncooked
import bowlCinnamonRollsImg from '../assets/bowl_cinnamon_rolls.png';
import bowlPeppermintImg from '../assets/bowl_peppermint_brownies.png';
import bowlRedVelvetCupcakes from '../assets/bowl_redvelvet_cupcakes.png';
import bowlSprinkleCookies from '../assets/bowl_sprinkle_cookies.png';
import trayBrowniesImg from '../assets/tray_unbaked_brownies.png';
import trayCinnamonRollsImg from '../assets/tray_unbaked_cinnamon_rolls.png';
import trayCookiesImg from '../assets/tray_unbaked_cookies.png';
import trayRedVelvetCupcakesImg from '../assets/tray_unbaked_redvelvet_cupcakes.png';

// import cooked
import finishedBrowniesImg from '../assets/finished_brownies.png';
import finishedCinnamonRollsImg from '../assets/finished_cinnamon_rolls.png';
import finishedRedVelvetCupcakesImg from '../assets/finished_redvelvet_cupcakes.png';
import finishedSprinkleCookiesImg from '../assets/finished_sprinkle_cookies.png';


export default function Game() {
  const mouse = useMousePosition();
  const containerRef = useRef(null);

  const SECTION_WIDTH = window.innerWidth;
  const SECTION_HEIGHT = window.innerHeight;

  const TOTAL_COLS = 3;
  const TOTAL_ROWS = 2;

  const WORLD_WIDTH = TOTAL_COLS * SECTION_WIDTH;
  const WORLD_HEIGHT = TOTAL_ROWS * SECTION_HEIGHT;

  // ingredients: x,y are LOCAL (within section) until dragged
  const [ingredients, setIngredients] = useState([
    // Section 2 top shelf
    { name: 'eggTray', img: eggTrayImg, section: 2, x: 100, y: 50, addedToBowl: false, draggable: false, world: false },
    { name: 'egg1', img: egg1Img, section: 2, x: 140, y: 60, addedToBowl: false, draggable: true, world: false },
    { name: 'egg2', img: egg2Img, section: 2, x: 190, y: 60, addedToBowl: false, draggable: true, world: false },
    { name: 'egg3', img: egg3Img, section: 2, x: 240, y: 60, addedToBowl: false, draggable: true, world: false },
    { name: 'egg4', img: egg4Img, section: 2, x: 290, y: 60, addedToBowl: false, draggable: true, world: false },

    { name: 'creamCheese', img: creamCheeseImg, section: 2, x: 400, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'peppermintExtract', img: peppermintExtractImg, section: 2, x: 550, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'redDye', img: redDyeImg, section: 2, x: 700, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'vanillaExtract', img: vanillaExtractImg, section: 2, x: 850, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'cocoaPowder', img: cocoaPowderImg, section: 2, x: 1000, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'cinnamonSticks', img: cinnamonSticksImg, section: 2, x: 1150, y: 50, addedToBowl: false, draggable: true, world: false },

    // Section 2 bottom shelf
    { name: 'flour', img: flourImg, section: 2, x: 100, y: 200, addedToBowl: false, draggable: true, world: false },
    { name: 'sugar', img: sugarImg, section: 2, x: 250, y: 200, addedToBowl: false, draggable: true, world: false },
    { name: 'brownSugar', img: brownSugarImg, section: 2, x: 400, y: 200, addedToBowl: false, draggable: true, world: false },
    { name: 'butter', img: butterImg, section: 2, x: 550, y: 200, addedToBowl: false, draggable: true, world: false },
    { name: 'bakingPowder', img: bakingPowderImg, section: 2, x: 700, y: 200, addedToBowl: false, draggable: true, world: false },
    { name: 'salt', img: saltImg, section: 2, x: 850, y: 200, addedToBowl: false, draggable: true, world: false },

    // Section 5 shelf
    { name: 'chocolateChips', img: chocolateChipsImg, section: 5, x: 100, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'sprinkles', img: sprinklesImg, section: 5, x: 250, y: 50, addedToBowl: false, draggable: true, world: false },
    { name: 'crushedPeppermint', img: crushedPeppermintImg, section: 5, x: 400, y: 50, addedToBowl: false, draggable: true, world: false },
  ]);

  // bowl object
  const [bowl, setBowl] = useState({
    img: bowlImg,
    section: 2,
    x: SECTION_WIDTH / 2 - 50,
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

  // drag states
  const [dragging, setDragging] = useState(null); // name of ingredient
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // track added ingredients
  const [addedIngredients, setAddedIngredients] = useState([]);

  // camera movement (unchanged)
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
      prev.map((it) => (it.name === name ? { ...it, x: worldX, y: worldY, world: true } : it))
    );

    // set dragging and offset in world-space
    setDragOffset({ x: pointerWorldX - worldX, y: pointerWorldY - worldY });
    setDragging(name);
  };

  // pointer move attached to top-level div so it works while dragging
  const handlePointerMove = (e) => {
    if (!dragging) return;
    const pointerWorldX = e.clientX - offsetX;
    const pointerWorldY = e.clientY - offsetY;

    setIngredients((prev) =>
      prev.map((it) =>
        it.name === dragging && it.draggable
          ? { ...it, x: pointerWorldX - dragOffset.x, y: pointerWorldY - dragOffset.y, world: true }
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

    // compute ingredient's world position (ing.x, ing.y)
    const ingWorldX = ing.x;
    const ingWorldY = ing.y;

    // bowl world pos
    const bowlWorldX = bowl.x + ((bowl.section - 1) % TOTAL_COLS) * SECTION_WIDTH;
    const bowlWorldY = bowl.y + Math.floor((bowl.section - 1) / TOTAL_COLS) * SECTION_HEIGHT;
    const bowlRight = bowlWorldX + bowl.width;
    const bowlBottom = bowlWorldY + bowl.height;

    // simple collision: ingredient center inside bowl rectangle
    const ingCenterX = ingWorldX + 50; // assume 100px width when rendered
    const ingCenterY = ingWorldY + 50;

    if (ingCenterX >= bowlWorldX && ingCenterX <= bowlRight && ingCenterY >= bowlWorldY && ingCenterY <= bowlBottom) {
      // add to backend tracking
      setAddedIngredients((prev) => [...prev, ing.name]);

      // remove from ingredients (so it fully disappears)
      setIngredients((prev) => prev.filter((i) => i.name !== ing.name));
    } else {
      // If not added, keep it in world mode at the dropped world coords.
      // Optionally you could snap it back into section-local coords by computing new section,
      // but leaving as world coords is fine and preserves where user dropped it.
      setIngredients((prev) => prev.map((i) => (i.name === ing.name ? { ...i, world: true } : i)));
    }

    setDragging(null);
  };

  // Attach pointer listeners only while dragging (we use top-level handlers on the container div too,
  // but this ensures mouse-up outside the div also counts)
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
        {ingredients.map((i) => {
          // skip added items (they're removed from list when added)
          // render position depends on whether the item is in world mode or still section-local
          const isDragging = dragging === i.name;
          const left = i.world ? i.x : i.x + ((i.section - 1) % TOTAL_COLS) * SECTION_WIDTH;
          const top = i.world ? i.y : i.y + Math.floor((i.section - 1) / TOTAL_COLS) * SECTION_HEIGHT;

          return (
            <img
              key={i.name}
              src={i.img}
              alt={i.name}
              onPointerDown={(e) => handlePointerDown(e, i.name)}
              style={{
                position: 'absolute',
                left: left,
                top: top,
                width: 100,
                height: 100,
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