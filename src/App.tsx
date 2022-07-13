import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import christoSelfie from "./images/selfie_1.png";

function App() {

  const hints = [
    "Ahoy there!",
    "I'm a software developer",
    "have a lovely day!"
  ]
  return (
    <div className="App">
      <h1> react-hints-component </h1>
      <ActorHints 
        actorName={'Christo'}
        hints={hints}
        actorImageUrl={christoSelfie}
        onAllHintsRead={function (): void {
          throw new Error('Function not implemented.');
        } } onExitClicked={function (): void {
          throw new Error('Function not implemented.');
        } } 
        hintUserReadingTimeInMs={2000} />
    </div>
  );
}

export default App;
