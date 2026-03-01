import { useState, useEffect } from 'react';

interface IntroAnimationProps {
    onComplete: () => void;
}

const WORDS = ["Understand.", "Visualize.", "Master.", "CodeExplainer."];

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const [wordIndex, setWordIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (wordIndex < WORDS.length) {
            const timer = setTimeout(() => {
                if (wordIndex === WORDS.length - 1) {
                    // Last word stays longer before the whole screen fades
                    setTimeout(() => setFadeOut(true), 1500);
                } else {
                    setWordIndex(prev => prev + 1);
                }
            }, 1200); // 1.2s per word
            return () => clearTimeout(timer);
        }
    }, [wordIndex]);

    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(() => {
                setComplete(true);
                onComplete();
            }, 800); // Match CSS fade out duration
            return () => clearTimeout(timer);
        }
    }, [fadeOut, onComplete]);

    if (complete) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#000000',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: fadeOut ? 0 : 1,
                transition: 'opacity 0.8s ease-in-out',
                pointerEvents: 'none'
            }}
        >
            <div
                key={wordIndex} // Re-renders the div to trigger animation
                style={{
                    color: '#ffffff',
                    fontSize: '3rem',
                    fontWeight: 600,
                    letterSpacing: '-0.04em',
                    animation: 'wordReveal 1.2s ease-in-out forwards'
                }}
            >
                {WORDS[wordIndex]}
            </div>

            <style>
                {`
          @keyframes wordReveal {
            0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
            30% { opacity: 1; transform: translateY(0); filter: blur(0px); }
            70% { opacity: 1; transform: translateY(0); filter: blur(0px); }
            100% { opacity: 0; transform: translateY(-20px); filter: blur(10px); }
          }
        `}
            </style>
        </div>
    );
}
