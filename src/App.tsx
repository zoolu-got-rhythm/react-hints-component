import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import christoPic from "./images/selfie_1.png";
import alissaPic from "./images/alissa.png";
import georgePic from "./images/george.png";

import { TextScroll } from './hints/TextScroll';

function App() {

  const [alissaHint, setAlissaHint] = useState(true);
  const [alissaHint2, setAlissaHint2] = useState(false);
  const [alissaHint3, setAlissaHint3] = useState(false);
  const [georgeHint, setGeorgeHint] = useState(false);
  const [georgeHint2, setGeorgeHint2] = useState(false);
  const [georgeHint3, setGeorgeHint3] = useState(false);


  const hintsEn = [
    "Hello everyone!",
    "welcome to Virtus Browser Broadcast #1",
    "we have some exciting updates and developments to tell you about!",
    "i'm gunna hand it over to Virtus Tech CEO George Bellwood to tell you more",
    "over to you george!"
  ];

  const hintsWe = [
    "welsh hello there!",
    "welsh i'm christo, a software enginner from cardiff, south wales",
    "welsh blah blahhhh blah blahh blah blah blah, blah blahhhh blah"
  ]

  const alissaHints = {
    "en": hintsEn,
    "we": hintsWe
  }


  const georgeHintsEn = [
    "thanks Alissa!",
    "we have two main upcomming projects i'd like to briefly tell you about",
    "the first project is Digi-Deck™, A SAAS tool for building training simulations",
    "development on Digi-Deck™ started in December 2022, and we can't wait to share more with you!",
    "the second project is...",
    "*drum roll............*"
  ]
  const georgeHints = {
    "en": georgeHintsEn,
    "we": []
  }
    
  

  const [language, setLanguageKey] = useState<string>("en");

  const [useWelsh, setUseWelsh] = useState<boolean>(false);
  useEffect(() => {
    setLanguageKey(useWelsh ? "we" : "en");
  }, [useWelsh]);

  // const [currentText, setCurrentText] = useState(hints[0]);


  return (
    <div className="App">
      {/* <button onClick={() => {
        setUseWelsh(!useWelsh)}}> toggle language </button>  */}
      <h1 id="title"> react hints component demo: Virtus Browser Broadcast </h1>
      {alissaHint && <ActorHints 
        top={100}
        left={20}
        actorName={'Alissa, PR Virtus Tech'}
        autoMode={true}
        hintsObj={alissaHints}
        languageKey={language}
        actorImageUrl={alissaPic}
        onAllHintsRead={function (): void {
          // setAlissaHint(false);
          setGeorgeHint(true);
          window.setTimeout(() => {
            setAlissaHint(false);
          }, 2500)

        } } onExitClicked={function (): void {
          // setAlissaHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"lime"}
        imageScalePercentage="105%"
        pictureFrameSize={85}
        flipImage={true}
        hintUserReadingTimeInMs={2000} />}

      {georgeHint && <ActorHints 
        top={225}
        left={40}
        actorName={'George, CEO Virtus Tech'}
        autoMode={true}
        hintsObj={georgeHints}
        languageKey={language}
        actorImageUrl={georgePic}
        onAllHintsRead={function (): void {
          // setShowHint(false);
          setAlissaHint2(true);
          
        } } onExitClicked={function (): void {
          // setShowHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"cyan"}
        imageScalePercentage="105%"
        pictureFrameSize={85}
        flipImage={false}
        hintUserReadingTimeInMs={2000} />}

      {alissaHint2 && <ActorHints 
        top={100}
        left={20}
        actorName={'Alissa, PR Virtus Tech'}
        autoMode={true}
        hintsObj={{
          "en": ["hurry up george!!!"]
        }}
        languageKey={language}
        actorImageUrl={alissaPic}
        onAllHintsRead={function (): void {
          // setAlissaHint(false);
          // setGeorgeHint(true);
          // window.setTimeout(() => {
            setGeorgeHint(false);
            setAlissaHint2(false);
            setGeorgeHint2(true);
          // }, 1500)

        } } onExitClicked={function (): void {
          // setAlissaHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"lime"}
        imageScalePercentage="105%"
        pictureFrameSize={85}
        flipImage={true}
        hintUserReadingTimeInMs={2000} />}

      {georgeHint2 && <ActorHints 
        top={225}
        left={40}
        actorName={'George, CEO Virtus Tech'}
        autoMode={true}
        hintsObj={{"en": [
          "ok ok ok ok!!",
          "we are working in collaboration with the NHS to create a project called...",
          "Welsh Virtual Hospital™",
          "we are aiming to create a virtual training platform eco-system for the doctors and many hospitals of the NHS",
          "stay tuned for more updates coming in january 2023"
        ]}}
        languageKey={language}
        actorImageUrl={georgePic}
        onAllHintsRead={function (): void {
          // setShowHint(false);
          // setAlissaHint2(true);
          setAlissaHint3(true);
          window.setTimeout(() => {
            setGeorgeHint2(false);
          }, 3000);
          
        } } onExitClicked={function (): void {
          // setShowHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"cyan"}
        imageScalePercentage="105%"
        pictureFrameSize={85}
        flipImage={false}
        hintUserReadingTimeInMs={2000} />}

      {alissaHint3 && <ActorHints 
        top={100}
        left={20}
        actorName={'Alissa, PR Virtus Tech'}
        autoMode={true}
        hintsObj={{
          "en": [
            "Exciting stuff!! thank you george",
            "this concludes Virtus Browser Broadcast #1",
            "until next time! take care!!"
          ]
        }}
        languageKey={language}
        actorImageUrl={alissaPic}
        onAllHintsRead={function (): void {
          // setAlissaHint(false);
          // setGeorgeHint(true);
          // window.setTimeout(() => {
            
          // }, 1500)
          setGeorgeHint3(true);
          

        } } onExitClicked={function (): void {
          // setAlissaHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"lime"}
        imageScalePercentage="105%"
        pictureFrameSize={85}
        flipImage={true}
        hintUserReadingTimeInMs={2000} />}

    {georgeHint3 && <ActorHints 
        top={225}
        left={40}
        actorName={'George, CEO Virtus Tech'}
        autoMode={true}
        hintsObj={{"en": [
          "bye guys! thanks for watching Virtus Broadcast #1 from your browser"
        ]}}
        languageKey={language}
        actorImageUrl={georgePic}
        onAllHintsRead={function (): void {
          // setShowHint(false);
          // setAlissaHint2(true);
          setAlissaHint3(false);
          setGeorgeHint3(false);
          
        } } onExitClicked={function (): void {
          // setShowHint(false);
        } } 
        prideColoursOn={false}
        hintReadingTimeIndicatorColour={"cyan"}
        imageScalePercentage="105%"
        pictureFrameSize={85}
        flipImage={false}
        hintUserReadingTimeInMs={3000} />}
    </div>
  );
}

export default App;
