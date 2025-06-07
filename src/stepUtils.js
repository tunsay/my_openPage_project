// Utilitaires pour créer facilement de nouvelles étapes

/**
 * Crée une étape de bienvenue simple
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte à afficher
 */
export const createWelcomeStep = (id, text) => ({
    id,
    type: "welcome",
    content: { text }
});

/**
 * Crée une étape avec seulement du texte (pas de bouton suivant)
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte à afficher
 */
export const createSimpleTextStep = (id, text) => ({
    id,
    type: "simple-text",
    content: { text }
});

/**
 * Crée une étape vidéo
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte descriptif
 * @param {string} videoSrc - Chemin vers la vidéo (ex: "/video.mp4")
 * @param {boolean} autoplay - Lecture automatique (défaut: false)
 * @param {boolean} controls - Afficher les contrôles (défaut: true)
 * @param {boolean} autoFullscreen - Passer automatiquement en plein écran (défaut: false)
 * @param {string} endMessage - Message à afficher à la fin (défaut: "J'espère que ça t'a plu !")
 * @param {boolean} showSkip - Afficher un bouton "Passer" (défaut: false)
 */
export const createVideoStep = (id, text, videoSrc, autoplay = false, controls = true, autoFullscreen = false, endMessage = "J'espère que ça t'a plu !", showSkip = false) => ({
    id,
    type: "video",
    content: {
        text,
        videoSrc,
        autoplay,
        controls,
        autoFullscreen,
        endMessage,
        showSkip
    }
});

/**
 * Crée une étape avec question et validation numérique
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte de présentation
 * @param {string} question - Libellé de la question
 * @param {string} placeholder - Placeholder pour l'input
 * @param {number} min - Valeur minimum
 * @param {number} max - Valeur maximum
 * @param {object} errorMessages - Messages d'erreur personnalisés
 */
export const createNumberQuestionStep = (id, text, question, placeholder, min, max, errorMessages = {}) => ({
    id,
    type: "question",
    content: {
        text,
        question,
        placeholder,
        inputType: "number",
        validation: {
            required: true,
            min,
            max,
            errorMessages: {
                required: "Veuillez entrer une valeur.",
                invalid: "Veuillez entrer un nombre valide.",
                min: `La valeur doit être au moins ${min}.`,
                max: `La valeur ne peut pas dépasser ${max}.`,
                ...errorMessages
            }
        }
    }
});

/**
 * Crée une étape avec question et validation de texte/code
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte de présentation
 * @param {string} question - Libellé de la question
 * @param {string} placeholder - Placeholder pour l'input
 * @param {string} expectedValue - Valeur attendue
 * @param {string} successMessage - Message de succès
 * @param {object} errorMessages - Messages d'erreur personnalisés
 */
export const createTextQuestionStep = (id, text, question, placeholder, expectedValue, successMessage, errorMessages = {}) => ({
    id,
    type: "question",
    content: {
        text,
        question,
        placeholder,
        inputType: "text",
        validation: {
            required: true,
            expectedValue,
            errorMessages: {
                required: "Veuillez entrer une réponse.",
                invalid: "Réponse incorrecte. Veuillez réessayer.",
                ...errorMessages
            },
            successMessage
        }
    }
});

/**
 * Crée une étape vidéo surprise (plein écran automatique, sans contrôles)
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte descriptif (affiché avant le plein écran)
 * @param {string} videoSrc - Chemin vers la vidéo
 * @param {string} endMessage - Message surprise à la fin
 */
export const createSurpriseVideoStep = (id, text, videoSrc, endMessage = "🎉 Surprise ! J'espère que ça t'a plu ! 🎉") => ({
    id,
    type: "video",
    content: {
        text,
        videoSrc,
        autoplay: true,
        controls: false,
        autoFullscreen: true,
        endMessage,
        showSkip: false
    }
});

// ...existing code...
/*
// Étape de bienvenue
const step1 = createWelcomeStep(1, "Bienvenue dans notre application !");

// Étape vidéo
const step2 = createVideoStep(2, "Regardez cette présentation", "/ma-video.mp4");

// Question d'âge
const step3 = createNumberQuestionStep(
    3,
    "Pour continuer, nous devons vérifier votre âge.",
    "Votre âge :",
    "Entrez votre âge",
    18,
    120,
    { min: "Vous devez être majeur pour continuer." }
);

// Question de code
const step4 = createTextQuestionStep(
    4,
    "Entrez le code secret pour accéder au contenu.",
    "Code :",
    "Entrez le code",
    "SECRET123",
    "Parfait ! Vous avez le bon code."
);

// Texte final
const step5 = createSimpleTextStep(5, "Félicitations ! Vous avez terminé.");
*/
