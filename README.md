# Smart Utility Toolkit 📱

An all-in-one mobile utility application built with **React Native** and **Expo**. This toolkit provides essential everyday tools with a focus on performance, platform-native design, and a seamless user experience.

Developed as a submission for the **Mobile Track Stage 1 Task**.

## 🚀 Key Modules

- **📝 Task Manager (New)**: A full-featured checklist manager with create, edit, toggle, and delete functionality. Features persistent local storage for full offline support.
- **📏 Unit Converter**: Instantly convert between metric and imperial systems for Length, Weight, and Temperature.
- **💱 Currency Converter**: Real-time currency conversion with live exchange rates. Features automatic emoji flag generation and a native slide-up bottom sheet.
- **⚖️ BMI Calculator**: Calculate Body Mass Index with dynamic health category feedback (Healthy, Overweight, etc.) and semantic color coding.

## ✨ UI/UX Features

- **🌓 Native Theme System**: Fully functional Dark and Light mode toggle. The app uses a custom architecture to override system themes and apply a unified brand aesthetic.
- **🎨 Semantic Design Tokens**: Zero hardcoded hex colors. Every component across the app is wired to a central design system for perfect contrast and accessibility.
- **📱 Platform-Native Interactions**: Drawer-style Modals, haptic feedback on interactions, and premium micro-animations.
- **⚡ Offline First**: Persistent local storage using `AsyncStorage` ensures your tasks and data are safe even without an internet connection.
- **✨ Micro-Animations**: Powered by `react-native-reanimated` for elegant layout transitions, staggered fade-ins, and smooth list reordering.

## 🛠 Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Navigation**: Expo Router (File-based routing with Bottom Tabs)
- **Icons**: Lucide React Native (Stroke-weight optimized)
- **Animations**: React Native Reanimated
- **Persistence**: @react-native-async-storage/async-storage
- **Styling**: Native StyleSheet with semantic tokenization
- **UI Primitives**: React Native Paper

## 🏗 Architecture Highlights

- **Custom Hooks Pattern**: All business logic is extracted into specialized hooks (`useTasks`, `useCurrencyConverter`, etc.), keeping components lean and testable.
- **Component Decomposition**: Clear separation between screens, layout components, and reusable UI primitives.
- **Strict TypeScript**: Full type safety across the application for robust development.

## 📥 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Arinzelight/smart-utility-toolkit.git
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

---

*Built with ❤️ for the Mobile Track Stage 1 Task*
