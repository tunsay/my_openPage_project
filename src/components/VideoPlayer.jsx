import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ stepData, onNext, isAnimating }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Fonction pour passer en plein écran
    const enterFullscreen = async () => {
        try {
            if (containerRef.current) {
                if (containerRef.current.requestFullscreen) {
                    await containerRef.current.requestFullscreen();
                } else if (containerRef.current.webkitRequestFullscreen) {
                    await containerRef.current.webkitRequestFullscreen();
                } else if (containerRef.current.msRequestFullscreen) {
                    await containerRef.current.msRequestFullscreen();
                }
                setIsFullscreen(true);
            }
        } catch (error) {
            console.warn("Impossible d'entrer en plein écran:", error);
        }
    };

    // Gestionnaire de fin de vidéo
    const handleVideoEnded = () => {
        setVideoEnded(true);
        setShowEndMessage(true);
        
        // Sortir du plein écran après un délai
        setTimeout(() => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }, 3000); // Attendre 3 secondes avant de sortir du plein écran
    };

    // Écouter les changements de plein écran
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement
            );
            setIsFullscreen(isCurrentlyFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Démarrer automatiquement la vidéo en plein écran si configuré
    useEffect(() => {
        if (stepData.content.autoFullscreen && videoRef.current) {
            const timer = setTimeout(() => {
                enterFullscreen();
                videoRef.current.play();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [stepData.content.autoFullscreen]);

    // Empêcher le clic droit et autres interactions en plein écran
    const handleContextMenu = (e) => {
        if (isFullscreen) {
            e.preventDefault();
        }
    };

    const handleKeyDown = (e) => {
        if (isFullscreen && !videoEnded) {
            // Empêcher l'échappement et autres touches
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, videoEnded]);

    return (
        <div 
            ref={containerRef}
            className={`video-container ${isFullscreen ? 'fullscreen-video' : ''}`}
            onContextMenu={handleContextMenu}
        >
            {!isFullscreen && (
                <p>{stepData.content.text}</p>
            )}
            
            <video
                ref={videoRef}
                src={stepData.content.videoSrc}
                className="step-video"
                controls={stepData.content.controls && !isFullscreen}
                autoPlay={stepData.content.autoplay}
                onEnded={handleVideoEnded}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                style={{
                    pointerEvents: isFullscreen && !videoEnded ? 'none' : 'auto'
                }}
            />

            {/* Message de fin qui s'affiche par-dessus la vidéo */}
            {showEndMessage && (
                <div className="video-end-message">
                    <div className="end-message-content">
                        <h2>🎉 Surprise ! 🎉</h2>
                        <p>{stepData.content.endMessage || "J'espère que ça t'a plu !"}</p>
                        {videoEnded && (
                            <button 
                                onClick={onNext} 
                                disabled={isAnimating}
                                className="end-message-button"
                            >
                                Continuer
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Boutons normaux si pas en plein écran */}
            {!isFullscreen && !stepData.content.autoFullscreen && (
                <div className="navigation-buttons">
                    <button onClick={enterFullscreen} disabled={isAnimating}>
                        Voir en plein écran
                    </button>
                    {stepData.content.showSkip && (
                        <button onClick={onNext} disabled={isAnimating}>
                            Passer
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoPlayer;
