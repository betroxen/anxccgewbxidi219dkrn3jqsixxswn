
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';

export const PreferencesPage = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [compactMode, setCompactMode] = useState(false);
    const [autoPlayVideos, setAutoPlayVideos] = useState(false);

    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-8">Preferences</h1>
            <p className="text-lg text-[#8d8c9e] mb-8">Customize your Zap experience.</p>

            <div className="space-y-6">
                <Card className="p-6">
                    <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-2">
                        <Icons.LayoutDashboard className="h-5 w-5 text-[#1ed760]" /> Interface
                    </h2>
                    <div className="divide-y divide-[#3a3846]">
                         <Toggle 
                            checked={showBalance} 
                            onChange={setShowBalance} 
                            label="Show ZAP Balance in Header"
                            description="Toggle visibility of your point balance on the top navigation bar."
                        />
                         <Toggle 
                            checked={compactMode} 
                            onChange={setCompactMode} 
                            label="Compact Mode"
                            description="Reduce spacing and font sizes for a denser information view."
                        />
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-2">
                        <Icons.Eye className="h-5 w-5 text-[#1ed760]" /> Content
                    </h2>
                    <div className="divide-y divide-[#3a3846]">
                         <Toggle 
                            checked={autoPlayVideos} 
                            onChange={setAutoPlayVideos} 
                            label="Autoplay Media"
                            description="Automatically play GIFs and videos in the Alpha Feed."
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};
