import { featureChips } from "@/constants/data";
import useSocialAuth from "@/hooks/useSocialAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isLoading = loadingStrategy !== null;

  return (
    <View className="flex-1 bg-background">
      {/* linear background */}
      <View className="absolute inset-0">
        <LinearGradient
          // Background Linear Gradient
          colors={["#0F0E17", "#1A1A2E", "#2D1B69", "#1A1A2E", "#0F0E17"]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        {/* Top Section */}
        <View>
          <View className="items-center pt-10 pb-2">
            <View className="w-16 h-16 rounded-[20px] bg-primary/15 items-center justify-center border border-primary/20">
              <Ionicons name="school" size={30} color="#A29BFE" />
            </View>
            <Text className="text-3xl font-extrabold tracking-tight mt-4 font-mono text-foreground">
              StudyLink
            </Text>

            <Text className="text-[15px] text-foreground-muted mt-1.5 tracking-wide">
              Learn Together, grow together
            </Text>
          </View>

          <View className="items-center px-6 mt-4">
            <Image
              source={require("../../assets/images/auth.png")}
              style={{ width: 280, height: 300 }}
              resizeMode="cover"
            />
          </View>
          {/* Feature Chips */}
          <View className="flex-row flex-wrap  justify-center gap-3 px-6 mt-5 mb-6">
            {featureChips.map((feature, index) => {
              return (
                <View
                  key={feature.label}
                  className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${feature.bg}`}
                >
                  <Ionicons
                    name={feature.icon}
                    size={14}
                    color={feature.color}
                  />
                  <Text className="text-xs font-semibold tracking-wide text-foreground-muted">
                    {feature.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="px-8 pb-4">
          <View className="flex-row items-center gap-3 mb-6">
            <View className="flex-1 bg-border h-px" />
            <Text className="text-xs text-foreground-subtle font-medium tracking-widest uppercase">
              Continue with
            </Text>
            <View className="flex-1 bg-border h-px" />
          </View>

          <View className="flex-row justify-center items-center gap-4 mb-5">
            {/* Google btn */}
            <Pressable
              className="size-20 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={() => !isLoading && handleSocialAuth("oauth_google")}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator color="#6C5CE7" size={"small"} />
              ) : (
                <Image
                  source={require("../../assets/images/google.png")}
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                />
             
              )}
            </Pressable>

            {/* Apple btn */}
            <Pressable
              className="size-20 rounded-2xl bg-surface border border-border-light  items-center justify-center active:scale-95"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
              onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator color="#6C5CE7" size={"small"} />
              ) : (
                <Ionicons name="logo-apple" size={30} color="#FFFFFE" />
              )}
            </Pressable>

            {/* Github */}
            <Pressable
              className="size-20 rounded-2xl bg-surface border border-border-light  items-center justify-center active:scale-95"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              accessibilityRole="button"
              accessibilityLabel="Continue with Github"
              onPress={() => !isLoading && handleSocialAuth("oauth_github")}
            >
              {loadingStrategy === "oauth_github" ? (
                <ActivityIndicator color="#6C5CE7" size={"small"} />
              ) : (
                <Ionicons name="logo-github" size={30} color="#FFFFFE" />
              )}
            </Pressable>
          </View>

          <Text className="text-foreground-subtle text-[11px] text-center leading-4 mt-4">
            By continuing, you agree to our{" "}
            <Text className="text-primary">Terms of Service</Text> and{" "}
            <Text className="text-primary">Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthScreen;
