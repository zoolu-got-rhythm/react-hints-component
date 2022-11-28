import { useEffect, useRef, useState } from "react";
import { SpeechBubble, SpeechBubbleDirection } from "./SpeechBubble";

interface HintsBoxProps{
    onSpeechBubbleMouseOver: () => void;
    hints: string[];
    personName: string;
    onAllHintsRead: () => void;
    onCurrentHintFinishedTextScroll: (finishedHint: string) => void;
    autoModeHintsRead: string[];
    onSpeechBubbleLayoutChanged?: (speechBubbleContainer: HTMLElement) => void;
    startingHintIndex: number;
}

export function HintsBox({hints, onAllHintsRead, personName, onCurrentHintFinishedTextScroll, 
    autoModeHintsRead, onSpeechBubbleLayoutChanged, onSpeechBubbleMouseOver, startingHintIndex}: HintsBoxProps){

    const hintIndexRef = useRef<number>(startingHintIndex);
    const [currentHint, setCurrentHint] = useState<string>(hints[hintIndexRef.current]);

    function nextHint(){
        if(hints.length - 1 > hintIndexRef.current){
            // onCurrentHintFinishedTextScroll();
        
            hintIndexRef.current++;
            setCurrentHint(hints[hintIndexRef.current]);

            
        }else{
            // no more hints left, user has seen/read them all
            onAllHintsRead();
        }
    }

    useEffect(() => {
        if(autoModeHintsRead.length > 0){
            nextHint();
        }
    }, [autoModeHintsRead]);



    return (
        <SpeechBubble 
            onSpeechBubbleMouseOver={() => {
                onSpeechBubbleMouseOver();
            }}
            onWholeTextHasBeenReadByUser={()=>{
                onCurrentHintFinishedTextScroll(hints[hintIndexRef.current]);
                // nextHint();
            }}
            personName={hintIndexRef.current == 0 ? personName : undefined}
            qoutesOn={true}
            text={currentHint} 
            speechBubbleDirection={SpeechBubbleDirection.LEFT} 
            scrollText={false}
            onSpeechBoxLayoutChanged={(speechBoxContainer: HTMLElement)=>{
                if(onSpeechBubbleLayoutChanged)
                    onSpeechBubbleLayoutChanged(speechBoxContainer);
            }} />
    )
}