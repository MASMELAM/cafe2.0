// export default function GameTitle() {

//     return (
//         <div className="game-title"> <h1>Cattuccino Café</h1>
//         </div>
//     )
// }

import React from 'react';
import {useRef} from 'react';


export default function Menu({ onStart }) {
    return (
        <div
            style={{

                width: '100vw',
                height: '100vh',
                background: '#C79D7E',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'stretch',
                // #C79D7E


                fontFamily: 'Notable", sans-serif',
                fontweight: 400,
                fontstyle: 'normal',
                color: '#1f0113ff',
            }}
        >
            <h1
                style={{
                    fontSize: '5rem',
                    marginBottom: '0rem',

                }}
            >
                Cattuchino Cafe 🍰
            </h1>
            {/* <h2
                style={{
                    fontSize: 50,
                    marginBottom: '0rem',

                }}
            >
                Cattuchino Cafe 🍰
            </h2>

            <h3
                style={{
                    fontsize: 30,

                }}
            >
                Cattuchino Cafe 🍰
            </h3> */}

           

            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#100101ff' }}>
                Prepare for the Holiday Rush!
            </p>

            <button
                onClick={onStart}
                style={{
                    background: '#af764eff',
                    border: 'curved',
                    borderRadius: '5px',
                    padding: '1rem 1rem',
                    fontFamile: 'Notable", sans-serif',
                    fontSize: '3.5rem',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                onMouseOver={e => (e.target.style.background = '#ed8bd3ff')}
                onMouseOut={e => (e.target.style.background = '#af764eff')}
            >
                Start Game
            </button>

            <p style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.7 }}>
                © 2025 GWC cafe2.0
            </p>
        </div>
    );
}
