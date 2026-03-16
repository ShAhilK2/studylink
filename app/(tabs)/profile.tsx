import Screen from "@/components/screen";
import { COLORS } from "@/lib/theme";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const MENU_ITEMS = [
  {
    icon: "notifications-outline",
    label: "Notifications",
    color: COLORS.primary,
  },
  { icon: "bookmark-outline", label: "Saved Resources", color: COLORS.accent },
  {
    icon: "time-outline",
    label: "Study History",
    color: COLORS.accentSecondary,
  },
  { icon: "settings-outline", label: "Settings", color: COLORS.textMuted },
];

const ProfileScreen = () => {
  const { signOut } = useAuth();

  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      Sentry.logger.info("User signed out successfully", {
        userId: user?.id,
      });
      // Navigation will be handled by auth state change in tab layout
    } catch (error) {
      Sentry.logger.error("Error signing out", {
        error,
        userId: user?.id,
      });
      Sentry.captureException(error);
      Alert.alert(
        "Error",
        "An error occurred while signing out. Please try again.",
      );
    }
  };

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          ...Platform.select({
            ios: {
              paddingBottom: 80,
            },
            android: {
              paddingBottom: 0,
            },
          }),
          flexGrow: 1,
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/*  Header */}
        <View className="px-5 py-2">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="items-center py-5">
          <View className="relative mb-3.5">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-[88px] h-[88px] rounded-[44px]"
              resizeMode="cover"
            />
            <View className="absolute bottom-[2px] right-[2px] w-[18px] h-[18px] rounded-[9px] bg-accent-secondary border-[3px] border-background" />
          </View>

          <Text className="text-2xl font-bold text-foreground">
            {user?.fullName}
          </Text>

          <Text className="text-base text-foreground-muted mt-0.5">
            {user?.emailAddresses[0]?.emailAddress}
          </Text>

          <View className="flex-row items-center gap-2 mt-3 bg-[#FDCB6E1A] rounded-full px-3.5 py-1.5">
            <Ionicons name="flame" size={24} color="#fdcb6e" />
            <Text className="text-[#fdcb6e] text-sm font-semibold">
              7 day study streak
            </Text>
          </View>
        </View>
        {/* Stats */}
        <View className="mt-2 mb-6 flex-row gap-3 px-5">
          <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
            <Text className="text-2xl font-bold text-primary">24</Text>
            <Text className="mt-1 text-xs text-foreground-muted">Sessions</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
            <Text className="text-2xl font-bold text-primary">12</Text>
            <Text className="mt-1 text-xs text-foreground-muted">Partners</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
            <Text className="text-2xl font-bold text-primary">48h</Text>
            <Text className="mt-1 text-xs text-foreground-muted">
              Study Time
            </Text>
          </View>
        </View>

        {/* MENU ITEMS */}
        <View className="gap-1 px-5">
          {MENU_ITEMS.map((item, i) => (
            <Pressable
              key={i}
              className="mb-1.5 flex-row items-center gap-3.5 rounded-xl border border-border bg-surface px-4 py-4"
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <Text className="flex-1 text-base font-medium text-foreground">
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.danger}
              />
            </Pressable>
          ))}
        </View>

        {/* SIGN OUT BTN */}
        <View className="px-5 pb-8">
          <Pressable
            className="mt-6 flex-row items-center justify-center gap-2 rounded-xl border border-[#FF6B6B33] bg-surface px-4 py-4"
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
            <Text className="text-base font-semibold text-danger ">
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;
