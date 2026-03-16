import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const ProfileScreen = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl mb-4">Profile Screen</Text>
      <Pressable
        onPress={handleSignOut}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
