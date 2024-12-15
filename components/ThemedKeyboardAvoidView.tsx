import { KeyboardAvoidingView, Platform, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedKeyboardViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedKeyboardView({ style, lightColor, darkColor, ...otherProps }: ThemedKeyboardViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[{ backgroundColor }, style]} {...otherProps} />;
}
