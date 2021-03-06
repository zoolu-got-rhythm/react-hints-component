import { Console } from "console";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HintsBox } from "./HintsBox";

// import textScrollSound from "./sounds/textScrollSound.mp3";

export interface ActorHintsProps{
    actorName: string;
    hints: string[];
    actorImageUrl: string;
    onAllHintsRead: () => void;
    onExitClicked: () => void;
    hintUserReadingTimeInMs: number;
}

export function ActorHints({actorName, hints, actorImageUrl, onAllHintsRead, onExitClicked, hintUserReadingTimeInMs}: ActorHintsProps){

    const tid = useRef<number | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    useLayoutEffect(() => {
      ctxRef.current = canvasRef.current.getContext("2d");
    });

    const startTime = useRef<number | undefined>(undefined);
    const prevTimeStamp = useRef<number>(0);

    const hintReadingTimeInMs = hintUserReadingTimeInMs;

    const [hintsFinishedScrollArray, setHintsFinishedScrollArray] = useState<string[]>([]);


    function drawHintTimeoutSemiCircle(progressPercentage: number){
      const canvasCenter = 74 / 2;
      
      const ctx = ctxRef.current;
      if(ctx){
        ctx.clearRect(0,0,1000,1000);
        ctx.beginPath();
        ctx.moveTo(canvasCenter,canvasCenter);
        ctx.lineTo(canvasCenter + Math.cos(1.5 * Math.PI) * 40, canvasCenter + Math.sin(1.5 * Math.PI) * 40);
        ctx.arc(canvasCenter, canvasCenter, 40, 1.5 * Math.PI, 1.5 * Math.PI + ((2 * progressPercentage) * Math.PI));
        ctx.lineTo(canvasCenter,canvasCenter);
        ctx.fillStyle = "lime";
        // ctx.stroke();
        ctx.fill();
      }
    }


    function delayBeforeNextHint(finishedHint: string){
      function step(timestamp: number) {
        if (startTime.current === undefined) {
          startTime.current = timestamp;
        }

        // @ts-ignore
        const elapsed = timestamp - startTime.current;

        if (prevTimeStamp.current !== timestamp) {
          // Math.min() is used here to make sure the element stops at exactly 200px
          console.log(hintReadingTimeInMs / elapsed);
          drawHintTimeoutSemiCircle(elapsed / hintReadingTimeInMs);
        }

        if (elapsed < hintReadingTimeInMs) { // Stop the animation after n milliseconds
          prevTimeStamp.current = timestamp;
          window.requestAnimationFrame(step);

        }else{
          prevTimeStamp.current = 0;
          startTime.current = undefined;
          tid.current = null;
          drawHintTimeoutSemiCircle(0);
          setHintsFinishedScrollArray([...hintsFinishedScrollArray, finishedHint]);
          console.log("SETTING FINISHED HINT");
          console.log(finishedHint);
        }
      }

      // if(hintsFinishedScrollArray.length > 0){
        tid.current = window.requestAnimationFrame(step);
      // }
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
                    boxShadow: "2px 3px 4px -2px #888",
                    cursor: "pointer",
                    position: "absolute", 
                    top: "-10px", 
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
                <strong> ??? </strong>
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
                borderRadius: "50%",
                // background: "blue",
                position: "absolute",
                left: 0,
                zIndex: 5
              }}>
            </canvas>

            <div
              style={{
                borderRadius: "50%",
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

          <div>
            {`${hintsFinishedScrollArray.length + 1}/${hints.length}`}
          </div>

          <HintsBox
            onCurrentHintFinishedTextScroll={(finishedHint: string) => {
              // console.log("setting new finished hint", hint);
              // setHintsFinishedScrollArray([...hintsFinishedScrollArray, hint]);
              delayBeforeNextHint(finishedHint);
            }}
            personName={actorName}
            hints={hints}
            autoModeHintsRead={hintsFinishedScrollArray}
            onAllHintsRead={onAllHintsRead}
          />
        </div>
    );
}