import { useSSO } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_github",
  ) => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    const getProvider = (s: string) =>
      s === "oauth_google"
        ? "Google"
        : s === "oauth_apple"
          ? "Apple"
          : "GitHub";

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
       // ✅ Required for Android
      });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          `${getProvider(strategy)} sign-in did not complete. Please try again.`,
        );
        return;
      }

      await setActive({ session: createdSessionId });
      router.push("/")
 
    } catch (error) {
      console.error("Social auth error:", error);
      Alert.alert(
        "Sign-in failed",
        `${getProvider(strategy)} sign-in failed. Please try again.`, // ✅ Uses param, not stale state
      );

    } finally {
      setLoadingStrategy(null);

    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
