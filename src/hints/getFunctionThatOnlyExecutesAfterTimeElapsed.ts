export default function(timeInMs: number) {
    const start = Date.now();
    return function(functionToExecute: () => void) {
      const timeElapsed = Date.now() - start;
      if(timeElapsed >= timeInMs) 
        functionToExecute();
    }
}