import { COLORS } from "@/lib/theme";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import Screen from "./screen";

export function FullScreenLoader({ message }: { message: string }) {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          className="mb-2"
        />
        <Text className="text-foreground">{message}</Text>
      </View>
    </Screen>
  );
}
