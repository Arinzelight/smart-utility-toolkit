import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { AlertTriangle } from 'lucide-react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export const DeleteConfirmationModal = ({ 
  visible, 
  onClose, 
  onConfirm,
  title = "Delete Task?"
}: DeleteConfirmationModalProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      hardwareAccelerated={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <Animated.View 
          entering={ZoomIn} 
          style={[styles.content, { backgroundColor: theme.card }]}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.error + '20' }]}>
            <AlertTriangle size={32} color={theme.error} />
          </View>

          <Text variant="headlineSmall" style={[styles.title, { color: theme.text }]}>
            {title}
          </Text>
          
          <Text variant="bodyMedium" style={[styles.description, { color: theme.textSecondary }]}>
            Are you sure you want to delete this task? This action cannot be undone.
          </Text>

          <View style={styles.footer}>
            <Button 
              mode="text" 
              onPress={onClose} 
              textColor={theme.textSecondary}
              style={styles.button}
            >
              Cancel
            </Button>
            <Button 
              mode="contained" 
              onPress={() => {
                onConfirm();
                onClose();
              }} 
              buttonColor={theme.error}
              style={styles.button}
              labelStyle={{ fontWeight: '700' }}
            >
              Delete
            </Button>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: Spacing.xl,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    width: '100%',
    maxWidth: 340,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontWeight: '800',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: Radius.md,
  },
});
