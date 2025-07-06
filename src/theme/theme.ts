// theme.ts

type FontStyle = {
  fontSize: number;
  fontFamily: string;
};

type Fonts = {
  h1: FontStyle;
  h2: FontStyle;
  h3: FontStyle;
  h4: FontStyle;
  h5: FontStyle;
  h6: FontStyle;
  body: FontStyle;
  body2: FontStyle;
  base: FontStyle;
  base2: FontStyle;
  base2Medium: FontStyle;
  caption: FontStyle;
  captionMedium: FontStyle;
  caption2: FontStyle;
};

type Sizes = {
  font: number;
  radius: number;
  padding: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  body: number;
  body2: number;
  base: number;
  base2: number;
  caption: number;
  captionMedium: number;
  caption2: number;
};

type Spacing = {
  xsm: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type Colors = Record<string, string>;

type Theme = {
  colors: Colors;
  sizes: Sizes;
  fonts: Fonts;
  spacing: Spacing;
};

// Values

export const sizes: Sizes = {
  font: 14,
  radius: 12,
  padding: 24,

  h1: 64,
  h2: 48,
  h3: 40,
  h4: 28,
  h5: 24,
  h6: 18,
  body: 24,
  body2: 17,
  base: 16,
  base2: 14,
  caption: 12,
  captionMedium: 12,
  caption2: 11,
};

export const fonts: Fonts = {
  h1: { fontSize: sizes.h1, fontFamily: 'Satoshi-Black' },
  h2: { fontSize: sizes.h2, fontFamily: 'Satoshi-Black' },
  h3: { fontSize: sizes.h3, fontFamily: 'Satoshi-Black' },
  h4: { fontSize: sizes.h4, fontFamily: 'Satoshi-Black' },
  h5: { fontSize: sizes.h5, fontFamily: 'Satoshi-Black' },
  h6: { fontSize: sizes.h6, fontFamily: 'Satoshi-Black' },
  body: { fontSize: sizes.body, fontFamily: 'Satoshi-Medium' },
  body2: { fontSize: sizes.body2, fontFamily: 'Satoshi-Regular' },
  base: { fontSize: sizes.base, fontFamily: 'Satoshi-Bold' },
  base2: { fontSize: sizes.base2, fontFamily: 'Poppins-Regular' },
  base2Medium: { fontSize: sizes.base2, fontFamily: 'Satoshi-Medium' },
  caption: { fontSize: sizes.caption, fontFamily: 'Poppins-Regular' },
  captionMedium: {
    fontSize: sizes.captionMedium,
    fontFamily: 'Satoshi-Bold',
  },
  caption2: { fontSize: sizes.caption2, fontFamily: 'Poppins-Regular' },
};

export const spacing: Spacing = {
  xsm: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const colors: Colors = {
  primary: '#1FAD98',
  background: '#F1F5F9',
  white: '#F8FAFC',
  black: '#030712',
  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue200: '#BFDBFE',
  blue300: '#93C5FD',
  blue400: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  blue700: '#1D4ED8',
  blue800: '#1E40AF',
  blue900: '#1E3A8A',
  blue950: '#172554',
  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo200: '#C7D2FE',
  indigo300: '#A5B4FC',
  indigo400: '#818CF8',
  indigo500: '#6366F1',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',
  indigo800: '#3730A3',
  indigo900: '#312E81',
  indigo950: '#1E1B4B',
  violet50: '#F5F3FF',
  violet100: '#EDE9FE',
  violet200: '#DDD6FE',
  violet300: '#C4B5FD',
  violet400: '#A78BFA',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',
  violet700: '#6D28D9',
  violet800: '#5B21B6',
  violet900: '#4C1D95',
  violet950: '#2E1065',
  sky50: '#F0F9FF',
  sky100: '#E0F2FE',
  sky200: '#BAE6FD',
  sky300: '#7DD3FC',
  sky400: '#38BDF8',
  sky500: '#0EA5E9',
  sky600: '#0284C7',
  sky700: '#0369A1',
  sky800: '#075985',
  sky900: '#0C4A6E',
  sky950: '#082F49',
  cyan50: '#ECFEFF',
  cyan100: '#CFFAFE',
  cyan200: '#A5F3FC',
  cyan300: '#67E8F9',
  cyan400: '#22D3EE',
  cyan500: '#06B6D4',
  cyan600: '#0891B2',
  cyan700: '#0E7490',
  cyan800: '#155E75',
  cyan900: '#164E63',
  cyan950: '#083344',
  success50: '#F0FDF4',
  success100: '#DCFCE7',
  success200: '#BBF7D0',
  success300: '#86EFAC',
  success400: '#4ADE80',
  success500: '#22C55E',
  success600: '#16A34A',
  success700: '#15803D',
  success800: '#166534',
  success900: '#14532D',
  success950: '#052E16',
  warning50: '#FEFCE8',
  warning100: '#FEF9C3',
  warning200: '#FEF08A',
  warning300: '#FDE047',
  warning400: '#FACC15',
  warning500: '#EAB308',
  warning600: '#CA8A04',
  warning700: '#A16207',
  warning800: '#854D0E',
  warning900: '#713F12',
  warning950: '#422006',
  danger50: '#FEF2F2',
  danger100: '#FEE2E2',
  danger200: '#FECACA',
  danger300: '#FCA5A5',
  danger400: '#F87171',
  danger500: '#EF4444',
  danger600: '#DC2626',
  danger700: '#DC2626',
  danger800: '#991B1B',
  danger900: '#7F1D1D',
  danger950: '#450A0A',
};

export const lightTheme: Theme = {
  colors: {
    ...colors,

    background: '#F1F5F9',
    subBackground: '#F1F5FA',
    primaryText: '#FFFFFF',
    secondaryText: '#F4F4F4',
    accentButton: '#FF6B6B',
    highlightText: '#FFE066',
    n50: '#F8FAFC',
    n100: '#F1F5F9',
    n200: '#E2E8F0',
    n300: '#CBD5E1',
    n400: '#94A3B8',
    n500: '#64748B',
    n600: '#475569',
    n700: '#334155',
    n800: '#1E293B',
    n900: '#0F172A',
    n950: '#030712',
  },
  sizes,
  fonts,
  spacing,
};

export const darkTheme: Theme = {
  colors: {
    ...colors,
    background: '#141718',
    subBackground: '#1F2223',
    primaryText: '#FFFFFF',
    secondaryText: '#F4F4F4',
    accentButton: '#FF6B6B',
    highlightText: '#FFE066',
    n50: '#030712',
    n100: '#0F172A',
    n200: '#1E293B',
    n300: '#334155',
    n400: '#475569',
    n500: '#64748B',
    n600: '#94A3B8',
    n700: '#CBD5E1',
    n800: '#E2E8F0',
    n900: '#F1F5F9',
    n950: '#F8FAFC',
  },
  sizes,
  fonts,
  spacing,
};
