# Eventify — Design System & Coding Standards

> Single source of truth for all design tokens, component rules, and coding conventions.
> Define once. Use everywhere.

---

## 1. Brand Identity

**App Name:** Eventify  
**Tagline:** Discover Events  
**Personality:** Modern, vibrant, social, energetic  
**Target Feel:** Clean and premium but warm and inviting — like a well-designed event poster.

---

## 2. Color Tokens

Define these in a single `theme.ts` file and import everywhere.

### Primary Palette

| Token                 | Hex       | Usage                           |
| --------------------- | --------- | ------------------------------- |
| `colors.primary`      | `#E8445A` | CTAs, active states, highlights |
| `colors.primaryLight` | `#FF7A8A` | Hover states, tints             |
| `colors.primaryDark`  | `#C0283E` | Pressed states                  |

### Neutral Palette

| Token              | Hex       | Usage                          |
| ------------------ | --------- | ------------------------------ |
| `colors.dark`      | `#1A1D2E` | Primary text, dark backgrounds |
| `colors.darkMid`   | `#2D3250` | Card backgrounds, secondary bg |
| `colors.gray`      | `#8A8FA8` | Placeholder text, disabled     |
| `colors.grayLight` | `#D1D5E8` | Borders, dividers              |
| `colors.white`     | `#FFFFFF` | Backgrounds, light text        |
| `colors.offWhite`  | `#F5F6FA` | Screen backgrounds             |

### Semantic Colors

| Token            | Hex       | Usage                         |
| ---------------- | --------- | ----------------------------- |
| `colors.success` | `#4CAF82` | Confirmations, tickets booked |
| `colors.warning` | `#F9A825` | Reminders, alerts             |
| `colors.error`   | `#E53935` | Errors, destructive actions   |
| `colors.info`    | `#2979FF` | Info banners                  |

### Gradient

```ts
// Use for hero sections, featured event cards
gradients: {
  hero: ['#E8445A', '#C0283E'],
  dark: ['#1A1D2E', '#2D3250'],
  sunset: ['#FF7A8A', '#F9A825'],
}
```

---

## 3. Typography Tokens

**Font Family:**

- **Display / Headings:** `Inter` (bold weight) — clean and modern
- **Body:** `Inter` (regular / medium)

> Install via expo-google-fonts: `npx expo install @expo-google-fonts/inter`

### Type Scale

| Token          | Size   | Weight | Line Height | Usage              |
| -------------- | ------ | ------ | ----------- | ------------------ |
| `text.h1`      | `32px` | `700`  | `40px`      | Screen titles      |
| `text.h2`      | `24px` | `700`  | `32px`      | Section headers    |
| `text.h3`      | `20px` | `600`  | `28px`      | Card titles        |
| `text.h4`      | `18px` | `600`  | `24px`      | Sub-section labels |
| `text.body`    | `16px` | `400`  | `24px`      | Body content       |
| `text.bodyMd`  | `14px` | `400`  | `20px`      | Secondary text     |
| `text.caption` | `12px` | `400`  | `16px`      | Timestamps, tags   |
| `text.label`   | `12px` | `600`  | `16px`      | Buttons, badges    |

---

## 4. Spacing Tokens

All spacing is based on a **4pt grid**. Never use arbitrary numbers.

```ts
spacing: {
  xs:   4,   // tight gaps
  sm:   8,   // icon padding, small gaps
  md:   16,  // default padding, card inner
  lg:   24,  // section spacing
  xl:   32,  // screen padding top
  xxl:  48,  // hero section padding
  xxxl: 64,  // large section breaks
}
```

**Screen horizontal padding:** always `spacing.md` (16px) on both sides.

---

## 5. Border Radius Tokens

```ts
radius: {
  sm:   6,   // tags, chips, small badges
  md:   12,  // buttons, input fields
  lg:   16,  // cards
  xl:   24,  // bottom sheets, modals
  full: 999, // avatar, pill buttons
}
```

---

## 6. Shadow Tokens

```ts
shadows: {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#E8445A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
}
```

---

## 7. Iconography

- **Library:** `@expo/vector-icons` (Ionicons or Feather)
- **Default size:** `24px`
- **Small size:** `16px`
- **Large size:** `32px`
- Icons always match the text color of their context
- Never use icons without a label unless it's a tab bar

---

## 8. Component Rules

### Buttons

| Variant   | Background       | Text Color       | Usage           |
| --------- | ---------------- | ---------------- | --------------- |
| Primary   | `colors.primary` | `colors.white`   | Main CTAs       |
| Secondary | `transparent`    | `colors.primary` | Border: primary |
| Ghost     | `transparent`    | `colors.dark`    | Low emphasis    |
| Danger    | `colors.error`   | `colors.white`   | Destructive     |

