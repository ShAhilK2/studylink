import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Screen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  const platformPadding = Platform.OS === "ios" ? insets.top + 0 : insets.top;
  return (
    <View
      style={{ paddingTop: platformPadding }}
      className="flex-1 bg-background"
    >
      {children}
    </View>
  );
};

export default Screen;
