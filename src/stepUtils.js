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
