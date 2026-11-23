import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../data/config';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="pt-16 pb-28 px-5 relative z-20 text-center select-none">
      <div className="max-w-md mx-auto flex flex-col items-center">
        {/* Decorative flourish */}
        <div className="flex items-center gap-3 mb-4 opacity-75">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </div>

        <p className="font-script text-5xl text-olive mb-2">
          {t('footer.withLove')}
        </p>

        <p className="font-serif text-lg font-bold text-olive-dark tracking-wide">
          {t('footer.family')}
        </p>

        <div className="mt-4 px-4 py-1.5 rounded-full glass-pill border-gold/40 inline-block">
          <span className="font-sans text-xs uppercase tracking-widest text-gold-dark font-semibold">
            {weddingConfig.hashtag}
          </span>
        </div>

        <p className="font-sans text-[11px] text-olive-light/70 tracking-widest uppercase mt-8 flex items-center gap-1">
          <span>{t('footer.credit')}</span>
        </p>
      </div>
    </footer>
  );
}
