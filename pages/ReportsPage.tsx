
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const ReportsPage = () => {
  const cards = [
    { icon: Icons.FileText, title: "Monthly Summary", description: "Download comprehensive reports on your gambling activity and earnings." },
    { icon: Icons.Shield, title: "Compliance Logs", description: "Track your responsible gaming metrics and self-exclusion history." },
    { icon: Icons.Percent, title: "Bonus Tracking", description: "Monitor bonus wagering progress and redemption status across platforms." }
  ];
  return (
    <GenericPage
      title="Reports"
      intro="Access detailed reports to review your history, track progress, and stay accountable in the Circuit."
      cards={cards}
      ctaText="Export Data"
      ctaAction={() => { /* Export to PDF/CSV */ }}
    />
  );
};
