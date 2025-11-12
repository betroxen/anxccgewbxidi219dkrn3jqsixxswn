import { Icons } from '../components/icons';
import React from 'react';

export const sidebarNavItems = [
  { group: "DAS", items: [
    { title: "Dashboard", path: "/dashboard", icon: Icons.LayoutDashboard as React.FC },
  ]},
  { group: "COM", items: [
    { title: "Alpha Feed", path: "/community", icon: Icons.Users as React.FC },
    { title: "Leaderboards", path: "/leaderboards", icon: Icons.Trophy as React.FC },
    { title: "Missions", path: "/missions", icon: Icons.Target as React.FC },
    { title: "Messages", path: "/messages", icon: Icons.Mail as React.FC },
  ]},
  { group: "CAS", items: [
    { title: "Casino Directory", path: "/casinos", icon: Icons.Star as React.FC },
    { title: "Bonus Offers", path: "/bonus-offers", icon: Icons.Percent as React.FC },
    { title: "Tournaments", path: "/tournaments", icon: Icons.Zap as React.FC },
  ]},
  { group: "TOOLS", items: [
    { title: "Strategy Sandbox", path: "/strategy-sandbox", icon: Icons.Binary as React.FC },
    { title: "Bonus Calculator", path: "/bonus-calculator", icon: Icons.Calculator as React.FC },
    { title: "RTP Tracker", path: "/rtp-tracker", icon: Icons.Activity as React.FC },
  ]},
  { group: "SUP", items: [
    { title: "Support", path: "/support", icon: Icons.HelpCircle as React.FC },
    { title: "FAQ", path: "/faq", icon: Icons.BookOpen as React.FC },
    { title: "Command Console", path: "/settings", icon: Icons.Settings as React.FC },
  ]}
];