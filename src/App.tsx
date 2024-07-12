import { useEffect, useState } from "react";
import "./App.css";
import { ActorHints } from "./hints/ActorHints";
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
      <button
        onClick={() => {
          language === "en" ? setLanguageKey("we") : setLanguageKey("en");
        }}
      >
        {language === "en" ? "switch to welsh" : "switch to english"}
      </button>

      <h1 id="title"> react hints component demo: Virtus Browser Broadcast </h1>
      {alissaHint && (
        <ActorHints
          top={100}
          left={20}
          actorName={"Alissa, PR Virtus Tech"}
          autoMode={true}
          hintsObj={{
            en: [
              "english Hello everyone!",
              "english welcome to Virtus Browser Broadcast #1",
              "english we have some exciting updates and developments to tell you about!",
              "english i'm gunna hand it over to Virtus Tech CEO George Bellwood to tell you more",
              "english over to you george!",
            ],
            we: [
              "welsh Hello everyone!",
              "welsh welcome to Virtus Browser Broadcast #1",
              "welsh we have some exciting updates and developments to tell you about!",
              "welsh i'm gunna hand it over to Virtus Tech CEO George Bellwood to tell you more",
              "welsh over to you george!",
            ],
          }}
          languageKey={language}
          actorImageUrl={alissaPic}
          onAllHintsRead={function (): void {
            setGeorgeHint(true);
            window.setTimeout(() => {
              setAlissaHint(false);
            }, 2500);
          }}
          // onExitClicked={function (): void {}}
          prideColoursOn={false}
          hintReadingTimeIndicatorColour={"lime"}
          imageScalePercentage="105%"
          pictureFrameSize={85}
          flipImage={true}
          hintUserReadingTimeInMs={1500}
        />
      )}
    </div>
  );
}

export default App;
