'use client';

// src/components/ui/FlyToCartAnimation.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface FlyToCartAnimationProps {
  imageSrc: string;
  start: Position;
  end: Position;
  onAnimationComplete: () => void;
}

export default function FlyToCartAnimation({
  imageSrc,
  start,
  end,
  onAnimationComplete,
}: FlyToCartAnimationProps) {
  useEffect(() => {
    // On peut éventuellement déclencher des actions au montage
  }, []);

  return (
    <AnimatePresence>
      <motion.img
        src={imageSrc}
        initial={{
          position: 'absolute',
          top: start.y,
          left: start.x,
          width: 100,
          height: 100,
          opacity: 1,
        }}
        animate={{
          top: end.y,
          left: end.x,
          width: 50,
          height: 50,
          opacity: 0.5,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        onAnimationComplete={onAnimationComplete}
        style={{ zIndex: 1000, pointerEvents: 'none' }}
      />
    </AnimatePresence>
  );
}
