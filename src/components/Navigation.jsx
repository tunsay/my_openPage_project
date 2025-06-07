import { stepConfig } from '../stepConfig';

function Navigation({ step, setStep, maxSteps }) {
    // Utiliser directement la configuration des étapes
    const steps = stepConfig.map(config => config.id);

    return (
        <nav className="navigation">
            {steps.map(stepNum => (
                <button
                    key={stepNum}
                    onClick={() => setStep(stepNum)}
                    className={step === stepNum ? "active" : ""}
                >
                    Étape {stepNum}
                </button>
            ))}
        </nav>
    );
}

export default Navigation;