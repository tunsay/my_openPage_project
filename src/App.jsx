import { useState, useEffect } from "react";
import StepRenderer from "./components/StepRenderer";
import Navigation from "./components/Navigation";
import { stepConfig } from "./stepConfig";
import "./styles.css";

function App() {
    const [step, setStep] = useState(1);
    const [animationClass, setAnimationClass] = useState("slide-in");
    const [isAnimating, setIsAnimating] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [debugMode, setDebugMode] = useState(true); // MODE DEBUG - Changez en false pour la version finale

    // Obtenir la configuration de l'étape actuelle
    const currentStepData = stepConfig.find(s => s.id === step);
    const maxSteps = stepConfig.length;

    // Raccourci clavier pour activer/désactiver le debug (Ctrl+D)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                setDebugMode(!debugMode);
                console.log('Mode debug:', !debugMode ? 'ACTIVÉ' : 'DÉSACTIVÉ');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [debugMode]);

    // Gérer la transition entre les étapes
    const handleNext = () => {
        if (step < maxSteps && !isAnimating && !isProcessing) {
            setIsAnimating(true);
            setAnimationClass("slide-out");
            
            // Attendre que l'animation de sortie soit terminée
            setTimeout(() => {
                setStep(step + 1);
                setAnimationClass("slide-in");
                
                // Réinitialiser l'état d'animation après l'entrée
                setTimeout(() => {
                    setIsAnimating(false);
                }, 500); // Correspond à la durée de l'animation
            }, 500); // Correspond à la durée de l'animation
        }
    };

    // Appliquer l'animation d'entrée lors du premier chargement
    useEffect(() => {
        setAnimationClass("slide-in");
    }, []);

    return (
        <div className="app-container">
            {/* Navigation pour le mode debug */}
            {debugMode && <Navigation step={step} setStep={setStep} isAnimating={isAnimating} isProcessing={isProcessing} />}
            
            <div className="content-container">
                {currentStepData && (
                    <div className={`step-container ${animationClass}`}>
                        <StepRenderer 
                            stepData={currentStepData}
                            onNext={handleNext}
                            isAnimating={isAnimating}
                            isProcessing={isProcessing}
                            setIsProcessing={setIsProcessing}
                        />
                    </div>
                )}
            </div>

            {/* Indicateur de mode debug */}
            {debugMode && (
                <div className="debug-indicator">
                    🔧 MODE DEBUG - Appuyez sur Ctrl+D pour désactiver
                </div>
            )}
        </div>
    );
}

export default App;