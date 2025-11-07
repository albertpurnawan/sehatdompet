// Design tokens for React Native apps
import tokens from './tokens.json';

export const theme = {
  colors: tokens.colors,
  radius: tokens.radius,
  shadow: tokens.shadow,
  spacing: tokens.spacing,
  typography: tokens.typography,
};

export const card = {
  base: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: 16,
  },
};

export const screen = {
  bg: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 16 },
};
