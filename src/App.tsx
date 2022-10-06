import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import christoSelfie from "./images/selfie_1.png";
import { TextScroll } from './hints/TextScroll';

function App() {

  const [showHint, setShowHint] = useState(true);

  const hints = [
    "Ahoy there!",
    "check 1",
  ];

  // const [currentText, setCurrentText] = useState(hints[0]);


  return (
    <div className="App">
      <h1> react hints component </h1>
      {showHint && <ActorHints 
        top={100}
        left={20}
        actorName={'Christo, Virtus'}
        autoMode={true}
        hints={hints}
        actorImageUrl={christoSelfie}
        onAllHintsRead={function (): void {
          // setShowHint(false);
        } } onExitClicked={function (): void {
          setShowHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"lime"}
        imageScalePercentage="115%"
        pictureFrameSize={125}
        hintUserReadingTimeInMs={1500} />}
        {/* <h1>
          <TextScroll 
            text={currentText} 
            delayBetweenEachCharInMs={1000/40}
            unscrolledTextStylesObj={{opacity: 0}} />
        </h1>
        <button onClick={() => {

          let text = currentText;
          while(text === currentText){
            text = hints[Math.floor(Math.random() * hints.length)]
          }
          setCurrentText(text);
        }}> change text </button> */}
    </div>
  );
}

export default App;
