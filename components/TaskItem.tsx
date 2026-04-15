import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Checkbox, IconButton } from 'react-native-paper';
import { Trash2, Edit2 } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft, Layout } from 'react-native-reanimated';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Task } from '@/hooks/use-tasks';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      <View 
        style={[
          styles.container,
          { 
            backgroundColor: theme.card, 
            borderColor: theme.border,
            opacity: task.completed ? 0.7 : 1
          }
        ]}
      >
        <View style={styles.leftContent}>
          <Checkbox.Android
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={() => onToggle(task.id)}
            color={theme.primary}
          />
          <Pressable 
            style={styles.textContainer} 
            onPress={() => onToggle(task.id)}
          >
            <Text
              style={[
                styles.text,
                { 
                  color: theme.text,
                  textDecorationLine: task.completed ? 'line-through' : 'none',
                }
              ]}
              variant="bodyLarge"
            >
              {task.text}
            </Text>
          </Pressable>
        </View>

        <View style={styles.actions}>
          <IconButton
            icon={() => <Edit2 size={18} color={theme.textSecondary} />}
            onPress={() => onEdit(task)}
            size={20}
          />
          <IconButton
            icon={() => <Trash2 size={18} color={theme.error} />}
            onPress={() => onDelete(task.id)}
            size={20}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.sm,
    paddingRight: Spacing.xs,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.sm,
  },
  text: {
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
