import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ResultDisplayProps {
  label: string;
  value: string;
  subValue?: string;
  color?: readonly [string, string, ...string[]];
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, value, subValue, color }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const gradientColors = color ?? ([theme.primary, theme.tint] as const);

  return (
    <Animated.View entering={FadeInUp} style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.label} variant="labelLarge">
          {label}
        </Text>
        <Animated.View entering={ZoomIn.delay(200)}>
          <Text style={styles.value} variant="displaySmall">
            {value}
          </Text>
        </Animated.View>
        {subValue && (
          <Text style={styles.subValue} variant="titleMedium">
            {subValue}
          </Text>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    elevation: 0,
  },
  gradient: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  value: {
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
  },
  subValue: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: Spacing.xs,
    fontWeight: '600',
  },
});
