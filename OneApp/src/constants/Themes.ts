import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import Colors from './Colors';

export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: Colors.light.text,
    card: Colors.light.tabBar,
    border: Colors.light.navBorderBottom,
    primary: Colors.light.tint,
  },
};
export const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: Colors.dark.text,
    card: Colors.dark.tabBar,
    border: Colors.dark.navBorderBottom,
    primary: Colors.dark.tint,
  },
};

export function useThemeName() {
  const theme = useTheme();
  return theme.dark ? 'dark' : 'light';
}
