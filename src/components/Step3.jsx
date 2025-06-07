import { useState } from 'react';

function Step3({ onNext, isAnimating }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Réinitialiser les messages
        setError('');
        setSuccess('');
        
        // Vérification du code (par exemple, le code correct est "REACT2023")
        if (!code.trim()) {
            setError('Veuillez entrer le code.');
            return;
        }
        
        if (code.trim().toUpperCase() === "REACT2023") {
            setSuccess('Code valide ! Félicitations, vous avez terminé le parcours.');
            onNext();
        } else {
            setError('Code invalide. Veuillez réessayer.');
        }
    };

    return (
        <div className="question-container">
            <h2>Étape 3 : Saisie du code</h2>
            <p>Veuillez entrer le code spécial pour terminer.</p>
            
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
                    {success && <div className="success-message">{success}</div>}
                </div>
                
                <div className="navigation-buttons">
                    <button type="submit" disabled={isAnimating}>
                        Vérifier
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Step3;