import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function Step2({ onNext, isAnimating, isProcessing, setIsProcessing }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [displayedQuestion, setDisplayedQuestion] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    // 10 questions avec leurs réponses
    const questions = [
        { question: "Dans quel jeu l’humanité s’est-elle réfugiée sur la Lune après la défaite face aux envahisseurs mécaniques ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Quel jeu a reçu le prix du « Meilleur jeu d’action » lors des Game Developers Choice Awards 2018 ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Quel jeu met en scène des androïdes en lutte contre des machines ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Quel jeu a été développé par PlatinumGames et publié par Square Enix et qui a failli être GOTY (cheh) ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Dans quel jeu dois-tu traîner une pute qui va à 2 à l'heure parce que soi-disant il y a un virus en elle ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Devine ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Quel jeu célèbre pour sa bande-son composée par Keiichi Okabe mélange des thèmes électroniques et orchestraux ? Même si personnellement je préfère Nobuo Uematsu qui est mon Chintok préféré après Bruce Lee", type: "text", correctAnswer: "Nier Automata" },
        { question: "Quel titre a été réalisé par Yoko Taro (très BG je l'ai vu en soirée), connu pour son scénario profondément philosophique et ses multiples fins ?", type: "text", correctAnswer: "Nier Automata" },
        { question: "Devine ce jeu où je suis reconnu grâce à ma grosse tarpé, parce que je jure que si on m'entend encore parler c'est parce que je suis bonne et que si j'étais un mec je n'intéresserais absolument personne, j'm'en bats les couilles je dénonce, non mais franchement, est-ce qu'il y a un bouffon sur terre qui est fan de 9 Fesses, Adam le dit lui-même que ce petit con veut se taper Teubé à la fin du scénario C", type: "text", correctAnswer: "Nier Automata" },
        { question: "FEfeifioezfzeriognezpzpfoeig,pero,gbper,gergergjergnirengineroingoierngoierngoinreoingoiergionreoniionoinoi ?", type: "text", correctAnswer: "Nier Automata" }
    ];
    
    const currentQuestion = questions[currentQuestionIndex];
      // Réinitialiser isProcessing quand le composant se monte
    useEffect(() => {
        setIsProcessing(false);
    }, [setIsProcessing]);
    
    // Effet dactylo pour chaque question
    useEffect(() => {
        const question = currentQuestion.question;
        setDisplayedQuestion('');
        setIsTyping(true);
        setAnswer(''); // Réinitialiser la réponse aussi
        setError(''); // Réinitialiser l'erreur
        
        let currentIndex = 0;
        const typingSpeed = 30; // Vitesse de frappe en millisecondes
        
        const typeWriter = () => {
            if (currentIndex < question.length) {
                setDisplayedQuestion(question.slice(0, currentIndex + 1));
                currentIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                setIsTyping(false);
            }
        };
        
        // Petit délai avant de commencer l'effet
        const startTyping = setTimeout(typeWriter, 200);
        
        return () => {
            clearTimeout(startTyping);
        };
    }, [currentQuestionIndex, currentQuestion.question]);
    
    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Empêcher le spam de soumission
        if (isProcessing || isAnimating) return;
        
        setIsProcessing(true);
        
        // Vérification que la réponse n'est pas vide
        if (!answer.trim()) {
            setError('Allez, réponds à la question ! Tu fais quoi là ? 🤔');
            setIsProcessing(false);
            return;
        }
        
        let isCorrect = false;
        
        if (currentQuestion.type === 'number') {
            const numAnswer = parseInt(answer.trim(), 10);
            
            if (isNaN(numAnswer)) {
                setError('C\'est pas un nombre ça ! Tu sais compter au moins ? 😤');
                setIsProcessing(false);
                return;
            }
            
            // Question spéciale pour l'âge (première question)
            if (currentQuestionIndex === 0) {
                if (numAnswer < currentQuestion.min) {
                    setError('Eh oh ! Tu es trop jeune pour être ici ! Reviens quand tu seras majeur ! 🚫👶');
                    setIsProcessing(false);
                    return;
                }
                if (numAnswer > currentQuestion.max) {
                    setError('Sérieusement ? Tu as plus de 120 ans ? Même pas possible ! 🧓💀');
                    setIsProcessing(false);
                    return;
                }
                isCorrect = true; // L'âge est valide
            } else {
                isCorrect = numAnswer === currentQuestion.correctAnswer;
            }
        } else {
            isCorrect = answer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
        }
        
        if (!isCorrect) {
            setError('Wesh ! Fais un effort ! 🤦‍♂️');
            setIsProcessing(false);
            return;
        }
          // Réponse correcte
        setError('');
        setIsProcessing(false);
        
        if (currentQuestionIndex === questions.length - 1) {
            // Dernière question - succès !
            setSuccess(true);
            triggerConfetti();
        } else {
            // Passer à la question suivante (l'effet dactylo se chargera de réinitialiser answer et error)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleNext = () => {
        if (!isAnimating && !isProcessing) {
            onNext();
        }
    };    return (
        <div className="question-container">
            <h2>Quiz de validation ({currentQuestionIndex + 1}/10)</h2>
            {/* <p>Réponds correctement aux 10 questions pour continuer.</p> */}
            
            {success ? (
                <div className="success-container">                    <div className="success-message">
                        🎉 Bravo ! Tu as répondu à toutes les questions, tu n'es peut-être pas si con que ça ! 🎉
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={handleNext} disabled={isAnimating}>
                            Suivant
                        </button>
                    </div>
                </div>
            ) : (                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="answer" className="typewriter-text">
                            {displayedQuestion}
                            {isTyping && <span className="cursor">|</span>}
                        </label>
                        <input
                            type={currentQuestion.type === 'number' ? 'number' : 'text'}
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder={currentQuestion.type === 'number' ? 'Entrez un nombre' : 'Entrez votre réponse'}
                            disabled={isTyping || isAnimating || isProcessing}
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    
                    <div className="navigation-buttons">
                        <button type="submit" disabled={isAnimating || isProcessing || isTyping}>
                            {isProcessing ? 'Vérification...' : 'Vérifier'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Step2;