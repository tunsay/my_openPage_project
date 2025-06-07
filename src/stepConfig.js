import { 
    createWelcomeStep,
    createNumberQuestionStep,
    createTextQuestionStep,
    createSimpleTextStep,
    createSurpriseVideoStep
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
        120,
        {
            min: "Vous devez avoir au moins 18 ans pour continuer.",
            max: "Veuillez entrer un âge valide."
        }
    ),
    
    createTextQuestionStep(
        3,
        "Veuillez entrer le code spécial pour continuer.",
        "Code d'accès :",
        "Entrez le code",
        "REACT2023",
        "Code valide ! Vous pouvez continuer."
    ),
      createSurpriseVideoStep(
        4,
        "Prépare-toi pour une surprise...",
        "/re8.mp4",
        "🎉 Surprise mon pote ! J'espère que cette vidéo t'a plu ! 🎉"
    ),
    
    createSimpleTextStep(5, "Félicitations ! Vous avez complété toutes les étapes avec succès.")
];
