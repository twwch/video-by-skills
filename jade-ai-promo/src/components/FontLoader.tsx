import React from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import { googleFontUrls } from '../config/typography';

export const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [handle] = React.useState(() => delayRender('Loading fonts'));

  React.useEffect(() => {
    const links = googleFontUrls.map((url) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
      return link;
    });

    // Wait a bit for fonts to load
    const timer = setTimeout(() => {
      setLoaded(true);
      continueRender(handle);
    }, 2000);

    return () => {
      clearTimeout(timer);
      links.forEach((link) => link.remove());
    };
  }, [handle]);

  return <>{children}</>;
};
