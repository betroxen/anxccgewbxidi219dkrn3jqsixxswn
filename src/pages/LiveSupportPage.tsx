
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const LiveSupportPage = () => {
  const cards = [
    { icon: Icons.MessageSquare, title: "Chat Now", description: "Connect instantly with a support agent for real-time help." },
    { icon: Icons.HelpCircle, title: "AI Assistant", description: "Get quick answers from our ZAP bot for common queries." },
    { icon: Icons.Users, title: "Community Help", description: "Browse user-solved threads in the forums." }
  ];
  return (
    <GenericPage
      title="Live Support"
      intro="Get immediate assistance from our dedicated team. We're committed to resolving your issues swiftly."
      cards={cards}
      ctaText="Start Chat"
      ctaAction={() => { /* Open live chat */ }}
    />
  );
};