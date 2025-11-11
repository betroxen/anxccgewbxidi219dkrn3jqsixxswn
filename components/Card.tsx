
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noHover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, noHover = false, ...props }) => {
  return (
    <div
      className={`bg-[#14131c] border border-[#333333] rounded-xl ${!noHover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
