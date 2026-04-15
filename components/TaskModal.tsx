import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Task } from '@/hooks/use-tasks';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  editTask?: Task | null;
}

export const TaskModal = ({ visible, onClose, onSave, editTask }: TaskModalProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  useEffect(() => {
    if (editTask) {
      setText(editTask.text);
    } else {
      setText('');
    }
  }, [editTask, visible]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
      onClose();
      setText('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View 
            style={[
              styles.bottomSheet, 
              { 
                backgroundColor: theme.card, 
                paddingBottom: Math.max(insets.bottom, Spacing.lg) + Spacing.lg 
              }
            ]}
          >
            <Text variant="titleLarge" style={[styles.sheetTitle, { color: theme.text }]}>
              {editTask ? 'Edit Task' : 'New Task'}
            </Text>

            <TextInput
              label="What needs to be done?"
              value={text}
              onChangeText={setText}
              mode="outlined"
              autoFocus
              activeOutlineColor={theme.primary}
              style={styles.input}
              onSubmitEditing={handleSave}
            />

            <View style={styles.footer}>
              <Button 
                mode="text" 
                onPress={onClose} 
                textColor={theme.textSecondary}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={handleSave} 
                buttonColor={theme.primary}
                disabled={!text.trim()}
              >
                {editTask ? 'Save Changes' : 'Create Task'}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardView: {
    width: '100%',
  },
  bottomSheet: {
    padding: Spacing.lg,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    gap: Spacing.md,
  },
  sheetTitle: {
    fontWeight: '800',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'transparent',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
