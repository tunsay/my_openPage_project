import { useState } from 'react';

function Step2({ onNext, isAnimating }) {
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Vérification que l'âge est un nombre
        if (!age.trim()) {
            setError('Veuillez entrer votre âge.');
            return;
        }
        
        const ageNum = parseInt(age.trim(), 10);
        
        if (isNaN(ageNum)) {
            setError('Veuillez entrer un nombre valide.');
            return;
        }
        
        if (ageNum < 18) {
            setError('Vous devez avoir au moins 18 ans pour continuer.');
            return;
        }
        
        if (ageNum > 120) {
            setError('Veuillez entrer un âge valide.');
            return;
        }
        
        // Si tout est valide, passer à l'étape suivante
        setError('');
        onNext();
    };

    return (
        <div className="question-container">
            <h2>Étape 2 : Vérification de l'âge</h2>
            <p>Veuillez indiquer votre âge pour continuer.</p>
            
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
                    <button type="submit" disabled={isAnimating}>
                        Vérifier et continuer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Step2;