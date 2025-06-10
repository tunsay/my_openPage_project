import { 
    createWelcomeStep,
    createNumberQuestionStep,
    createTextQuestionStep,
    createSimpleTextStep
} from './stepUtils';

// Configuration centralisée des étapes - désormais très facile à modifier !
export const stepConfig = [
    createWelcomeStep(1, "Bienvenue dans notre application. Ceci est un message de présentation."),
      createNumberQuestionStep(
        2,
        "Veuillez indiquer votre âge pour continuer.",
        "Âge :",
        "Entrez votre âge",
        18,
        120
    ),
    
    createTextQuestionStep(
        3,
        "Veuillez entrer le code spécial pour continuer.",
        "Code d'accès :",
        "Entrez le code",
        "REACT2023",
        "Code valide ! Vous pouvez continuer."
    ),
    
    createSimpleTextStep(4, "Félicitations ! Vous avez complété toutes les étapes avec succès.")
];