- **Height:** `52px` (large), `44px` (medium), `36px` (small)
- **Border Radius:** `radius.md` (12px)
- **Font:** `text.label` — always uppercase or sentence case, never ALL CAPS for body buttons
- **Padding:** `spacing.md` horizontal minimum

### Input Fields

- **Height:** `52px`
- **Border:** `1px solid colors.grayLight`
- **Active Border:** `1px solid colors.primary`
- **Border Radius:** `radius.md`
- **Background:** `colors.white`
- **Padding:** `spacing.md`
- **Label:** above the field, `text.caption`, `colors.gray`
- **Error state:** border `colors.error`, helper text below in `colors.error`

### Cards

- **Background:** `colors.white`
- **Border Radius:** `radius.lg` (16px)
- **Shadow:** `shadows.md`
- **Padding:** `spacing.md`
- **Image aspect ratio:** `16:9` for event banners

### Badges / Tags

- **Height:** `24px`
- **Padding:** `4px 10px`
- **Border Radius:** `radius.sm`
- **Font:** `text.caption` bold
- **Colors:** use semantic colors with 15% opacity background

---

## 9. Layout Rules

- **Screen padding:** `spacing.md` (16px) horizontal
- **Section gap:** `spacing.lg` (24px) between sections
- **List item gap:** `spacing.sm` (8px)
- **Safe area:** always use `SafeAreaView` for top and bottom
- **Scroll:** use `ScrollView` with `showsVerticalScrollIndicator={false}`
- **Max content width:** full width on mobile (no max-width restriction)

---

## 10. The `theme.ts` File

Create this file at `/constants/theme.ts` and import from here everywhere:

```ts
export const colors = {
  primary: "#E8445A",
  primaryLight: "#FF7A8A",
  primaryDark: "#C0283E",
  dark: "#1A1D2E",
  darkMid: "#2D3250",
  gray: "#8A8FA8",
  grayLight: "#D1D5E8",
  white: "#FFFFFF",
  offWhite: "#F5F6FA",
  success: "#4CAF82",
  warning: "#F9A825",
  error: "#E53935",
  info: "#2979FF",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  bodyMd: 14,
  caption: 12,
  label: 12,
};

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};
```

---

## 11. Folder Structure

```
eventify/
├── app/                    # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx       # Home
│   │   ├── explore.tsx     # Explore events
│   │   ├── tickets.tsx     # My tickets
│   │   └── profile.tsx     # User profile
│   └── event/
│       └── [id].tsx        # Event detail
├── components/
│   ├── ui/                 # Base components (Button, Input, Badge)
│   ├── cards/              # EventCard, TicketCard, etc.
│   └── layout/             # ScreenWrapper, SectionHeader, etc.
├── constants/
│   └── theme.ts            # ← ALL design tokens live here
├── hooks/                  # Custom hooks
├── services/               # API calls
├── types/                  # TypeScript interfaces
└── assets/
    ├── fonts/
    └── images/
```

---

## 12. Coding Standards

### General Rules

- **Language:** TypeScript only — no `.js` files in `components/` or `screens/`
- **Components:** functional components only, no class components
- **Styling:** always use `StyleSheet.create()` — no inline styles
- **No hardcoded values:** never write `color: '#E8445A'` directly — always import from `theme.ts`
- **No magic numbers:** never write `padding: 16` — always use `spacing.md`

### Naming Conventions

| Type             | Convention           | Example           |
| ---------------- | -------------------- | ----------------- |
| Components       | PascalCase           | `EventCard.tsx`   |
| Hooks            | camelCase with `use` | `useEvents.ts`    |
| Files (utils)    | camelCase            | `formatDate.ts`   |
| Constants        | UPPER_SNAKE          | `MAX_EVENTS = 10` |
| Variables        | camelCase            | `eventTitle`      |
| Types/Interfaces | PascalCase           | `EventItem`       |

### Component Structure

Every component follows this order:

```tsx
// 1. Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "@/constants/theme";

// 2. Types
interface Props {
  title: string;
  onPress: () => void;
}

// 3. Component
export default function EventCard({ title, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

// 4. Styles (always at the bottom)
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.dark,
  },
});
```

### Do's and Don'ts

✅ **Do:**

- Import all colors/spacing from `theme.ts`
- Use `SafeAreaView` on every screen
- Type all props with TypeScript interfaces
- Keep components small and focused (one job each)
- Use `KeyboardAvoidingView` on forms

❌ **Don't:**

- Hardcode colors or spacing values
- Put API calls directly in components (use hooks/services)
- Use `any` type in TypeScript
- Mix business logic and UI in the same component
- Nest `ScrollView` inside `ScrollView`

---

## 13. Git Branch Naming

```
feature/event-card
feature/home-screen
fix/button-press-state
design/tab-navigation
```

---

_Last updated: May 2026 — Eventify v1.0_
