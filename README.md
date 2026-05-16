<img src="./assets/app_icon.svg" width="80" height="80" align="right" />

# Eventify Mobile App

Eventify is a premium event discovery mobile application built with **React Native** and **Expo SDK 54**. It features a state-of-the-art design system, high-fidelity animations powered by **Reanimated 3**, and a seamless user experience.

## ✨ Key Features

- **Animated Launch Sequence**: A 4-phase high-performance SVG animation built with Reanimated 3.
- **Premium Design System**: Fully standardized tokens for colors, typography, spacing, and shadows.
- **Modern Auth Experience**: High-fidelity Login and Sign-up screens with real-time focus states and social integration.
- **Cross-Platform**: Optimized for both Android and iOS.

## 🚀 Tech Stack

- **Framework**: [Expo SDK 54](https://expo.dev)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction) (File-based)
- **Animation**: [React Native Reanimated 3](https://docs.swmansion.com/react-native-reanimated/)
- **SVG Rendering**: [React Native SVG](https://github.com/software-mansion/react-native-svg)
- **Typography**: Inter (Google Fonts)

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start -c
```

### 3. Open the App
- Scan the QR code with **Expo Go** (Android/iOS).
- Press **a** for Android Emulator.
- Press **i** for iOS Simulator.

## 📁 Project Structure

- `src/app/`: File-based routes (Expo Router).
- `src/components/`: Atomic design components (ui, cards, layout, auth).
- `src/constants/`: Design system tokens (`theme.ts`).
- `src/assets/`: Brand assets and SVGs.

## 🎨 Design Rules

The project follows strict design guidelines documented in `rules.md`. All new components must adhere to the standardized color palette and spacing tokens.

---
© 2025 Eventify. All rights reserved.
