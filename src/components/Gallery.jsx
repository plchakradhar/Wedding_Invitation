import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { Camera } from 'lucide-react';

import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';
import gallery6 from '../assets/gallery-6.jpg';

const photos = [
  { src: gallery1, caption: 'Sunset Promise & Stolen Glances' },
  { src: gallery2, caption: 'In Full Bloom — Garden Romance' },
  { src: gallery3, caption: 'Golden Hour & Warm Laughter' },
  { src: gallery4, caption: 'Royal Courtyard & Heritage Elegance' },
  { src: gallery5, caption: 'Walks Along Emerald Lawns' },
  { src: gallery6, caption: 'Under A Canopy of Twinkling Lights' },
];

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-5 relative z-20 overflow-hidden">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <Camera className="w-3.5 h-3.5 text-gold" />
          <span>Our Journey</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
          {t('gallery.title')}
        </h2>
        <p className="font-serif text-sm text-olive-light mb-8 italic">
          {t('gallery.subtitle')}
        </p>

        {/* Swiper Cards Carousel */}
        <div className="w-[280px] sm:w-[320px] mx-auto py-4">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay, Pagination]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full h-[400px] sm:h-[440px] rounded-3xl"
          >
            {photos.map((item, idx) => (
              <SwiperSlide key={idx} className="rounded-3xl overflow-hidden shadow-wedding-lg">
                <div className="relative w-full h-full bg-cream card-gold-border p-2.5 flex flex-col justify-between">
                  <div className="relative w-full h-[85%] rounded-2xl overflow-hidden bg-cream-dark">
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="h-[15%] flex items-center justify-center px-2">
                    <p className="font-serif text-xs sm:text-sm text-olive-dark italic truncate">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
}
