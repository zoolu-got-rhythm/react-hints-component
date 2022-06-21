import { useEffect, useRef, useState } from "react";

export default function useTextScroll(textRef: string, timeBetweenCharactersInMs: number):
    [string, () => void]{

    console.log("use text scroll run");

    const [text, setText] = useState<string>(textRef);
    const timerRef = useRef<null | number>(null);
    const i = useRef<number>(0);

    useEffect(() => {
        // console.log("use effect in useTextScroll ran")
        // if already running from previous hook call, reset 
        reset(); // is this needed?
        setText("");

        function animate(){
            if(i.current == textRef.length){
                reset();
                // setText(textRef);
            }else{
                console.log("setting");
                i.current++;
                setText(textRef.substring(0, i.current));
            }
        }

        console.log("TEXT SCROLL HOOK USE-EFFECT RUN");
        timerRef.current = window.setInterval(animate, timeBetweenCharactersInMs);

        return () => clearStopTimer();
            
    }, [textRef]);

    const skipScroll = () => {
        reset();
        setText(textRef);
    }

    const reset = () => {
        console.log("reset called");
        clearStopTimer();
        i.current = 0;
    }

    const clearStopTimer = () => {
        console.log(timerRef.current);
        if(timerRef.current){
            window.clearInterval(timerRef.current);
        }
    };

    return [text, skipScroll];
}