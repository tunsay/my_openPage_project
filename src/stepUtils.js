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
 * Crée une étape avec seulement du texte (message de fin)
 * @param {number} id - Numéro de l'étape
 * @param {string} text - Texte à afficher
 */
export const createSimpleTextStep = (id, text) => ({
    id,
    type: "simple-text",
    content: { text }
});