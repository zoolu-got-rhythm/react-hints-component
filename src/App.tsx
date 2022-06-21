import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ActorHints } from './hints/ActorHints';
import christoSelfie from "./images/selfie_1.png";

function App() {

  const hints = [
    "Hello! i'm the founder of x, a platform in development for distribution of computer music code",
    "My hope is that this tool and platform will help bring in the next generation of computer musicians",
    "sign-up now for updates on development and beta release date information via email and sms(optional)",
    "if you wish to contact me: my email is christopher.pkm@gmail.com",
    "have a lovely day!"
  ]
  return (
    <div className="App">
      <h1> react-hints-component </h1>
      <ActorHints 
        actorName={'christo, founder trident'} 
        hints={hints} 
        actorImageUrl={christoSelfie} 
        onAllHintsRead={function (): void {
        throw new Error('Function not implemented.');
      } } onExitClicked={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
}

export default App;
