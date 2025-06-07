import { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

function StepRenderer({ stepData, onNext, isAnimating, isProcessing, setIsProcessing }) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');    // Réinitialiser l'état quand l'étape change
    useEffect(() => {
        setIsProcessing(false);
        setInputValue('');
        setError('');
        setSuccess('');
    }, [stepData.id, setIsProcessing]);const handleSubmit = (e) => {
        e.preventDefault();
        
        // Empêcher le spam de soumission
        if (isProcessing || isAnimating) return;
        
        setError('');
        setSuccess('');
        setIsProcessing(true);

        if (stepData.type === 'question') {
            const validation = stepData.content.validation;
            
            // Vérification required
            if (validation.required && !inputValue.trim()) {
                setError(validation.errorMessages.required);
                setIsProcessing(false);
                return;
            }

            // Validation spécifique selon le type
            if (stepData.content.inputType === 'number') {
                const num = parseInt(inputValue.trim(), 10);
                
                if (isNaN(num)) {
                    setError(validation.errorMessages.invalid);
                    setIsProcessing(false);
                    return;
                }
                
                if (validation.min && num < validation.min) {
                    setError(validation.errorMessages.min);
                    setIsProcessing(false);
                    return;
                }
                
                if (validation.max && num > validation.max) {
                    setError(validation.errorMessages.max);
                    setIsProcessing(false);
                    return;
                }
            }

            // Validation de valeur attendue
            if (validation.expectedValue) {
                if (inputValue.trim().toUpperCase() !== validation.expectedValue.toUpperCase()) {
                    setError(validation.errorMessages.invalid);
                    setIsProcessing(false);
                    return;
                }
                
                if (validation.successMessage) {
                    setSuccess(validation.successMessage);
                }
            }

            // Si validation OK, passer à l'étape suivante IMMÉDIATEMENT
            setIsProcessing(false);
            onNext();
        }
    };    const handleNextClick = () => {
        if (!isAnimating && !isProcessing) {
            setIsProcessing(true);
            onNext();
        }
    };

    const renderContent = () => {
        switch (stepData.type) {
            case 'welcome':
                return (
                    <div className="step-content">
                        <p>{stepData.content.text}</p>                        <div className="navigation-buttons">
                            <button onClick={handleNextClick} disabled={isAnimating || isProcessing}>
                                Suivant
                            </button>
                        </div>
                    </div>
                );

            case 'simple-text':
                return (
                    <div className="step-content">
                        <p>{stepData.content.text}</p>
                    </div>
                );

            case 'question':
                return (
                    <div className="question-container">
                        <p>{stepData.content.text}</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="input">{stepData.content.question}</label>
                                <input
                                    type={stepData.content.inputType}
                                    id="input"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={stepData.content.placeholder}
                                />
                                {error && <div className="error-message">{error}</div>}
                                {success && <div className="success-message">{success}</div>}
                            </div>
                              <div className="navigation-buttons">
                                <button type="submit" disabled={isAnimating || isProcessing}>
                                    {isProcessing ? 'Vérification...' : 'Vérifier'}
                                </button>
                            </div>
                        </form>
                    </div>
                );            case 'video':
                return (
                    <VideoPlayer 
                        stepData={stepData}
                        onNext={handleNextClick}
                        isAnimating={isAnimating}
                    />
                );

            default:
                return <div>Type d'étape non reconnu</div>;
        }
    };

    return (
        <div className="step-renderer">
            {renderContent()}
        </div>
    );
}

export default StepRenderer;
