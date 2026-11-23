import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { weddingConfig } from '../data/config';

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-cream/90 card-gold-border flex items-center justify-center shadow-md overflow-hidden">
        {/* Subtle horizontal flip divider line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold/25 z-10" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-serif text-3xl sm:text-4xl font-bold text-olive-dark tracking-tight"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-sans text-[11px] sm:text-xs uppercase tracking-widest text-olive-light font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useTranslation();
  const { days, hours, minutes, seconds } = useCountdown(weddingConfig.weddingDateTimeISO);

  return (
    <section className="py-14 px-5 relative z-20">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>Save The Date</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-6">
          {t('countdown.title')}
        </h2>

        {/* 4 Countdown Flip Tiles */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 justify-center items-center max-w-sm mx-auto">
          <CountdownUnit value={days} label={t('countdown.days')} />
          <CountdownUnit value={hours} label={t('countdown.hours')} />
          <CountdownUnit value={minutes} label={t('countdown.minutes')} />
          <CountdownUnit value={seconds} label={t('countdown.seconds')} />
        </div>
      </motion.div>
    </section>
  );
}
