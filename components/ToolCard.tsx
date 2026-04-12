import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { LucideIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onPress: () => void;
  color?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon: Icon, onPress, color }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.pressable, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: (color || theme.primary) + '15' }]}>
            <Icon size={28} color={color || theme.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.text }]} variant="titleMedium">
              {title}
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]} variant="bodySmall">
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  pressable: {
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    lineHeight: 16,
  },
});
