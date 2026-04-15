import { ToolCard } from "@/components/ToolCard";
import { DASHBOARD_TOOLS } from "@/constants/dashboard-tools";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme, useThemeToggle } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { toggleTheme } = useThemeToggle();

  const isDark = colorScheme === "dark";

  const tools = DASHBOARD_TOOLS.map((tool) => ({
    ...tool,
    color: theme[tool.themeKey],
  }));

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.header}
        >
          <View>
            <Text
              style={[styles.greeting, { color: theme.textSecondary }]}
              variant="labelLarge"
            >
              OVERVIEW
            </Text>
            <Text
              style={[styles.title, { color: theme.text }]}
              variant="headlineMedium"
            >
              Utility Toolkit
            </Text>
          </View>
          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [
              styles.headerBtn,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            {isDark ? (
              <Sun size={20} color={theme.text} />
            ) : (
              <Moon size={20} color={theme.text} />
            )}
          </Pressable>
        </Animated.View>

        <View style={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <Animated.View
              key={tool.route}
              entering={FadeInDown.delay(200 + index * 100).duration(600)}
            >
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                color={tool.color}
                onPress={() => router.push(tool.route as any)}
              />
            </Animated.View>
          ))}
        </View>
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
    paddingTop: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  greeting: {
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontWeight: "900",
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toolsGrid: {
    gap: Spacing.md,
  },
  footer: {
    marginTop: Spacing.xxl,
    padding: Spacing.md,
    borderRadius: 12,
  },
});
