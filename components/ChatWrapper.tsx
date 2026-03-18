import { useUser } from "@clerk/expo";
// Remove this import ↓
// import type { UserResource } from "@clerk/types";
import { studyBuddyTheme } from "@/lib/theme";
import * as Sentry from "@sentry/react-native";
import { useEffect, useRef } from "react";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { FullScreenLoader } from "./FullScreenLoader";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

// Derive the type from the hook itself — no cross-package mismatch
type ClerkUser = NonNullable<ReturnType<typeof useUser>["user"]>;

const syncUserToStream = async (user: ClerkUser) => {
  try {
    await fetch("/api/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        name:
          user.fullName ??
          user.username ??
          user.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl,
      }),
    });
  } catch (error) {
    console.error("Error syncing user to Stream:", error);
  }
};

const ChatClient = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ClerkUser; // ← use derived type here too
}) => {
  const syncedRef = useRef(false);
  useEffect(() => {
    if (!syncedRef.current) {
      syncedRef.current = true;
      syncUserToStream(user);
    }
  }, [user]);

  const tokenProvider = async () => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error getting token:", error);
      Sentry.logger.error("Error getting token:", { error: String(error) });
      Sentry.captureException(error, {
        extra: { userId: user.id, hook: "tokenProvider" },
      });
    }
  };

  const chatClient = useCreateChatClient({
    apiKey: STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData: {
      id: user.id,
      name:
        user.fullName ||
        user.username ||
        user.emailAddresses[0].emailAddress.split("@")[0],
      image: user.imageUrl,
    },
  });

  if (!chatClient) {
    return <FullScreenLoader message="Loading chat..." />;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient} style={studyBuddyTheme}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <FullScreenLoader message="Loading chat..." />;
  if (!user) return <>{children}</>;
  return <ChatClient user={user}>{children}</ChatClient>;
};

export default ChatWrapper;
