import { ResultDisplay } from "@/components/ResultDisplay";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useCurrencyConverter } from "@/hooks/use-currency-converter";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { List, Text, TextInput } from "react-native-paper";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
const CURRENCY_FLAG_EXCEPTIONS: Record<string, string> = {
  EUR: "🇪🇺",
  BTC: "₿",
  XAF: "🌍", // CFA Franc BEAC
  XOF: "🌍", // CFA Franc BCEAO
  XCD: "🏝️", // East Caribbean Dollar
  XPF: "🇵🇫", // CFP Franc
  ANG: "🇦🇳", // Netherlands Antillean Guilder
};

const getCurrencyFlag = (currencyCode: string) => {
  if (CURRENCY_FLAG_EXCEPTIONS[currencyCode]) {
    return CURRENCY_FLAG_EXCEPTIONS[currencyCode];
  }
  if (currencyCode.startsWith("X")) return "🌐"; // Metals & special

  const countryCode = currencyCode.substring(0, 2).toUpperCase();
  const codePoints = countryCode
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};

export default function CurrencyScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    availableCurrencies,
    loading,
  } = useCurrencyConverter();

  const [visibleFrom, setVisibleFrom] = useState(false);
  const [visibleTo, setVisibleTo] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text
              style={[styles.title, { color: theme.text }]}
              variant="headlineSmall"
            >
              Currency
            </Text>
            <Text style={{ color: theme.textSecondary }} variant="bodySmall">
              Live Exchange Rates
            </Text>
          </View>
          {loading && <ActivityIndicator color={theme.primary} />}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            mode="outlined"
            activeOutlineColor={theme.primary}
            style={styles.input}
            left={<TextInput.Affix text={fromCurrency} />}
          />

          <View style={styles.selectors}>
            <View style={styles.selectorWrapper}>
              <Text
                variant="labelMedium"
                style={{ color: theme.textSecondary, marginBottom: 4 }}
              >
                From
              </Text>
              <Pressable
                onPress={() => setVisibleFrom(true)}
                style={({ pressed }) => [
                  styles.selectorBtn,
                  { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={{ color: theme.text }}>
                  <Text style={{ fontSize: 16 }}>
                    {getCurrencyFlag(fromCurrency)}
                  </Text>{" "}
                  {fromCurrency}
                </Text>
                <ChevronDown size={16} color={theme.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.selectorWrapper}>
              <Text
                variant="labelMedium"
                style={{ color: theme.textSecondary, marginBottom: 4 }}
              >
                To
              </Text>
              <Pressable
                onPress={() => setVisibleTo(true)}
                style={({ pressed }) => [
                  styles.selectorBtn,
                  { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={{ color: theme.text }}>
                  <Text style={{ fontSize: 16 }}>
                    {getCurrencyFlag(toCurrency)}
                  </Text>{" "}
                  {toCurrency}
                </Text>
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
            <Pressable
              style={styles.modalBackdrop}
              onPress={() => setVisibleFrom(false)}
            />
            <View
              style={[
                styles.bottomSheet,
                {
                  backgroundColor: theme.card,
                  paddingBottom: Math.max(insets.bottom, Spacing.lg),
                },
              ]}
            >
              <Text
                variant="titleMedium"
                style={[styles.sheetTitle, { color: theme.text }]}
              >
                Select From Currency
              </Text>
              <FlatList
                data={availableCurrencies}
                keyExtractor={(item) => item}
                bounces={false}
                initialNumToRender={15}
                maxToRenderPerBatch={20}
                renderItem={({ item: c }) => (
                  <List.Item
                    title={`${getCurrencyFlag(c)}   ${c}`}
                    titleStyle={{ color: theme.text }}
                    onPress={() => {
                      setFromCurrency(c);
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
            <Pressable
              style={styles.modalBackdrop}
              onPress={() => setVisibleTo(false)}
            />
            <View
              style={[
                styles.bottomSheet,
                {
                  backgroundColor: theme.card,
                  paddingBottom: Math.max(insets.bottom, Spacing.lg),
                },
              ]}
            >
              <Text
                variant="titleMedium"
                style={[styles.sheetTitle, { color: theme.text }]}
              >
                Select To Currency
              </Text>
              <FlatList
                data={availableCurrencies}
                keyExtractor={(item) => item}
                bounces={false}
                initialNumToRender={15}
                maxToRenderPerBatch={20}
                renderItem={({ item: c }) => (
                  <List.Item
                    title={`${getCurrencyFlag(c)}   ${c}`}
                    titleStyle={{ color: theme.text }}
                    onPress={() => {
                      setToCurrency(c);
                      setVisibleTo(false);
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>

        {amount !== "" && (
          <ResultDisplay
            label={`Value in ${toCurrency}`}
            value={result}
            subValue={
              loading
                ? "Updating rates..."
                : `1 ${fromCurrency} ≈ ${(parseFloat(result.replace(/,/g, "")) / (parseFloat(amount) || 1)).toFixed(4)} ${toCurrency}`
            }
            color={[theme.secondary, theme.success] as [string, string]}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    fontWeight: "800",
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  input: {
    backgroundColor: "transparent",
  },
  selectors: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  selectorWrapper: {
    flex: 1,
  },
  selectorBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    padding: Spacing.lg,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: "80%",
  },
  sheetTitle: {
    fontWeight: "700",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
});
