import { useEffect, useState } from 'react';

export const useFadeIn = (show) => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    if (show) {
      setFadeIn(true);
    }
  }, [show]);

  const fadeOutThen = (cb) => {
    setFadeIn(false);
    setTimeout(cb, FADE_TIMEOUT);
  };

  const fadeInClass = fadeIn ? ' fadeIn ' : ' fadeOut';
  return { fadeInClass, fadeOutThen };
};

export const FADE_TIMEOUT = 150;
