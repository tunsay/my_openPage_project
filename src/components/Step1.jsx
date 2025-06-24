import { useState, useEffect } from 'react';

function Step1({ onNext, isAnimating }) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const welcomeText = "Bienvenue dans notre application. Ceci est un message de présentation pour l'étape 1.";
    
    // Effet typewriter pour le texte de bienvenue
    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        
        let currentIndex = 0;
        const typingSpeed = 25; // Vitesse de frappe en millisecondes
        
        const typeWriter = () => {
            if (currentIndex < welcomeText.length) {
                setDisplayedText(welcomeText.slice(0, currentIndex + 1));
                currentIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                setIsTyping(false);
            }
        };
        
        // Petit délai avant de commencer l'effet
        const startTyping = setTimeout(typeWriter, 500);
        
        return () => {
            clearTimeout(startTyping);
        };
    }, []);

    return (
        <div className="step1-container">
            <h2>Étape 1 : Bienvenue !</h2>
            <p className="typewriter-text">
                {displayedText}
                {isTyping && <span className="cursor">|</span>}
            </p>
            
            <div className="navigation-buttons">
                <button onClick={onNext} disabled={isAnimating || isTyping}>
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default Step1;