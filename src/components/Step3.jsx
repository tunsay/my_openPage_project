import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function Step3({ onNext, isAnimating, isProcessing, setIsProcessing }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    // Réinitialiser isProcessing quand le composant se monte
    useEffect(() => {
        setIsProcessing(false);
    }, [setIsProcessing]);
    
    const triggerConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Empêcher le spam de soumission
        if (isProcessing || isAnimating) return;
        
        setIsProcessing(true);
        
        // Réinitialiser les messages
        setError('');
        
        // Vérification du code (par exemple, le code correct est "REACT2023")
        if (!code.trim()) {
            setError('Veuillez entrer le code.');
            setIsProcessing(false);
            return;
        }
          if (code.trim().toUpperCase() === "REACT2023") {
            setSuccess(true);
            setIsProcessing(false); // Important : réinitialiser isProcessing
            triggerConfetti();
        } else {
            setError('Code invalide. Veuillez réessayer.');
            setIsProcessing(false);
        }
    };

    const handleNext = () => {
        if (!isAnimating && !isProcessing) {
            onNext();
        }
    };return (
        <div className="question-container">
            <h2>Étape 3 : Saisie du code</h2>
            <p>Veuillez entrer le code spécial pour terminer.</p>
            
            {success ? (
                <div className="success-container">
                    <div className="success-message">
                        🎊 Bravo ! Code valide ! Vous avez terminé le parcours ! 🎊
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={handleNext} disabled={isAnimating}>
                            Terminer
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">Code d'accès :</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Entrez le code"
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>
                      <div className="navigation-buttons">
                        <button type="submit" disabled={isAnimating || isProcessing}>
                            {isProcessing ? 'Vérification...' : 'Vérifier'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Step3;