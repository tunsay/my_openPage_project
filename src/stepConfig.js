import { 
    createWelcomeStep,
    createSimpleTextStep
} from './stepUtils';

// Configuration des étapes
export const stepConfig = [
    createWelcomeStep(1, "Bienvenue dans notre application. Ceci est un message de présentation."),
    
    // Step 2 et 3 sont gérés directement par leurs composants individuels
    { id: 2, type: "custom" }, // Step2.jsx - Quiz
    { id: 3, type: "custom" }, // Step3.jsx - Code d'accès
    
    createSimpleTextStep(4, "Félicitations ! Vous avez complété toutes les étapes avec succès.")
];
