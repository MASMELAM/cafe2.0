import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css'
import Game from './components/Game.jsx';
import Menu from './components/Menu.jsx';


function App() {
  const [count, setCount] = useState(false)

  return (
    <>
      {!count ? <Menu onStart={() => setCount(true)} /> : <Game />}

      {/* <div className="App">
        <Game />
      </div> */}
    </>
  )
}

export default App
