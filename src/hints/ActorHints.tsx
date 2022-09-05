import { Console } from "console";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { HintsBox } from "./HintsBox";

// import textScrollSound from "./sounds/textScrollSound.mp3";

export interface ActorHintsProps{
    actorName: string;
    hints: string[];
    actorImageUrl: string;
    onAllHintsRead: () => void;
    onExitClicked: () => void;
    hintUserReadingTimeInMs: number;
    prideColoursOn?: boolean;
}

enum SCROLL_MODE{
  AUTO,
  MANUAL
}

export function ActorHints({actorName, hints, actorImageUrl, 
  onAllHintsRead, onExitClicked, hintUserReadingTimeInMs, prideColoursOn = false}: ActorHintsProps){


    const clicksRef = useRef<number>(0);
    const [scrollMode, setScrollMode] = useState<SCROLL_MODE>(SCROLL_MODE.AUTO);
    const tid = useRef<number | null>(null);

    const stopAnimBoolRef = useRef<boolean>(false);

    const hintsCountProgressRef = useRef<any>(null!);
  
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    useLayoutEffect(() => {
      ctxRef.current = canvasRef.current.getContext("2d");
    });

    const startTime = useRef<number | undefined>(undefined);
    const prevTimeStamp = useRef<number>(0);

    const hintReadingTimeInMs = hintUserReadingTimeInMs;

    const [hintsFinishedScrollArray, setHintsFinishedScrollArray] = useState<string[]>([]);

    let prideColoursRainbow = ["#E800FF", "#FFAA00", "#F7E905", "#5AFF00", "#00CFFF", "#6700FF"];
    // useEffect(() => {
      for(let i = 0; i < 2; i++){
        prideColoursRainbow = [...prideColoursRainbow, ...prideColoursRainbow];
      }
    // }, []);
    


    let prevGoingToRadiansAngle = Math.PI * 1.5;
    function drawHintTimeoutSemiCircle(progressPercentage: number){
      const canvasCenter = 74 / 2;
      const ctx = ctxRef.current;
      if(ctx){
        ctx.beginPath();
        // ctx.lineWidth = 0.5;
        ctx.moveTo(canvasCenter,canvasCenter);
        ctx.lineTo(canvasCenter + Math.cos(prevGoingToRadiansAngle) * 50,
            canvasCenter + Math.sin(prevGoingToRadiansAngle) * 50);
        
        let goingToRadiansAngle = Math.PI * 1.5 + (Math.PI * 2 * progressPercentage);

        ctx.arc(canvasCenter, canvasCenter, 50, prevGoingToRadiansAngle, goingToRadiansAngle + 0.03);
        
        prevGoingToRadiansAngle = goingToRadiansAngle;
        ctx.lineTo(canvasCenter,canvasCenter);
        if(prideColoursOn){
          ctx.fillStyle = prideColoursRainbow[Math.floor(progressPercentage * prideColoursRainbow.length)];
        }else{
          ctx.fillStyle = "lime";
        }
        ctx.fill();
        // ctx.stroke();
        // ctx.closePath();   
      }
    }

    function clearCanvas(){
      const ctx = ctxRef.current;
      if(ctx){
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
          clearCanvas();
          // drawHintTimeoutSemiCircle(0);
          if(hintsFinishedScrollArray.length < hints.length)
            setHintsFinishedScrollArray([...hintsFinishedScrollArray, finishedHint]);
        }
      }

      // if(hintsFinishedScrollArray.length - 1 < hints.length)
      console.log("HINTS FINISHED SCROLL ARRAY: ", hintsFinishedScrollArray);
      tid.current = window.requestAnimationFrame(step);

    }

    useEffect(() => {
      return () => {tid.current && window.cancelAnimationFrame(tid.current)};
    }, []);

    return (
        <div
          style={{
            position: "absolute",
            top: "125px",
            left: "10px",
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
              width: 80,
              height: 80,
              // border: "3px solid red",
              marginRight: "5px",
              float: "left",
              position: "relative"
              }}> 
            <canvas ref={canvasRef} width={74} height={74}
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
                width: 64,
                height: 64,
                left: 5,
                top: 5,
                zIndex: 100,
                position: "absolute",
                // visibility: "hidden"
              }}
            >
              <img src={actorImageUrl} style={{ width: "110%", height: "auto" }} />
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
            {`${Math.min(hintsFinishedScrollArray.length + 1, hints.length)}/${hints.length}`}
          </div>

          <HintsBox
            onSpeechBubbleMouseOver={() => {
              stopAnimBoolRef.current = true;
              tid.current && window.cancelAnimationFrame(tid.current);

              window.setTimeout(()=>drawHintTimeoutSemiCircle(0.99));
              setScrollMode(SCROLL_MODE.MANUAL);
            }}
            onCurrentHintFinishedTextScroll={(finishedHint: string) => {
              // console.log("setting new finished hint", hint);
              // setHintsFinishedScrollArray([...hintsFinishedScrollArray, hint]);

              console.log("finished hint", finishedHint);
              clicksRef.current += 1;

              if(scrollMode === SCROLL_MODE.AUTO){
                delayBeforeNextHint(finishedHint);
              }else{
                if(clicksRef.current >= 2){
                  clicksRef.current = 0;
                  setHintsFinishedScrollArray([...hintsFinishedScrollArray, finishedHint]);
                }
              }

            }}
            personName={actorName}
            hints={hints}
            autoModeHintsRead={hintsFinishedScrollArray}
            onAllHintsRead={onAllHintsRead}
            onSpeechBubbleLayoutChanged={(speechBubbleContainerRef: HTMLElement) => {
              hintsCountProgressRef.current.style.left = `${55 + speechBubbleContainerRef.clientWidth}px`;
              console.log("CALLBACK SPEECH BUBBLE WITDH", speechBubbleContainerRef.clientWidth);
            }}
          />
        </div>
    );
}