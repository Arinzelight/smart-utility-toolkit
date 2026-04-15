import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal";
import { TaskItem } from "@/components/TaskItem";
import { TaskModal } from "@/components/TaskModal";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Task, useTasks } from "@/hooks/use-tasks";
import { ListTodo } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Text } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { tasks, isLoading, addTask, toggleTask, deleteTask, editTask } =
    useTasks();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleDeleteRequest = (id: string) => {
    setTaskToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const handleSaveTask = (text: string) => {
    if (editingTask) {
      editTask(editingTask.id, text);
    } else {
      addTask(text);
    }
  };

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator color={theme.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: theme.text }]}
          variant="headlineSmall"
        >
          My Tasks
        </Text>
        <Text style={{ color: theme.textSecondary }} variant="bodyMedium">
          {tasks.filter((t) => !t.completed).length} items remaining
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={handleDeleteRequest}
            onEdit={handleEditTask}
          />
        )}
        ListEmptyComponent={
          <Animated.View
            entering={FadeIn.delay(300)}
            style={styles.emptyContainer}
          >
            <ListTodo
              size={64}
              color={theme.icon}
              style={{ marginBottom: Spacing.md, opacity: 0.5 }}
            />
            <Text variant="titleMedium" style={{ color: theme.textSecondary }}>
              No tasks yet. Tap + to add one!
            </Text>
          </Animated.View>
        }
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.primary }]}
        color="#FFF"
        onPress={handleAddTask}
      />

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTask}
        editTask={editingTask}
      />

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontWeight: "800",
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
    paddingBottom: 100, // Space for FAB
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  fab: {
    position: "absolute",
    margin: Spacing.lg,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
});
