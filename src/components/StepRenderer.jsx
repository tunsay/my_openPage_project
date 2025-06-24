import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function StepRenderer({ stepData, onNext, isAnimating, isProcessing, setIsProcessing }) {
    // Utiliser les composants Step individuels selon l'ID
    if (stepData.id === 1) {
        return <Step1 onNext={onNext} isAnimating={isAnimating} />;
    }
    
    if (stepData.id === 2) {
        return <Step2 onNext={onNext} isAnimating={isAnimating} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />;
    }
    
    if (stepData.id === 3) {
        return <Step3 onNext={onNext} isAnimating={isAnimating} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />;
    }

    // Étape 4 : Message de fin
    if (stepData.id === 4) {
        return (
            <div className="step-content">
                <p>{stepData.content.text}</p>
            </div>
        );
    }    // Fallback
    return <div>Étape non reconnue</div>;
}

export default StepRenderer;
