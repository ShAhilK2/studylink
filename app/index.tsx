import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded, signOut } = useAuth();

  

  if (!isLoaded) {

    return null;
  }

  if (!isSignedIn) {
    console.log("Index page - Not signed in, redirecting to auth");
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <View className=" flex flex-col items-center justify-center h-full">
      <Text className="text-blue-800 text-xl">
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Pressable onPress={() => signOut()}>
        <Text>SignOut</Text>
      </Pressable>
    </View>
  );
}
