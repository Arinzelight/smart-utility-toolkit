import { useState, useEffect, useCallback } from 'react';
import { useColorScheme as useNativeColorScheme, Appearance, ColorSchemeName } from 'react-native';

type ThemeMode = 'system' | 'light' | 'dark';

let currentMode: ThemeMode = 'system';
const listeners = new Set<() => void>();

export const setThemeMode = (mode: ThemeMode) => {
  currentMode = mode;
  listeners.forEach(listener => listener());
};

export const useColorScheme = (): ColorSchemeName => {
  const nativeScheme = useNativeColorScheme() ?? 'light';
  
  const [mode, setMode] = useState<ThemeMode>(currentMode);

  useEffect(() => {
    const listener = () => setMode(currentMode);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (mode === 'system') return nativeScheme;
  return mode as ColorSchemeName;
};

export const useThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>(currentMode);

  useEffect(() => {
    const listener = () => setMode(currentMode);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const toggleTheme = useCallback(() => {
    const nativeScheme = Appearance.getColorScheme() ?? 'light';
    const activeScheme = currentMode === 'system' ? nativeScheme : currentMode;
    
    // Toggle: Light -> Dark, Dark -> Light
    const newMode = activeScheme === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  }, [mode]);

  return { toggleTheme, currentMode: mode };
};
