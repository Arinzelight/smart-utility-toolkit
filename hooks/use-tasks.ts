import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = '@smart_utility_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [tasks]);

  const toggleTask = useCallback(async (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [tasks]);

  const deleteTask = useCallback(async (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [tasks]);

  const editTask = useCallback(async (id: string, newText: string) => {
    if (!newText.trim()) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, text: newText.trim() } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [tasks]);

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    refreshTasks: loadTasks,
  };
};
