'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const destinations = [
  'london',
  'paris',
  'tokyo',
  'new york',
  'rome',
  'barcelona',
  'amsterdam',
  'singapore',
];

interface TypingPlaceholderProps {
  className?: string;
}

export function TypingPlaceholder({ className }: TypingPlaceholderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = destinations[currentIndex];

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        const timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 150); // Slowed down typing speed
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Increased pause at the end
        return () => clearTimeout(timeoutId);
      }
    } else {
      if (displayText.length === 0) {
        const timeoutId = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % destinations.length);
          setIsTyping(true);
        }, 500); // Added delay before next word
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 75); // Slowed down deletion speed
        return () => clearTimeout(timeoutId);
      }
    }
  }, [displayText, currentIndex, isTyping]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={displayText}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {displayText}
      </motion.span>
    </AnimatePresence>
  );
}
