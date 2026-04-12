import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, SegmentedButtons } from 'react-native-paper';
import { useBMI, BMIUnit } from '@/hooks/use-bmi';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function HealthScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const {
    unit,
    setUnit,
    weight,
    setWeight,
    height,
    setHeight,
    heightFt,
    setHeightFt,
    heightIn,
    setHeightIn,
    result,
  } = useBMI();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} variant="headlineSmall">
            BMI Calculator
          </Text>
          <Text style={{ color: theme.textSecondary }} variant="bodySmall">
            Body Mass Index
          </Text>
        </View>

        {/* Info banner — always visible */}
        <View style={[styles.infoBanner, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '40' }]}>
          <Text style={[styles.infoBannerText, { color: theme.primary }]} variant="bodySmall">
            💡 Weight is always entered in <Text style={{ fontWeight: '800' }}>kilograms (kg)</Text>.
            {'\n'}The toggle below only changes how you enter your height.
          </Text>
        </View>

        <SegmentedButtons
          value={unit}
          onValueChange={(v) => setUnit(v as BMIUnit)}
          buttons={[
            { value: 'metric', label: 'Height in cm' },
            { value: 'imperial', label: 'Height in ft / in' },
          ]}
          style={styles.segmented}
          theme={{ colors: { primary: theme.primary } }}
        />

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Weight — always kg */}
          <View>
            <TextInput
              label="Weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              mode="outlined"
              activeOutlineColor={theme.primary}
              style={styles.input}
              placeholder="0.0"
              right={<TextInput.Affix text="kg" />}
            />
            <Text style={[styles.fieldHint, { color: theme.textSecondary }]}>
              Always in kg
            </Text>
          </View>

          {/* Height — depends on toggle */}
          {unit === 'metric' ? (
            <View>
              <TextInput
                label="Height"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                mode="outlined"
                activeOutlineColor={theme.primary}
                style={styles.input}
                placeholder="0"
                right={<TextInput.Affix text="cm" />}
              />
              <Text style={[styles.fieldHint, { color: theme.textSecondary }]}>
                e.g. 183 cm ≈ 6 ft
              </Text>
            </View>
          ) : (
            <View>
              <View style={styles.row}>
                <TextInput
                  label="ft"
                  value={heightFt}
                  onChangeText={setHeightFt}
                  keyboardType="numeric"
                  mode="outlined"
                  activeOutlineColor={theme.primary}
                  style={[styles.input, { flex: 1 }]}
                  placeholder="0"
                />
                <TextInput
                  label="in"
                  value={heightIn}
                  onChangeText={setHeightIn}
                  keyboardType="numeric"
                  mode="outlined"
                  activeOutlineColor={theme.primary}
                  style={[styles.input, { flex: 1 }]}
                  placeholder="0"
                />
              </View>
              <Text style={[styles.fieldHint, { color: theme.textSecondary }]}>
                e.g. 6 ft 0 in ≈ 183 cm
              </Text>
            </View>
          )}
        </View>



        {result && (
          <Animated.View entering={FadeInUp}>
            <ResultDisplay
              label="Your BMI"
              value={result.bmi.toString()}
              subValue={result.category}
              color={[theme[result.colorMode], theme[result.colorMode] + 'AA']}
            />
            
            <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }} variant="titleSmall">
                BMI Categories
              </Text>
              <View style={styles.infoRow}>
                <View style={[styles.dot, { backgroundColor: theme.info }]} />
                <Text style={{ color: theme.textSecondary, flex: 1 }}>Underweight</Text>
                <Text style={{ color: theme.textSecondary }}>{"<"} 18.5</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.dot, { backgroundColor: theme.success }]} />
                <Text style={{ color: theme.textSecondary, flex: 1 }}>Normal</Text>
                <Text style={{ color: theme.textSecondary }}>18.5 – 24.9</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.dot, { backgroundColor: theme.warning }]} />
                <Text style={{ color: theme.textSecondary, flex: 1 }}>Overweight</Text>
                <Text style={{ color: theme.textSecondary }}>25.0 – 29.9</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.dot, { backgroundColor: theme.error }]} />
                <Text style={{ color: theme.textSecondary, flex: 1 }}>Obese</Text>
                <Text style={{ color: theme.textSecondary }}>{">"} 30.0</Text>
              </View>
            </View>
          </Animated.View>
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
    marginBottom: Spacing.xl,
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
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  infoBanner: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  infoBannerText: {
    lineHeight: 20,
  },
  fieldHint: {
    fontSize: 11,
    marginTop: 4,
    marginLeft: 2,
  },
  infoCard: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginTop: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
