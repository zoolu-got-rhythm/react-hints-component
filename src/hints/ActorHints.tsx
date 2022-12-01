import { Console } from "console";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import getFunctionThatOnlyExecutesAfterTimeElapsed from "./getFunctionThatOnlyExecutesAfterTimeElapsed";
import { HintsBox } from "./HintsBox";

// import textScrollSound from "./sounds/textScrollSound.mp3";



interface Hints{
  [key: string]: string[];
}

export interface ActorHintsProps{
    top: number;
    left: number;
    actorName: string;
    hintsObj: Hints;
    actorImageUrl: string;
    pictureFrameSize?: number;
    imageScalePercentage?: string; 
    onAllHintsRead: () => void;
    onExitClicked: () => void;
    hintUserReadingTimeInMs?: number;
    hintReadingTimeIndicatorColour?: string;
    hintReadingTimeIndicatorBackgroundColour?: string;
    prideColoursOn?: boolean;
    ignoreInitialUserInteractionTimeInMs?: number;
    autoMode?: boolean;
    languageKey: string;
}

enum SCROLL_MODE{
  AUTO,
  MANUAL
}

export function ActorHints({actorName, top, left, hintsObj, actorImageUrl, hintReadingTimeIndicatorColour = "#73fc03",
  onAllHintsRead, onExitClicked, hintUserReadingTimeInMs = 1500, prideColoursOn = false, 
  pictureFrameSize = 74, imageScalePercentage = "110%", ignoreInitialUserInteractionTimeInMs = 2500,
  autoMode = false, hintReadingTimeIndicatorBackgroundColour = "#ccc", languageKey}: ActorHintsProps){


    const [nOfHintsBoxComponentRemounts, setNOfHintsBoxComponentRemounts] = useState<number>(0);

    const hints = hintsObj[languageKey];

    const clicksRef = useRef<number>(0);
    const [scrollMode, setScrollMode] = useState<SCROLL_MODE>(SCROLL_MODE.AUTO);
    const tid = useRef<number | null>(null);

    const stopAnimBoolRef = useRef<boolean>(false);

    const hintsCountProgressRef = useRef<any>(null!);
  
    const canvasRef = useRef<HTMLCanvasElement>(null!);



    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    useLayoutEffect(() => {
      ctxRef.current = canvasRef.current.getContext("2d");
      // @ts-ignore
      // ctxRef.current.fillStyle = hintReadingTimeIndicatorBackgroundColour;
      // @ts-ignore
      // ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    });

    const startTime = useRef<number | undefined>(undefined);
    const prevTimeStamp = useRef<number>(0);

    const hintReadingTimeInMs = hintUserReadingTimeInMs;

    const [hintsFinishedScrollObj, setHintsFinishedScrollObj] = useState<Hints>(
      () => {
        let initialObj = {};
        // @ts-ignore
        Object.keys(hintsObj).forEach(langKey => initialObj[langKey] = []);
        console.log("initial object", initialObj);
        return initialObj;
      }
    );

    console.log("initial finished scroll hints array", hintsFinishedScrollObj);

    let prideColoursRainbow = ["#E800FF", "#FFAA00", "#F7E905", "#5AFF00", "#00CFFF", "#6700FF"];
    // useEffect(() => {
      for(let i = 0; i < 1; i++){
        prideColoursRainbow = [...prideColoursRainbow, ...prideColoursRainbow];
      }
    // }, []);

   
    
    // const pictureFrameSize = 104;


    let prevGoingToRadiansAngle = Math.PI * 1.5;
    function drawHintTimeoutSemiCircle(progressPercentage: number){
      const canvasCenter = pictureFrameSize / 2;
      const ctx = ctxRef.current;
      if(ctx){
        ctx.beginPath();
        // ctx.lineWidth = 0.5;
        ctx.moveTo(canvasCenter,canvasCenter);
        ctx.lineTo(canvasCenter + Math.cos(prevGoingToRadiansAngle) * pictureFrameSize,
            canvasCenter + Math.sin(prevGoingToRadiansAngle) * pictureFrameSize);
        
        let goingToRadiansAngle = Math.PI * 1.5 + (Math.PI * 2 * progressPercentage);

        ctx.arc(canvasCenter, canvasCenter, pictureFrameSize, prevGoingToRadiansAngle, goingToRadiansAngle + 0.03);
        
        prevGoingToRadiansAngle = goingToRadiansAngle;
        ctx.lineTo(canvasCenter,canvasCenter);
        if(prideColoursOn){
          ctx.fillStyle = prideColoursRainbow[Math.floor(progressPercentage * prideColoursRainbow.length)];
        }else{
          ctx.fillStyle = hintReadingTimeIndicatorColour;
        }
        ctx.fill();
        // ctx.stroke();
        // ctx.closePath();   
      }
    }

    function clearCanvas(){
      const ctx = ctxRef.current;
      if(ctx){
        ctx.fillStyle = hintReadingTimeIndicatorBackgroundColour;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    function delayBeforeNextHint(finishedHint: string){
      function step(timestamp: number) {
        if(stopAnimBoolRef.current)
          return;
        // console.log("animating");
        if (startTime.current === undefined) {
          startTime.current = timestamp;
        }

        // @ts-ignore
        const elapsed = timestamp - startTime.current;

        if (prevTimeStamp.current !== timestamp) {
          // Math.min() is used here to make sure the element stops at exactly 200px
          // console.log(hintReadingTimeInMs / elapsed);

          drawHintTimeoutSemiCircle(elapsed / hintReadingTimeInMs);
        }

        if (elapsed < hintReadingTimeInMs) { // Stop the animation after n milliseconds
          prevTimeStamp.current = timestamp;
          window.requestAnimationFrame(step);
        }else{
          prevTimeStamp.current = 0;
          startTime.current = undefined;
          tid.current = null;

          stopAnimBoolRef.current = true;

          if(hints.length - 1 > hintsFinishedScrollObj[languageKey].length){
            clearCanvas();
          }              

          if(hintsFinishedScrollObj[languageKey].length < hints.length){


            let hintsFinishedScrollObjCopy = {...hintsFinishedScrollObj}

            // console.log("hintsFinishedScrollCopy initial", hintsFinishedScrollObjCopy);

            let stringRef = hintsObj[languageKey].find((hintName) => {
              // console.log("hintName", hintName);
              // console.log("finished hint inside find func", finishedHint);
              // console.log("find func", hintName.toLowerCase() + " = " + finishedHint.toLowerCase());
              return hintName.toLowerCase() === finishedHint.toLowerCase();
            });

            
            // console.log("string ref", stringRef);
            // @ts-ignore
            let indexOfFinishedHint = hintsObj[languageKey].indexOf(stringRef);
            // console.log("index of finished hint", indexOfFinishedHint);

            Object.keys(hintsObj).forEach((langKey) => {
              // console.log("langKey", langKey);
              hintsFinishedScrollObjCopy[langKey].push(hintsObj[langKey][indexOfFinishedHint]);
            })
            // hintsFinishedScrollObjCopy[languageKey].push(finishedHint);

            // console.log("hints finished scroll obj after hint finished scroll", hintsFinishedScrollObjCopy);
            setHintsFinishedScrollObj(hintsFinishedScrollObjCopy);
          }
        }
      }

      // if(hintsFinishedScrollObj.length - 1 < hints.length)
      console.log("HINTS FINISHED SCROLL ARRAY: ", hintsFinishedScrollObj);
      stopAnimBoolRef.current = false;
      tid.current = window.requestAnimationFrame(step);

    }

    const functionThatExecutesCallbackAfterSpecifiedTimeRef = useRef<any>(null!);
    
    useEffect(() => {
      console.log("parent container mounting");
      functionThatExecutesCallbackAfterSpecifiedTimeRef.current = 
        getFunctionThatOnlyExecutesAfterTimeElapsed(ignoreInitialUserInteractionTimeInMs);
      return () => {tid.current && window.cancelAnimationFrame(tid.current)};
    }, []);

    useEffect(() => {
      stopAnimBoolRef.current = true;
      tid.current && window.cancelAnimationFrame(tid.current);
      prevTimeStamp.current = 0;
      startTime.current = undefined;
      tid.current = null;
      // window.setTimeout(() => {
      //   clearCanvas();

      // },100);

      clearCanvas();
      setNOfHintsBoxComponentRemounts(nOfHintsBoxComponentRemounts + 1);

    }, [languageKey]);

    return (
        <div
          style={{
            position: "absolute",
            top: top,
            left: left,
            zIndex: 100
          }}
        >
             <div 
                onClick={onExitClicked}
                style={{
                    zIndex: 100,
                    boxShadow: "2px 3px 4px -2px #888",
                    cursor: "pointer",
                    position: "absolute", 
                    top: "-20px", 
                    width: "15px", 
                    height: "15px", 
                    // padding: "5px",
                    borderRadius: "50%", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    color: "#888",
                    fontSize: "0.6em"}}> 
                <strong> ✕ </strong>
            </div>

          <div
            style={{
              width: pictureFrameSize + 6,
              height: pictureFrameSize + 6,
              // border: "3px solid red",
              marginRight: "8px",
              float: "left",
              position: "relative"
              }}> 
            <canvas ref={canvasRef} width={pictureFrameSize} height={pictureFrameSize}
              style={{
                boxShadow: "2px 3px 4px -2px #888",
                // width: 74,
                // height: 74,
                border: "3px solid white",
                borderRadius: "14%",
                // background: "blue",
                position: "absolute",
                left: 0,
                zIndex: 5
              }}>
            </canvas>

            <div
              style={{
                borderRadius: "11%",
                overflow: "hidden",
                border: "3px solid white",
                // background: "green",
                width: pictureFrameSize - 10,
                height: pictureFrameSize - 10,
                left: 5,
                top: 5,
                zIndex: 100,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // visibility: "hidden"
              }}
            >
              <img src={actorImageUrl} style={{ width: imageScalePercentage, height: "auto" }} />
            </div>
          </div>

          <div 
            ref={hintsCountProgressRef}
            style={{
              position: "absolute", 
              top: -17, 
              left: 290,
              boxShadow: "2px 3px 4px -2px #888",                   
              width: "22px", 
              height: "17px", 
              // padding: "5px",
              borderRadius: "35%", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              color: "#888",
              fontSize: "0.6em"
              }}>
            {`${Math.min(hintsFinishedScrollObj[languageKey].length + 1, hints.length)}/${hints.length}`}
          </div>

          <HintsBox
            startingHintIndex={hintsFinishedScrollObj[languageKey].length === hints.length ? hints.length - 1 : hintsFinishedScrollObj[languageKey].length}
            key={nOfHintsBoxComponentRemounts.toString()} // key here used to trigger re-renders

            onSpeechBubbleMouseOver={() => {
              // console.log("onSpeechBubbleMouseOver");
              functionThatExecutesCallbackAfterSpecifiedTimeRef.current(() => {
                // console.log("activated");
                if(!autoMode){
                  stopAnimBoolRef.current = true;
                  tid.current && window.cancelAnimationFrame(tid.current);
                  window.setTimeout(()=>drawHintTimeoutSemiCircle(1));
                  setScrollMode(SCROLL_MODE.MANUAL);
                }   
              });
            }}
            onCurrentHintFinishedTextScroll={(finishedHint: string) => {
              // console.log("setting new finished hint", hint);
              // setHintsFinishedScrollObj([...hintsFinishedScrollObj, hint]);

              console.log("finished hint", finishedHint);
              clicksRef.current += 1;

              if(scrollMode === SCROLL_MODE.AUTO){
                delayBeforeNextHint(finishedHint);
              }else{
                if(!autoMode)
                  if(clicksRef.current >= 2){
                    clicksRef.current = 0;
                    // NEED TO IMPLEMENT THIS
                    // setHintsFinishedScrollObj([...hintsFinishedScrollObj, finishedHint]);
                    // let hintsFinishedScrollObjCopy = {...hintsFinishedScrollObj}
                    // hintsFinishedScrollObjCopy[languageKey].push(finishedHint);
                    // setHintsFinishedScrollObj(hintsFinishedScrollObjCopy);
                  }
              }

            }}
            personName={actorName}
            hints={hints}
            autoModeHintsRead={[...hintsFinishedScrollObj[languageKey]]}
            onAllHintsRead={onAllHintsRead}
            onSpeechBubbleLayoutChanged={(speechBubbleContainerRef: HTMLElement) => {
              hintsCountProgressRef.current.style.left = `${pictureFrameSize - 15 + speechBubbleContainerRef.clientWidth}px`;
              // console.log("CALLBACK SPEECH BUBBLE WITDH", speechBubbleContainerRef.clientWidth);
            }}
          />
        </div>
    );
}