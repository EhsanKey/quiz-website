'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SunIcon from './icons/sun-icon';
import MoonIcon from './icons/moon-icon';

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-background text-foreground rounded-2 w-7 h-7 flex items-center justify-center cursor-pointer"
    >
      {mounted ? (
        resolvedTheme === 'dark' ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        <div className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
