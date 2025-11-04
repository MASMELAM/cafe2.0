import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css'
import Game from './components/Game.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Game />
      </div>
    </>
  )
}

export default App
