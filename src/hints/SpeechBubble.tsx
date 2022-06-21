import { useEffect, useRef, useState } from "react";
import { TextScroll } from "./TextScroll";
import "./speechBubble.css";
import surroundTextInQoutes from "./surroundTextInQoutes";

// TS enums may already map to there string equivallants already?
export enum SpeechBubbleDirection{
    LEFT="LEFT", 
    RIGHT="RIGHT", 
}

interface SpeechBubbleProps{
    text: string;
    speechBubbleDirection: SpeechBubbleDirection;
    onWholeTextHasBeenReadByUser: () => void;
    scrollText: boolean; // implement this prop later
    maximumWidth?: number;
    qoutesOn?: boolean;
    scroll?: boolean;
    personName?: string;
}

export function SpeechBubble({text, speechBubbleDirection, maximumWidth, 
    onWholeTextHasBeenReadByUser, qoutesOn, personName}: SpeechBubbleProps){

    const speechBoxRef = useRef<HTMLDivElement>(null!);
    const [scrollHasEnded, setScrollHasEnded] = useState<boolean>(false);
    const nextTextIconRef = useRef<HTMLSpanElement | null>(null);
    const [skipScroll, setSkipScroll] = useState<boolean>(false);

    useEffect(() => {
        // setShowNextTextIcon(false);
        setSkipScroll(false);

        if(speechBoxRef.current !== null)
            speechBoxRef.current.classList.add("dialogue-box-appear");
       
        if(nextTextIconRef.current !== null)
            nextTextIconRef.current.id = "invisible-next-icon";
        setScrollHasEnded(false);

    }, [text]);
    
    return (
        <div 
            onClick={() => {
                if(scrollHasEnded){
                    onWholeTextHasBeenReadByUser();
                }else{
                    setSkipScroll(true);
                }
            }} 
            ref={speechBoxRef} 
            className="speech-box-container">
            <div className={speechBubbleDirection === SpeechBubbleDirection.LEFT ? "speech-stalk-left" : "speech-stalk-right"}> </div>
            <div style={maximumWidth ? {maxWidth: maximumWidth} : {maxWidth: 200}} className={speechBubbleDirection === SpeechBubbleDirection.LEFT ? "speech-box-left" : "speech-box-right"}>
                <p id="speech-bubble-paragraph" style={{margin: "0px"}}>
                    {personName && <span> {personName} <br /> </span>} 
                    <TextScroll 
                        text={qoutesOn ? surroundTextInQoutes(text) : text} 
                        delayBetweenEachCharInMs={1000 / 30}
                        unscrolledTextStylesObj={{opacity: 0}} 
                        onCharacterHasScrolled={
                            (char: string) => {console.log(char.toUpperCase())}
                        }
                        skipScroll={skipScroll}
                        onScrollHasEnded={() => {
                            console.log("ended");

                            if(nextTextIconRef.current !== null)
                                nextTextIconRef.current.id = "next-icon";
                            if(nextTextIconRef.current !== null)
                                speechBoxRef.current.classList.remove("dialogue-box-appear");
                            
                            setScrollHasEnded(true);

                        }}
                    />
                    <span ref={nextTextIconRef} id="invisible-next-icon">
                        {" ▼"}
                    </span>
                </p>
            </div>
        </div>
    );

}