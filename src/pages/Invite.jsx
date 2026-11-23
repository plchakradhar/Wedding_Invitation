import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DoorIntro from '../components/DoorIntro';
import CurtainReveal from '../components/CurtainReveal';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import ScratchReveal from '../components/ScratchReveal';
import Countdown from '../components/Countdown';
import Gallery from '../components/Gallery';
import Timeline from '../components/Timeline';
import PreWeddingEvents from '../components/PreWeddingEvents';
import VenueMap from '../components/VenueMap';
import RSVPForm from '../components/RSVPForm';
import Footer from '../components/Footer';
import MusicToggle from '../components/MusicToggle';
import LanguageToggle from '../components/LanguageToggle';
import { useAudio } from '../hooks/useAudio';
import guestsData from '../data/guests.json';
import sceneBg from '../assets/scene-bg.jpg';

export default function Invite() {
  const { guestSlug } = useParams();
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);

  const { isMuted, toggleMusic, startMusic, playChime, playZipSound } = useAudio();

  // Look up personalized guest name from slug or format slug
  const guestName = guestSlug
    ? guestsData[guestSlug] ||
      guestSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null;

  // Lock scroll until doors/zipper open
  useEffect(() => {
    if (!isDoorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isDoorOpen]);

  const handleOpenDoors = () => {
    startMusic();
    setIsDoorOpen(true);

    // Curtain pulls apart smoothly as the zipper unzips
    setTimeout(() => {
      setIsCurtainOpen(true);
    }, 200);

    // Dismiss intro layer from DOM after opening animation finishes
    setTimeout(() => {
      setIntroDismissed(true);
    }, 2200);
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center bg-stone-900 overflow-x-hidden selection:bg-gold/30">
      
      {/* Soft blurred background for desktop view outside the 480px frame */}
      <div
        className="fixed inset-0 hidden md:block bg-cover bg-center filter blur-3xl opacity-30 pointer-events-none scale-110"
        style={{ backgroundImage: `url(${sceneBg})` }}
      />

      {/* Main 480px Centered Column (Mobile First Viewport) */}
      <div className="relative w-full max-w-[480px] min-h-screen bg-cream paper-texture shadow-2xl overflow-x-hidden flex flex-col">
        
        {/* Frame 1 & 2 & 3: Hero & Courtyard with Zipper Curtain Intro */}
        <div className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden">
          {/* Courtyard Scene & Silk Drapes (Frame 2) */}
          <CurtainReveal isCurtainOpen={isCurtainOpen} />
          
          {/* Hero Section (Frame 3) */}
          <Hero guestName={guestName} />

          {/* Luxury Zipper Curtain Intro on top (Frame 1) */}
          {!introDismissed && (
            <DoorIntro onOpen={handleOpenDoors} isOpen={isDoorOpen} onZipSound={playZipSound} />
          )}
        </div>

        {/* Section 4: Welcome Message */}
        <Welcome />

        {/* Section 5: Scratch to Reveal Sacred Date */}
        <ScratchReveal onChime={playChime} />

        {/* Section 6: Countdown Timer */}
        <Countdown />

        {/* Section 7: Photo Gallery Carousel */}
        <Gallery />

        {/* Section 8: Program Timeline */}
        <Timeline />

        {/* Section 9: Pre-Wedding Celebrations, Dress Code & Logistics */}
        <PreWeddingEvents />

        {/* Section 10: Venue & Interactive Map */}
        <VenueMap />

        {/* Section 11: RSVP Form */}
        <RSVPForm defaultGuestName={guestName} guestSlug={guestSlug} />

        {/* Section 12: Footer */}
        <Footer />

        {/* Floating Controls: Music Toggle & Language Switcher */}
        <MusicToggle isMuted={isMuted} toggleMusic={toggleMusic} />
        <LanguageToggle />

      </div>
    </div>
  );
}
