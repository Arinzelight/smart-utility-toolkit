/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#4F46E5', // Indigo 600
    secondary: '#10B981', // Emerald 500
    tertiary: '#F59E0B', // Amber 500
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    tint: '#4F46E5',
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#4F46E5',
    error: '#EF4444',
    success: '#10B981',
    info: '#3B82F6', // Blue 500
    warning: '#F59E0B', // Amber 500
  },
  dark: {
    primary: '#6366F1', // Indigo 500
    secondary: '#34D399', // Emerald 400
    tertiary: '#FBBF24', // Amber 400
    background: '#0F172A', // Slate 900
    card: '#1E293B', // Slate 800
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    tint: '#6366F1',
    icon: '#64748B',
    tabIconDefault: '#64748B',
    tabIconSelected: '#6366F1',
    error: '#F87171',
    success: '#34D399',
    info: '#60A5FA', // Blue 400
    warning: '#FBBF24', // Amber 400
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
