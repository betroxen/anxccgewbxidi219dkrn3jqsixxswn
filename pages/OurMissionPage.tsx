
import React from 'react';
import { Icons } from '../components/icons';

export const OurMissionPage = () => {
    const manifestoPoints = [
        { icon: Icons.Database, title: "Empower with Data", text: "We build tools to hunt for true RTPs, uncover hidden fees, and provide the raw data you need to find your edge." },
        { icon: Icons.Eye, title: "Unwavering Transparency", text: "We will always be 100% clear about how our ratings work, how we make money, and how rewards are distributed. No secrets." },
        { icon: Icons.Users, title: "Harness Community Power", text: "The collective experience of thousands of players will always beat a single review. We amplify your voice." },
        { icon: Icons.Shield, title: "Vet for Safety", text: "We act as your first line of defense. We only partner with operators who meet our strict standards for security and fairness." },
        { icon: Icons.Gift, title: "Reward Participation", text: "You built this platform. You should own a piece of its success. We give back to those who contribute." },
    ];

    return (
        <div className="container mx-auto max-w-5xl p-4 py-16 md:p-12 page-fade-in">
             <div className="text-center mb-16">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                    Our Mission
                </h1>
                <p className="text-2xl text-[#1ed760] font-heading max-w-3xl mx-auto">
                    To build a smarter, fairer, and more profitable crypto gambling ecosystem for everyone.
                </p>
            </div>

            <div className="space-y-6">
                {manifestoPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-6 p-6 bg-[#14131c] rounded-xl border border-[#3a3846] transition-all hover:border-[#1ed760]/50">
                        <div className="flex-shrink-0 p-3 bg-[#1ed760]/10 rounded-lg">
                             {/* Fallback for icon if not matched exactly in map, using Zap as generic */}
                             <point.icon className="w-6 h-6 text-[#1ed760]" />
                        </div>
                        <div>
                            <h3 className="font-heading text-xl text-white mb-2">{point.title}</h3>
                            <p className="text-[#8d8c9e] text-lg">{point.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center p-10 bg-gradient-to-b from-[#14131c] to-black rounded-2xl border border-[#3a3846]">
                <h2 className="font-heading text-3xl text-white mb-4">Gamble Smarter, Not Harder.</h2>
                <p className="text-[#8d8c9e] text-lg max-w-2xl mx-auto">
                    This isn't just a catchy slogan. It's the core philosophy behind every tool we build and every review we write. We're here to help you win.
                </p>
            </div>
        </div>
    );
};
