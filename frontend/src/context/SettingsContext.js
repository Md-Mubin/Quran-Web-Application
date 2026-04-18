'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const defaultSettings = {
  arabicFont: 'var(--font-amiri)',
  arabicFontSize: 24,
  translationFont: 'var(--font-roboto)',
  translationFontSize: 16,
};

const arabicFonts = [
  { name: 'Amiri Quran', value: 'var(--font-amiri)' },
  { name: 'Scheherazade', value: 'var(--font-scheherazade)' },
  { name: 'Noto Naskh Arabic', value: 'var(--font-noto-naskh-arabic)' },
];

const translationFonts = [
  { name: 'Roboto', value: 'var(--font-roboto)' },
  { name: 'Open Sans', value: 'var(--font-open-sans)' },
  { name: 'Lato', value: 'var(--font-lato)' },
];

const fontNameToValue = {
  'Amiri Quran': 'var(--font-amiri)',
  'Scheherazade': 'var(--font-scheherazade)',
  'Noto Naskh Arabic': 'var(--font-noto-naskh-arabic)',
  'Roboto': 'var(--font-roboto)',
  'Open Sans': 'var(--font-open-sans)',
  'Lato': 'var(--font-lato)',
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quranSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.arabicFont && !parsed.arabicFont.startsWith('var(')) {
        parsed.arabicFont = fontNameToValue[parsed.arabicFont] || defaultSettings.arabicFont;
      }
      if (parsed.translationFont && !parsed.translationFont.startsWith('var(')) {
        parsed.translationFont = fontNameToValue[parsed.translationFont] || defaultSettings.translationFont;
      }
      setSettings(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quranSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isOpen, setIsOpen, arabicFonts, translationFonts }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}