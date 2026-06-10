
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
        Visual Prompt Engineer
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-brand-text-secondary">
        Transform any image into a master-level prompt for generative AI.
      </p>
    </header>
  );
};
