import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/Accordion';
import { Icons } from '@/components/icons';
import { Button } from '@/components/Button';

export const FAQComponent = () => {
  const faqItems = [
    { 
        title: "Is ZAP a casino?", 
        content: "Negative. We're the decentralized intelligence layer for crypto gambling—your command center for scores, audits, and signals. We process no wagers, hold no funds. We deliver the edge; you deploy the play." 
    },
    { 
        title: "How do I earn by participating?", 
        content: "Fuel the revolution: Submit VPRs, amplify forum intel, complete Grid missions. Accrue ZAP Points (ZP) redeemable via the Shared Success Protocol (SSP)—crypto payouts (ERC-20/SOL) scaled to your impact. Top contributors command 5-figure hauls annually." 
    },
    { 
        title: "Can operators buy a better rating?", 
        content: "Absolute zero. The Firewall is absolute: Scores lock to data pillars (40% RTP/Fees, 30% Security, 20% Veto, 10% UX)—no affiliate bleed, no backroom deals. Attempted influence? Delisting and ecosystem-wide alert. Integrity isn't negotiable; it's encoded." 
    },
    { 
        title: "Ready to find your edge?", 
        content: "The Grid awaits. Scan 500+ operators, simulate scenarios, veto the frauds. In a house-rigged war, ZAP is your asymmetric weapon." 
    }
  ];

  return (
    <section id="faq" className="bg-[#0c0c0e] py-16 md:py-24 border-t border-[#333]">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Icons.Database className="h-8 w-8 text-[#00FFC0]" />
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl uppercase tracking-wider">
                    INTEL BRIEFING: CORE QUERIES
                </h2>
            </div>
            <p className="text-[#8d8c9e] text-sm font-mono uppercase tracking-widest">
                // DECODE THESE VECTORS TO ALIGN YOUR STRATEGY
            </p>
        </div>
        
        <Accordion multiple={false} defaultOpen={["item-0"]}>
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                  <span className="font-heading uppercase text-sm md:text-base tracking-wider">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                  <p className="text-base text-[#8d8c9e] leading-relaxed border-l-2 border-[#333] pl-4 font-medium">
                    {item.content}
                  </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

         <div className="mt-12 text-center">
             <p className="text-[#8d8c9e] font-mono text-xs uppercase mb-4">GOT MORE INTEL? TRANSMIT VIA TERMINAL.</p>
         </div>
      </div>
    </section>
  );
};
