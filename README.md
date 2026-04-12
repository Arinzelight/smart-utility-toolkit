# Smart Utility Toolkit 📱

An all-in-one mobile utility application built with **React Native** and **Expo**. This toolkit provides essential everyday tools with a focus on performance, platform-native design, and a seamless user experience.

Developed as a submission for the **Mobile Track Stage 0 Task**.

## 🚀 Key Modules

- **📏 Unit Converter**: Instantly convert between metric and imperial systems for Length, Weight, and Temperature.
- **💱 Currency Converter**: Real-time currency conversion with live exchange rates. Features automatic emoji flag generation and a native slide-up bottom sheet.
- **⚖️ BMI Calculator**: Calculate Body Mass Index with dynamic health category feedback (Healthy, Overweight, etc.) and semantic color coding.

## ✨ UI/UX Features

- **🌓 Native Theme System**: Fully functional Dark and Light mode toggle. The app uses a custom Pub/Sub architecture to override system themes and apply a unified brand aesthetic.
- **🎨 Semantic Design Tokens**: Zero hardcoded hex colors. Every component across the app is wired to a central design system for perfect contrast and accessibility.
- **📱 Platform-Native Interactions**: Replaced standard dropdowns with high-performance, edge-to-edge native Modals for a "drawer-style" mobile experience.
- **⚡ Performance Optimized**: Utilizes hardware acceleration and lazy-loaded `FlatLists` on Android to ensure buttery-smooth 60fps animations, even with large datasets like global currencies.
- **✨ Micro-Animations**: Powered by `react-native-reanimated` for elegant layout transitions and staggered fade-ins.

## 🛠 Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Navigation**: Expo Router (File-based routing)
- **Icons**: Lucide React Native (Stroke-weight optimized)
- **Animations**: React Native Reanimated
- **Styling**: Native StyleSheet with semantic tokenization
- **UI Primitives**: React Native Paper

## 🏗 Architecture Highlights

- **Custom Hooks Pattern**: All business logic (conversions, calculations, network requests) is extracted into specialized hooks (`useCurrencyConverter`, `useBMI`, etc.), keeping components lean and testable.
- **Global State Management**: A custom, lightweight theme management system that avoids the overhead of complex context providers.
- **Clean Code Principles**: Decoupled tool configurations, reusable presentation components, and strict TypeScript interfaces.

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

*Built with ❤️ for the Mobile Track Stage 0 Task*
