
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';

export const MissionSection = () => {
  const manifestoItems = [
    { title: "Community is Everything.", content: "We believe that the collective knowledge of the community is more powerful than any single 'expert.' Our platform is built to reward collaboration, data sharing, and honest insights from real players." },
    { title: "Transparency is Non-Negotiable.", content: "We will always be upfront and honest about how our platform works, how casinos are rated, and how rewards are distributed. We're building tools to expose the un-exposable, from hidden fees to true RTPs." },
    { title: "Rewards Should Be Real.", content: "No more 'bonus cash' with impossible wagering requirements. Zap Points are a real, tangible asset you earn for your contributions. Use them, trade them, or hold them. Your value, your choice." },
    { title: "Data is Power.", content: "We're giving power back to the player by providing transparent, community-verified data on casinos, games, and bonuses. Stop guessing and start making informed decisions." },
    { title: "Gamble Smarter, Not Harder.", content: "Our goal is to create a more intelligent, strategic, and ultimately more profitable gambling ecosystem for everyone (except the shady operators). We're building the tools for you to find your edge." },
  ];

  return (
    <section id="mission" className="bg-[#14131c] py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="font-heading mb-6 text-center text-3xl font-bold text-white md:text-4xl">
          Our Manifesto for a Fairer Crypto Gambling Future
        </h2>
        <p className="mb-10 text-center text-lg text-[#8d8c9e]">
          We're not just building a directory. We're starting a movement. This is what we believe.
        </p>
        <Accordion multiple={false} defaultOpen={["item-0"]}>
          {manifestoItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
