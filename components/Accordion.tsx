
import React, { useState, useContext, createContext, ReactNode } from 'react';
import { Icons } from './icons';

interface AccordionContextType {
    openItems: string[];
    toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
    children: ReactNode;
    multiple?: boolean;
    defaultOpen?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({ children, multiple = false, defaultOpen = [] }) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  const toggleItem = (value: string) => {
    if (multiple) {
      setOpenItems((current) =>
        current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value]
      );
    } else {
      setOpenItems((current) => (current.includes(value) ? [] : [value]));
    }
  };
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="w-full">{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemContextType {
    value: string;
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

interface AccordionItemProps {
    value: string;
    children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, children }) => (
  <AccordionItemContext.Provider value={{ value }}>
    <div className="border-b border-[#3a3846] last:border-b-0">{children}</div>
  </AccordionItemContext.Provider>
);

interface AccordionTriggerProps {
    children: ReactNode;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children }) => {
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }
  const accordionContext = useContext(AccordionContext);
  if (!accordionContext) {
      throw new Error("AccordionTrigger must be used within an Accordion");
  }
  const { value } = itemContext;
  const { openItems, toggleItem } = accordionContext;
  const isOpen = openItems.includes(value);
  return (
    <button
      className="font-heading flex w-full items-center justify-between py-5 text-left text-base font-medium text-white hover:text-[#1ed760]"
      onClick={() => toggleItem(value)}
    >
      <span>{children}</span>
      <Icons.ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
};

interface AccordionContentProps {
    children: ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children }) => {
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }
   const accordionContext = useContext(AccordionContext);
  if (!accordionContext) {
      throw new Error("AccordionContent must be used within an Accordion");
  }
  const { value } = itemContext;
  const { openItems } = accordionContext;
  const isOpen = openItems.includes(value);
  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: isOpen ? '500px' : '0px',
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="pb-5 text-[#8d8c9e]">{children}</div>
    </div>
  );
};
