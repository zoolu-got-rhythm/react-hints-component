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
    "blah blahhhh blah blahh blah blah blah, blah blahhhh blah"
  ];

  const hintsWe = [
    "welsh hello there!",
    "welsh i'm christo, a software enginner from cardiff, south wales",
    "welsh blah blahhhh blah blahh blah blah blah, blah blahhhh blah"
  ]

  const hints = {
    "en": hintsEn,
    "we": hintsWe
  }
    
  

  const [language, setLanguageKey] = useState<string>("en");

  const [useWelsh, setUseWelsh] = useState<boolean>(false);
  useEffect(() => {
    setLanguageKey(useWelsh ? "we" : "en");
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
        hintsObj={hints}
        languageKey={language}
        actorImageUrl={christoSelfie}
        onAllHintsRead={function (): void {
          // setShowHint(false);
        } } onExitClicked={function (): void {
          setShowHint(false);
        } } 
        prideColoursOn={false}
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
