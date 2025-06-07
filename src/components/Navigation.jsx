import { stepConfig } from '../stepConfig';

function Navigation({ step, setStep, isAnimating, isProcessing }) {
    // Utiliser directement la configuration des étapes
    const steps = stepConfig.map(config => config.id);

    return (
        <nav className="navigation">
            {steps.map(stepNum => (
                <button
                    key={stepNum}
                    onClick={() => setStep(stepNum)}
                    className={step === stepNum ? "active" : ""}
                    disabled={isAnimating || isProcessing}
                >
                    Étape {stepNum}
                </button>
            ))}
        </nav>
    );
}

export default Navigation;