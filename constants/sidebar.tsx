
import { Icons } from '../components/icons';
import React from 'react';

export const sidebarNavItems = [
  { group: "DAS", items: [
    { title: "Dashboard", href: "#", icon: Icons.LayoutDashboard as React.FC },
  ]},
  { group: "COM", items: [
    { title: "Alpha Feed", href: "#", icon: Icons.Users as React.FC },
    { title: "Leaderboards", href: "#", icon: Icons.Trophy as React.FC },
    { title: "Missions", href: "#", icon: Icons.Target as React.FC },
    { title: "Messages", href: "#", icon: Icons.Mail as React.FC },
  ]},
  { group: "CAS", items: [
    { title: "Casino Directory", href: "#", icon: Icons.Star as React.FC },
    { title: "Bonus Offers", href: "#", icon: Icons.Percent as React.FC },
    { title: "Tournaments", href: "#", icon: Icons.Zap as React.FC },
  ]},
  { group: "TOOLS", items: [
    { title: "Strategy Sandbox", href: "#", icon: Icons.Binary as React.FC },
    { title: "Bonus Calculator", href: "#", icon: Icons.Calculator as React.FC },
    { title: "RTP Tracker", href: "#", icon: Icons.Activity as React.FC },
  ]},
  { group: "SUP", items: [
    { title: "Support", href: "#", icon: Icons.HelpCircle as React.FC },
    { title: "FAQ", href: "#", icon: Icons.BookOpen as React.FC },
    { title: "Command Console", href: "#", icon: Icons.Settings as React.FC },
  ]}
];
