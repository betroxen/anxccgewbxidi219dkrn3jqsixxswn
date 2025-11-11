import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface CardData {
    icon: React.FC<any>;
    title: string;
    description: string;
}

interface GenericPageProps {
    title: string;
    intro: string;
    cards: CardData[];
    ctaText?: string;
    ctaAction?: () => void;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title, intro, cards, ctaText, ctaAction }) => {
  return (
    <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
      <h1 className="font-heading text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-lg text-[#8d8c9e] mb-10">{intro}</p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card key={index} className="p-8 group hover:border-[#00FFC0]/50 hover:-translate-y-2">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00FFC0]/10">
              <card.icon className="h-6 w-6 text-[#00FFC0]" />
            </div>
            <h3 className="font-heading mb-3 text-2xl font-semibold text-white">{card.title}</h3>
            <p className="text-[#8d8c9e]">{card.description}</p>
          </Card>
        ))}
      </div>
      {ctaText && (
        <div className="mt-12 text-center">
          <Button size="lg" onClick={ctaAction}>
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
};
