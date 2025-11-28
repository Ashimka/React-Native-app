import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Theme = "light" | "dark" | "primary";
type Size = "small" | "medium" | "large";

type Props = {
  label: string;
  icon?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  disabled: boolean;
  theme?: Theme;
  size?: Size;
  // дополнительные стили контейнера и текста (необяз.)
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

const THEME_STYLES: Record<
  Theme,
  { backgroundColor: string; textColor: string; borderColor?: string }
> = {
  light: {
    backgroundColor: "#ffffff",
    textColor: "#111827",
    borderColor: "#e5e7eb",
  },
  dark: { backgroundColor: "#111827", textColor: "#ffffff" },
  primary: { backgroundColor: "#2563eb", textColor: "#ffffff" },
};

const SIZE_STYLES: Record<
  Size,
  { paddingVertical: number; paddingHorizontal: number; fontSize: number }
> = {
  small: { paddingVertical: 6, paddingHorizontal: 10, fontSize: 14 },
  medium: { paddingVertical: 10, paddingHorizontal: 14, fontSize: 16 },
  large: { paddingVertical: 14, paddingHorizontal: 18, fontSize: 18 },
};

export default function Button({
  label,
  icon,
  onPress,
  disabled = false,
  theme = "primary",
  size = "medium",
  style,
  labelStyle,
}: Props) {
  const themeStyle = THEME_STYLES[theme];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: themeStyle.backgroundColor,
          borderColor: themeStyle.borderColor ?? "transparent",
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
        <Text
          style={[
            styles.label,
            { color: themeStyle.textColor, fontSize: sizeStyle.fontSize },
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "600",
  },
});
