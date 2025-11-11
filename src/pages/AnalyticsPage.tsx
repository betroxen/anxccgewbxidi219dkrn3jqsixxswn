import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const AnalyticsPage = () => {
  const cards = [
    { icon: Icons.PieChart, title: "Betting Trends", description: "Analyze your betting patterns over time to identify profitable strategies." },
    { icon: Icons.FileText, title: "RTP Insights", description: "Community-verified RTP data for your favorite games and providers." },
    { icon: Icons.Users, title: "Peer Comparison", description: "See how you stack up against other degens in win rates and volume." }
  ];
  return (
    <GenericPage
      title="Analytics"
      intro="Dive deep into data-driven insights. Make smarter bets with ZAP's advanced analytics tools."
      cards={cards}
      ctaText="Generate Report"
      ctaAction={() => { /* Generate custom report */ }}
    />
  );
};
