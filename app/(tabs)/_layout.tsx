import { useAuth } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const { signOut, isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />;
  }

  if (Platform.OS === "android") {
    // Android-specific tab layout
    return (
      <View className="flex-1 bg-background">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              paddingHorizontal: 10,
              marginHorizontal: 20,
              marginBottom: 20,
              borderRadius: 50,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "rgba(255, 255, 255, 0.5)",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,

              backgroundColor: "rgba(23, 33, 43, 0.5)",
            },
            tabBarItemStyle: {
              // paddingVertical: 8,
              // paddingHorizontal: 16,
              // borderRadius: 50,
              // marginHorizontal: 4,
            },
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "#fff",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Chat",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbubbles" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="journal" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    );
  }

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Chat</Label>
        <Icon sf="message" drawable="ic_dialog_email" selectedColor="#007AFF" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <Label>Explore</Label>
        <Icon sf="safari" drawable="ic_menu_search" selectedColor="#007AFF" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          sf="person.fill"
          drawable="ic_menu_myplaces"
          selectedColor="#007AFF"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
