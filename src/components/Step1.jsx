function Step1({ onNext, isAnimating }) {
    return (
        <div className="step1-container">
            <h2>Étape 1 : Bienvenue !</h2>
            <p>Bienvenue dans notre application. Ceci est un message de présentation pour l'étape 1.</p>
            
            <div className="navigation-buttons">
                <button onClick={onNext} disabled={isAnimating}>
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default Step1;