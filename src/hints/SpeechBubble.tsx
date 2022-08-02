import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TextScroll } from "./TextScroll";
import "./speechBubble.css";
import surroundTextInQoutes from "./surroundTextInQoutes";

// TS enums may already map to there string equivallants already?
export enum SpeechBubbleDirection{
    LEFT="LEFT", 
    RIGHT="RIGHT", 
}

// add mode enum: automatic or manual

interface SpeechBubbleProps{
    onSpeechBubbleMouseOver: () => void;
    text: string;
    speechBubbleDirection: SpeechBubbleDirection;
    onWholeTextHasBeenReadByUser: () => void;
    scrollText: boolean; // implement this prop later
    maximumWidth?: number;
    qoutesOn?: boolean;
    scroll?: boolean;
    personName?: string;
    onSpeechBoxLayoutChanged?: (speechBoxContainer: HTMLElement) => void;
}

export function SpeechBubble({text, speechBubbleDirection, maximumWidth, onSpeechBubbleMouseOver,
    onWholeTextHasBeenReadByUser, qoutesOn, personName, onSpeechBoxLayoutChanged}: SpeechBubbleProps){

    const speechBoxRef = useRef<HTMLDivElement>(null!);
    const [scrollHasEnded, setScrollHasEnded] = useState<boolean>(false);
    const nextTextIconRef = useRef<HTMLSpanElement | null>(null);
    const [skipScroll, setSkipScroll] = useState<boolean>(false);
    const speechBoxTextContainerRef = useRef<HTMLDivElement>(null!);

    useLayoutEffect(() => {
        // console.log("USE LAYOUT EFFECT");
        // console.log(speechBoxTextContainerRef.current.style.width);
        if(onSpeechBoxLayoutChanged)
            onSpeechBoxLayoutChanged(speechBoxTextContainerRef.current);
    });

    useEffect(() => {
        // setShowNextTextIcon(false);
        setSkipScroll(false);

        if(speechBoxRef.current !== null)
            speechBoxRef.current.classList.add("dialogue-box-appear");
       
        if(nextTextIconRef.current !== null)
            nextTextIconRef.current.id = "invisible-next-icon";
        setScrollHasEnded(false);

    }, [text]);

    useEffect(() => {
        if(scrollHasEnded)
            onWholeTextHasBeenReadByUser();
    }, [scrollHasEnded]);
    
    return (
        <div 
            ref={speechBoxRef} 
            className="speech-box-container">
            <div className={speechBubbleDirection === SpeechBubbleDirection.LEFT ? "speech-stalk-left" : "speech-stalk-right"}> </div>
            <div 
                onClick={() => {
                    if(scrollHasEnded){
                        onWholeTextHasBeenReadByUser();
                    }else{
                        setSkipScroll(true);
                    }
                }} 
    
                onMouseOver={() => {
                    onSpeechBubbleMouseOver();
                }}
                ref={speechBoxTextContainerRef}
                style={maximumWidth ? {maxWidth: maximumWidth} : {maxWidth: 200}} className={speechBubbleDirection === SpeechBubbleDirection.LEFT ? "speech-box-left" : "speech-box-right"}>
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
                            // onWholeTextHasBeenReadByUser();

                        }}
                    />
                    {/* <span ref={nextTextIconRef} id="invisible-next-icon">
                        {" ▼"}
                    </span> */}
                </p>
            </div>
        </div>
    );

}