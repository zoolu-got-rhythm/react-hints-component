import { useEffect, useState } from 'react';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import alissaPic from "./images/alissa.png";
import georgePic from "./images/george.png";

function App() {

  const [alissaHint, setAlissaHint] = useState(true);
  const [alissaHint2, setAlissaHint2] = useState(false);
  const [alissaHint3, setAlissaHint3] = useState(false);
  const [georgeHint, setGeorgeHint] = useState(false);
  const [georgeHint2, setGeorgeHint2] = useState(false);
  const [georgeHint3, setGeorgeHint3] = useState(false);
    
  const [language, setLanguageKey] = useState<string>("en");

  const [useWelsh, setUseWelsh] = useState<boolean>(false);
  useEffect(() => {
    setLanguageKey(useWelsh ? "we" : "en");
  }, [useWelsh]);

  return (
    <div className="App">
      <h1 id="title"> react hints component demo: Virtus Browser Broadcast </h1>
      {alissaHint && <ActorHints 
        top={100}
        left={20}
        actorName={'Alissa, PR Virtus Tech'}
        autoMode={true}
        hintsObj={{"en": [
          "Hello everyone!",
          "welcome to Virtus Browser Broadcast #1",
          "we have some exciting updates and developments to tell you about!",
          "i'm gunna hand it over to Virtus Tech CEO George Bellwood to tell you more",
          "over to you george!"
        ]}}
        languageKey={language}
        actorImageUrl={alissaPic}
        onAllHintsRead={function (): void {
          setGeorgeHint(true);
          window.setTimeout(() => {
            setAlissaHint(false);
          }, 2500)

        } } onExitClicked={function (): void {
          
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
        hintsObj={{"en": [
          "thanks Alissa!",
          "we have two main upcomming projects i'd like to briefly tell you about",
          "the first project is Digi-Deck™, A SAAS tool for building training simulations",
          "development on Digi-Deck™ started in December 2022, and we can't wait to share more with you!",
          "the second project is...",
          "*drum roll............*"
        ]}}
        languageKey={language}
        actorImageUrl={georgePic}
        onAllHintsRead={function (): void {
          setAlissaHint2(true);
        } } onExitClicked={function (): void {
          
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
            setGeorgeHint(false);
            setAlissaHint2(false);
            setGeorgeHint2(true);
        } } onExitClicked={function (): void {
          
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
          setAlissaHint3(true);
          window.setTimeout(() => {
            setGeorgeHint2(false);
          }, 3000);
        } } onExitClicked={function (): void {

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
          setGeorgeHint3(true);
        } } onExitClicked={function (): void {

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
          setAlissaHint3(false);
          setGeorgeHint3(false);
        } } onExitClicked={function (): void {
          
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
