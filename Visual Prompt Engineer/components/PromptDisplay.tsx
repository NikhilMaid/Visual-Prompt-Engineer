
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface PromptDisplayProps {
  prompt: string;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
  };
  
  // A simple renderer for the specific markdown format
  const renderPrompt = (text: string) => {
    const lines = text.split('\n');
    // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    const elements: React.ReactElement[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-xl font-bold text-brand-primary mt-4 first:mt-0">{line.substring(3)}</h2>);
      } else if (line.startsWith('#### ')) {
        elements.push(<h4 key={index} className="text-lg font-semibold text-brand-secondary mt-3">{line.substring(5)}</h4>);
      } else if (line.startsWith('* **')) {
        const parts = line.substring(2).split(':**');
        elements.push(
          <p key={index} className="mt-2 text-brand-text-secondary">
            <strong className="text-brand-text">{parts[0]}</strong>
            {parts[1]}
          </p>
        );
      } else if (line.startsWith('> "')) {
         elements.push(<blockquote key={index} className="pl-4 border-l-4 border-brand-border my-2 italic text-brand-text-secondary">{line.substring(2)}</blockquote>);
      } else if (line.trim() === '---') {
         elements.push(<hr key={index} className="border-brand-border my-4" />);
      } else {
        elements.push(<p key={index} className="text-brand-text-secondary">{line}</p>);
      }
    });
    
    return elements;
  }

  return (
    <div className="relative h-full">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-brand-border hover:bg-brand-primary/50 text-brand-text-secondary hover:text-white transition-colors"
        aria-label="Copy prompt to clipboard"
      >
        {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
      </button>
      <div className="prose prose-invert prose-sm max-w-none h-full overflow-y-auto pr-4">
        {renderPrompt(prompt)}
      </div>
    </div>
  );
};