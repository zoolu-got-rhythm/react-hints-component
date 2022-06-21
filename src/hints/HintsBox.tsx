import { useEffect, useRef, useState } from "react";
import { SpeechBubble, SpeechBubbleDirection } from "./SpeechBubble";

interface HintsBoxProps{
    hints: string[];
    personName: string;
    onAllHintsRead: () => void;
}

export function HintsBox({hints, onAllHintsRead, personName}: HintsBoxProps){
    const hintIndexRef = useRef<number>(0);
    const [currentHint, setCurrentHint] = useState<string>(hints[hintIndexRef.current]);

    function nextHint(){
        if(hints.length - 1 > hintIndexRef.current){
            hintIndexRef.current++;
            setCurrentHint(hints[hintIndexRef.current]);
        }else{
            // no more hints left, user has seen/read them all
            onAllHintsRead();
        }
    }

    return (
        <SpeechBubble 
            onWholeTextHasBeenReadByUser={()=>{
                nextHint();
            }}
            personName={hintIndexRef.current == 0 ? personName : undefined}
            qoutesOn={true}
            text={currentHint} 
            speechBubbleDirection={SpeechBubbleDirection.LEFT} 
            scrollText={false} />
    )
}