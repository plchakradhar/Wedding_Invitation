import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { weddingConfig } from '../data/config';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('wedding_music_muted') === 'true';
  });
  const musicRef = useRef(null);
  const chimeRef = useRef(null);
  const zipRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Howl({
      src: [weddingConfig.audio.src],
      html5: true,
      loop: true,
      volume: 0,
      preload: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    chimeRef.current = new Howl({
      src: [weddingConfig.audio.chimeSrc],
      volume: 0.7,
      preload: true,
    });

    zipRef.current = new Howl({
      src: ['/zip.wav'],
      volume: 0.65,
      preload: true,
    });

    return () => {
      if (musicRef.current) musicRef.current.unload();
      if (chimeRef.current) chimeRef.current.unload();
      if (zipRef.current) zipRef.current.unload();
    };
  }, []);

  const startMusic = useCallback(() => {
    if (!musicRef.current) return;
    if (musicRef.current.playing()) return;

    const targetVolume = isMuted ? 0 : weddingConfig.audio.volume;
    musicRef.current.play();
    musicRef.current.fade(0, targetVolume, 2000);
  }, [isMuted]);

  const toggleMusic = useCallback(() => {
    if (!musicRef.current) return;

    if (isMuted) {
      setIsMuted(false);
      localStorage.setItem('wedding_music_muted', 'false');
      if (!musicRef.current.playing()) {
        musicRef.current.play();
      }
      musicRef.current.fade(musicRef.current.volume(), weddingConfig.audio.volume, 800);
    } else {
      setIsMuted(true);
      localStorage.setItem('wedding_music_muted', 'true');
      musicRef.current.fade(musicRef.current.volume(), 0, 800);
    }
  }, [isMuted]);

  const playChime = useCallback(() => {
    if (!isMuted && chimeRef.current) {
      chimeRef.current.play();
    }
  }, [isMuted]);

  const playZipSound = useCallback(() => {
    if (!isMuted && zipRef.current) {
      zipRef.current.play();
    }
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    startMusic,
    toggleMusic,
    playChime,
    playZipSound,
  };
}
