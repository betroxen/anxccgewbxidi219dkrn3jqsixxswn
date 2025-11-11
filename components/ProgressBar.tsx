
import React from 'react';

interface ProgressBarProps {
    progress: number;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
    const progressWidth = Math.min(100, Math.max(0, progress));

    return (
        <div className={`w-full bg-[#000000]/40 rounded-full h-2.5 overflow-hidden ${className}`}>
            <div 
                className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ 
                    width: `${progressWidth}%`,
                    background: 'linear-gradient(90deg, #00FFC0, #00DD99)',
                    boxShadow: '0 0 10px rgba(0, 255, 192, 0.5)'
                }}
            >
                 {/* Subtle moving shine effect */}
                <div 
                    className="absolute top-0 left-0 right-0 bottom-0 opacity-30"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                        animation: 'shimmer 2s infinite linear',
                        backgroundSize: '200% 100%'
                    }}
                />
                 <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </div>
        </div>
    );
};
