import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';

// Define the available sound keys for strict typing
export type SoundType = 
    | 'click_primary' 
    | 'click_secondary'
    | 'success' 
    | 'error' 
    | 'info'
    | 'ui_open'
    | 'ui_close'
    | 'game_start'
    | 'mine_safe'
    | 'mine_boom'
    | 'cashout'
    | 'plinko_drop'
    | 'plinko_hit'
    | 'plinko_bucket';

interface SoundContextType {
    playSound: (type: SoundType, volume?: number) => void;
    isMuted: boolean;
    toggleMute: () => void;
    setMuted: (muted: boolean) => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

// V5.1 AUDIO ASSET MANIFEST
const SOUND_MANIFEST: Record<SoundType, string> = {
    // UI Sounds
    click_primary: 'https://cdn.freesound.org/previews/676/676653_5674468-lq.mp3', // Crisp click
    click_secondary: 'https://cdn.freesound.org/previews/619/619757_11369773-lq.mp3', // Soft tick
    success: 'https://cdn.freesound.org/previews/270/270402_5123851-lq.mp3', // Completion chime
    error: 'https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3', // Error buzzer
    info: 'https://cdn.freesound.org/previews/566/566468_6892926-lq.mp3', // Neutral blip
    ui_open: 'https://cdn.freesound.org/previews/265/265996_3495765-lq.mp3', // Swish open
    ui_close: 'https://cdn.freesound.org/previews/265/265995_3495765-lq.mp3', // Swish close
    
    // Game Sounds
    game_start: 'https://cdn.freesound.org/previews/468/468407_9945663-lq.mp3', // Power up
    mine_safe: 'https://cdn.freesound.org/previews/566/566434_6892926-lq.mp3', // Safe tick
    mine_boom: 'https://cdn.freesound.org/previews/156/156031_2704262-lq.mp3', // Explosion
    cashout: 'https://cdn.freesound.org/previews/345/345299_6351585-lq.mp3', // Coins/Cashout
    plinko_drop: 'https://cdn.freesound.org/previews/608/608651_11311646-lq.mp3', // Drop whoosh
    plinko_hit: 'https://cdn.freesound.org/previews/351/351517_6386578-lq.mp3', // Peg hit (metallic)
    plinko_bucket: 'https://cdn.freesound.org/previews/171/171671_2437358-lq.mp3' // Bucket landing
};

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState<boolean>(() => {
        try {
            const saved = localStorage.getItem('zap_muted');
            return saved ? JSON.parse(saved) : false;
        } catch (e) {
            return false;
        }
    });

    // Audio cache to prevent re-fetching
    const audioCache = useRef<Partial<Record<SoundType, HTMLAudioElement>>>({});

    // Persist mute state
    useEffect(() => {
        try {
            localStorage.setItem('zap_muted', JSON.stringify(isMuted));
        } catch (e) {
            // ignore localstorage errors
        }
    }, [isMuted]);

    // ONE-TIME AUDIO UNLOCKER
    useEffect(() => {
        const unlockAudio = () => {
            const silent = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
            silent.play().catch((e) => {});

            ['click_primary', 'success', 'error'].forEach(type => {
                if (!audioCache.current[type as SoundType]) {
                    const audio = new Audio(SOUND_MANIFEST[type as SoundType]);
                    audio.preload = 'auto';
                    audioCache.current[type as SoundType] = audio;
                }
            });

            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };

        document.addEventListener('click', unlockAudio);
        document.addEventListener('keydown', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);

        return () => {
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
    }, []);

    const playSound = (type: SoundType, volume: number = 0.5) => {
        if (isMuted) return;

        try {
            let baseAudio = audioCache.current[type];
            if (!baseAudio) {
                baseAudio = new Audio(SOUND_MANIFEST[type]);
                baseAudio.preload = 'auto';
                audioCache.current[type] = baseAudio;
            }

            const audioClone = baseAudio.cloneNode() as HTMLAudioElement;
            audioClone.volume = Math.min(Math.max(volume, 0), 1);

            const playPromise = audioClone.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name === 'NotAllowedError') {
                        console.warn("ZAP AUDIO: Playback blocked by browser. Interaction required.");
                    } else {
                        console.warn("ZAP AUDIO: Playback failed.", error);
                    }
                });
            }
        } catch (e) {
            console.error("ZAP AUDIO CRITICAL FAILURE:", e);
        }
    };

    const toggleMute = () => setIsMuted(prev => !prev);
    const setMuted = (muted: boolean) => setIsMuted(muted);

    return (
        <SoundContext.Provider value={{ playSound, isMuted, toggleMute, setMuted }}>
            {children}
        </SoundContext.Provider>
    );
};

// Custom hook for easy consumption
export const useSound = () => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
