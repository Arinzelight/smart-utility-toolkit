import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, TextInput, SegmentedButtons, List } from 'react-native-paper';
import { useUnitConverter } from '@/hooks/use-unit-converter';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ChevronDown } from 'lucide-react-native';


export default function UnitConverterScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const {
    value,
    setValue,
    category,
    changeCategory,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    result,
    availableUnits,
  } = useUnitConverter();

  const [visibleFrom, setVisibleFrom] = useState(false);
  const [visibleTo, setVisibleTo] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} variant="headlineSmall">
            Unit Converter
          </Text>
        </View>

        <SegmentedButtons
          value={category}
          onValueChange={(v) => changeCategory(v as any)}
          buttons={[
            { value: 'Length', label: 'Length' },
            { value: 'Weight', label: 'Weight' },
            { value: 'Temperature', label: 'Temp' },
          ]}
          style={styles.segmented}
          theme={{ colors: { primary: theme.primary } }}
        />

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TextInput
            label="Enter Value"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            mode="outlined"
            activeOutlineColor={theme.primary}
            style={styles.input}
          />

          <View style={styles.selectors}>
            <View style={styles.selectorWrapper}>
              <Text variant="labelMedium" style={{ color: theme.textSecondary, marginBottom: 4 }}>
                From
              </Text>
              <Pressable
                onPress={() => setVisibleFrom(true)}
                style={({ pressed }) => [
                  styles.selectorBtn,
                  { borderColor: theme.border, opacity: pressed ? 0.7 : 1 }
                ]}
              >
                <Text style={{ color: theme.text }}>{fromUnit}</Text>
                <ChevronDown size={16} color={theme.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.selectorWrapper}>
              <Text variant="labelMedium" style={{ color: theme.textSecondary, marginBottom: 4 }}>
                To
              </Text>
              <Pressable
                onPress={() => setVisibleTo(true)}
                style={({ pressed }) => [
                  styles.selectorBtn,
                  { borderColor: theme.border, opacity: pressed ? 0.7 : 1 }
                ]}
              >
                <Text style={{ color: theme.text }}>{toUnit}</Text>
                <ChevronDown size={16} color={theme.textSecondary} />
              </Pressable>
            </View>
          </View>
        </View>

        <Modal
          visible={visibleFrom}
          transparent={true}
          animationType="slide"
          hardwareAccelerated={true}
          statusBarTranslucent={true}
          onRequestClose={() => setVisibleFrom(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackdrop} onPress={() => setVisibleFrom(false)} />
            <View style={[styles.bottomSheet, { backgroundColor: theme.card, paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
              <Text variant="titleMedium" style={[styles.sheetTitle, { color: theme.text }]}>Select From Unit</Text>
              <FlatList
                data={availableUnits}
                keyExtractor={(item) => item.value}
                bounces={false}
                initialNumToRender={10}
                renderItem={({ item: u }) => (
                  <List.Item
                    title={u.label}
                    titleStyle={{ color: theme.text }}
                    onPress={() => {
                      setFromUnit(u.value);
                      setVisibleFrom(false);
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={visibleTo}
          transparent={true}
          animationType="slide"
          hardwareAccelerated={true}
          statusBarTranslucent={true}
          onRequestClose={() => setVisibleTo(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackdrop} onPress={() => setVisibleTo(false)} />
            <View style={[styles.bottomSheet, { backgroundColor: theme.card, paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
              <Text variant="titleMedium" style={[styles.sheetTitle, { color: theme.text }]}>Select To Unit</Text>
              <FlatList
                data={availableUnits}
                keyExtractor={(item) => item.value}
                bounces={false}
                initialNumToRender={10}
                renderItem={({ item: u }) => (
                  <List.Item
                    title={u.label}
                    titleStyle={{ color: theme.text }}
                    onPress={() => {
                      setToUnit(u.value);
                      setVisibleTo(false);
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>

        {value !== '' && (
          <ResultDisplay
            label="Converted Value"
            value={result}
            subValue={`${toUnit}`}
            color={[theme.primary, theme.tint] as [string, string]}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontWeight: '800',
  },
  segmented: {
    marginBottom: Spacing.xl,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  input: {
    backgroundColor: 'transparent',
  },
  selectors: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  selectorWrapper: {
    flex: 1,
  },
  selectorBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    padding: Spacing.lg,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: '80%',
  },
  sheetTitle: {
    fontWeight: '700',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
});
