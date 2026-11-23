import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicToggle({ isMuted, toggleMusic }) {
  return (
    <motion.button
      type="button"
      onClick={toggleMusic}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-5 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center text-olive hover:text-gold shadow-lg transition-colors border border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={isMuted ? 'Play Music' : 'Mute Music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-olive/60" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-gold" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold animate-ping" />
        </div>
      )}
    </motion.button>
  );
}
