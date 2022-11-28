import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import christoSelfie from "./images/selfie_1.png";
import { TextScroll } from './hints/TextScroll';

function App() {

  const [showHint, setShowHint] = useState(true);

  const hintsEn = [
    "Hello there!",
    "I'm Christo, a software engineer from Cardiff, South Wales.",
  ];

  const hintsWe = [
    "welsh hello there!",
    "welsh i'm christo, a software enginner from cardiff, south wales"
  ]

  const [selectedHints, setSelectedHints] = useState<string[]>(hintsEn);

  const [useWelsh, setUseWelsh] = useState<boolean>(false);
  useEffect(() => {
    setSelectedHints(useWelsh ? hintsWe : hintsEn);
  }, [useWelsh])

  // const [currentText, setCurrentText] = useState(hints[0]);


  return (
    <div className="App">
      <button onClick={() => {
        setUseWelsh(!useWelsh)}}> toggle language </button> 
      <h1> react hints component </h1>
      {showHint && <ActorHints 
        top={100}
        left={20}
        actorName={'Christo, Virtus Tech'}
        autoMode={true}
        hints={selectedHints}
        actorImageUrl={christoSelfie}
        onAllHintsRead={function (): void {
          // setShowHint(false);
        } } onExitClicked={function (): void {
          setShowHint(false);
        } } 
        prideColoursOn={true}
        hintReadingTimeIndicatorColour={"lime"}
        imageScalePercentage="125%"
        pictureFrameSize={85}
        hintUserReadingTimeInMs={2500} />}
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
