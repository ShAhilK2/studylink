import * as Sentry from "@sentry/react-native";
import React from "react";
import { Button, Text } from "react-native";
import Screen from "../../components/screen";

const ChatScreen = () => {
  return (
    <Screen>
      <Text>ChatScreen</Text>
      <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
      />
    </Screen>
  );
};

export default ChatScreen;
