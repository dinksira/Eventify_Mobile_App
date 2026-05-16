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

export const Colors = {
  light: {
    text: colors.dark,
    background: colors.offWhite,
    tint: colors.primary,
    icon: colors.gray,
    tabIconDefault: colors.gray,
    tabIconSelected: colors.primary,
    ...colors,
  },
  dark: {
    text: colors.white,
    background: colors.dark,
    tint: colors.primaryLight,
    icon: colors.grayLight,
    tabIconDefault: colors.grayLight,
    tabIconSelected: colors.primaryLight,
    ...colors,
  },
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

// Legacy Compatibility
export const Fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  mono: 'System', // Default to System for mono
};

export type ThemeColor = keyof typeof Colors.light;

// Legacy Spacing for template compatibility
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  eight: 32,
};

export const BottomTabInset = 49;
export const MaxContentWidth = 800;

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

export const gradients = {
  hero: ['#E8445A', '#C0283E'],
  dark: ['#1A1D2E', '#2D3250'],
  sunset: ['#FF7A8A', '#F9A825'],
};

export const shadows = {
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
};
