import { useState, useEffect } from "react";
/**
 * @param {string} text - The full text to be displayed with typewriter effect.
 * @param {number} speed - The speed (in milliseconds) of typing each character.
 */


export default function useTypewriter(text, speed = 50) {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(prev => prev + text[i]);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(inverval);
    }, [text, speed]);
    return displayedText;
}


