import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import christoSelfie from "./images/selfie_1.png";

function App() {

  const [showHint, setShowHint] = useState(true);

  const hints = [
    "Ahoy there!",
    "check 1",
    "check 1 2",
    "it's alot about the bass, about the bass...",
    "less trebble", 
  ];

  return (
    <div className="App">
      <h1> react-hints-component </h1>
      {showHint && <ActorHints 
        actorName={'Christo'}
        hints={hints}
        actorImageUrl={christoSelfie}
        onAllHintsRead={function (): void {
          setShowHint(false);
        } } onExitClicked={function (): void {
          setShowHint(false);
        } } 
        hintUserReadingTimeInMs={1500} />}
    </div>
  );
}

export default App;
