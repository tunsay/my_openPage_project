import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function Step2({ onNext, isAnimating, isProcessing, setIsProcessing }) {
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    // Réinitialiser isProcessing quand le composant se monte
    useEffect(() => {
        setIsProcessing(false);
    }, [setIsProcessing]);
    
    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Empêcher le spam de soumission
        if (isProcessing || isAnimating) return;
        
        setIsProcessing(true);
        
        // Vérification que l'âge est un nombre
        if (!age.trim()) {
            setError('Veuillez entrer votre âge.');
            setIsProcessing(false);
            return;
        }
        
        const ageNum = parseInt(age.trim(), 10);
        
        if (isNaN(ageNum)) {
            setError('Veuillez entrer un nombre valide.');
            setIsProcessing(false);
            return;
        }
        
        if (ageNum < 18) {
            setError('Vous devez avoir au moins 18 ans pour continuer.');
            setIsProcessing(false);
            return;
        }
        
        if (ageNum > 120) {
            setError('Veuillez entrer un âge valide.');
            setIsProcessing(false);
            return;
        }
        
        // Si tout est valide, afficher le succès avec confettis
        setError('');
        setSuccess(true);
        setIsProcessing(false); // Important : réinitialiser isProcessing
        triggerConfetti();
    };

    const handleNext = () => {
        if (!isAnimating && !isProcessing) {
            onNext();
        }
    };return (
        <div className="question-container">
            <h2>Étape 2 : Vérification de l'âge</h2>
            <p>Veuillez indiquer votre âge pour continuer.</p>
            
            {success ? (
                <div className="success-container">
                    <div className="success-message">
                        🎉 Parfait ! Votre âge a été validé avec succès ! 🎉
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={handleNext} disabled={isAnimating}>
                            Suivant
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="age">Âge :</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Entrez votre âge"
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>
                      <div className="navigation-buttons">
                        <button type="submit" disabled={isAnimating || isProcessing}>
                            {isProcessing ? 'Vérification...' : 'Vérifier et continuer'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Step2;