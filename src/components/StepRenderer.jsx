import Step2 from './Step2';
import Step3 from './Step3';

function StepRenderer({ stepData, onNext, isAnimating, isProcessing, setIsProcessing }) {    // Pour les questions, utiliser les composants Step individuels
    if (stepData.type === 'question') {
        if (stepData.id === 2) {
            return <Step2 onNext={onNext} isAnimating={isAnimating} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />;
        }
        if (stepData.id === 3) {
            return <Step3 onNext={onNext} isAnimating={isAnimating} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />;
        }
    }

    const handleNextClick = () => {
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
                        <p>{stepData.content.text}</p>
                        <div className="navigation-buttons">
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
                // Les questions sont maintenant gérées par les composants Step individuels
                return <div>Question gérée par composant individuel</div>;

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
