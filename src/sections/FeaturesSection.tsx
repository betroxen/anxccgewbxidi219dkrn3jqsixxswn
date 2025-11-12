import React from 'react';
import { Icons } from '@/components/icons';

export const FeaturesSection = () => {
  const features = [
    { icon: Icons.Users, title: "Connect & Collaborate", description: "Track your stats, engage with a community of like-minded players, and share alpha. Your profile is your passport in the new gambling economy." },
    { icon: Icons.Shield, title: "Play with Confidence", description: "Rigorously reviewed crypto casinos. Our 'Zap Certified' badge means a platform meets our standards for fairness, transparency, and security." },
    { icon: Icons.Zap, title: "Earn Real Rewards", description: "Our revolutionary rewards system. Earn Zap Points for completing missions, sharing insights, and helping the community grow. No strings attached." }
  ];

  return (
    <section id="features" className="bg-[#000000] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-heading mb-4 text-center text-3xl font-bold text-white md:text-4xl">What We Do</h2>
        <p className="mb-12 text-center text-lg text-[#8d8c9e]">A community-powered hub, built for degens, by degens.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-[#14131c] p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0, 255, 192, 0.15)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00FFC0]/10">
                <feature.icon className="h-6 w-6 text-[#00FFC0]" />
              </div>
              <h3 className="font-heading mb-3 text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="text-[#8d8c9e]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
