//-----------------------------------------------------------------------------------------------
// Imports
import { useEffect, useRef } from "react";
import useTextScroll from "./useTextScroll";

//-----------------------------------------------------------------------------------------------
// Interface
export interface TextScrollProps {
  text: string;
  delayBetweenEachCharInMs?: number; // speed of scroll essentially
  scrollingTextStylesObj?: any;
  unscrolledTextStylesObj?: any;
  onCharacterHasScrolled?: (char: string) => void;
  skipScroll?: boolean;
  onScrollHasEnded?: () => void;
}

//-----------------------------------------------------------------------------------------------
// TextScroll
export function TextScroll({
  text,
  delayBetweenEachCharInMs = 1000 / 60,
  scrollingTextStylesObj,
  unscrolledTextStylesObj,
  onCharacterHasScrolled,
  skipScroll,
  onScrollHasEnded
}: TextScrollProps) {

  const [scrollingText, skipTextScroll] = useTextScroll(text, delayBetweenEachCharInMs);
  useEffect(() => {
    // console.log("use effect in textScroll called");
    if(skipScroll && scrollingText.length){
        skipTextScroll();        
    }
  }, [skipScroll]);

    if(onCharacterHasScrolled && !skipScroll){
        onCharacterHasScrolled(text.charAt(scrollingText.length - 1));
    }

    if(skipScroll){
      if(onScrollHasEnded && scrollingText.length !== text.length){
        console.log("reached end via skip");
        onScrollHasEnded();
      }
    }else{
      if(onScrollHasEnded && scrollingText.length === text.length){
          console.log("reached end");
          onScrollHasEnded();
      }
    }
    

  return (
    <span>
      <span style={scrollingTextStylesObj ? scrollingTextStylesObj : {}}>
        {scrollingText}
      </span>
      <span
        style={
          unscrolledTextStylesObj ? unscrolledTextStylesObj : { opacity: 0 }
        }
      >
        {text.substring(scrollingText.length, text.length)}
      </span>
    </span>
  );
}
