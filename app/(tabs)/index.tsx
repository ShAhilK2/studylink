import ListEmptyContainer from "@/components/ListEmptyContainer";
import { useAppContext } from "@/contexts/AppProvider";
import { COLORS } from "@/lib/theme";
import { getGreeringForHour } from "@/lib/utils";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import type { Channel } from "stream-chat";
import { ChannelList } from "stream-chat-expo";
import Screen from "../../components/screen";

const ChatScreen = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const { setChannel } = useAppContext();
  const { user } = useUser();
  const firstName = user?.firstName || "there";

  const filters = { members: { $in: [user?.id!] }, type: "messaging" };

  const channelRenderFilterFn = (channels: Channel[]) => {
    if (!search.trim()) return channels;

    const q = search.toLowerCase();
    return channels.filter((channel) => {
      const name =
        (channel.data?.name as string | undefined)?.toLowerCase() ?? "";
      const cid = channel.cid.toLowerCase();
      return name.includes(q) || cid.includes(q);
    });
  };
  return (
    <Screen>
      {/* Header  */}
      <View className="px-5 pt-3 pb-2">
        <Text className="text-base text-foreground-muted mb-0.5">
          {getGreeringForHour()},{firstName}
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-surface mx-5 mb-3 px-3.5 py-2 rounded-[10px] gap-2.5 border border-border">
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          placeholder="Search study roomss"
          className="flex-1 text-[15px] text-foreground"
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* CHANNEL LIST */}
      {/* state : true will fetch initial full data of the channel and watch : true will keep the channel updated with the latest one */}
      <ChannelList
        filters={filters}
        options={{ state: true, watch: true }}
        sort={{ last_updated: -1 }}
        channelRenderFilterFn={channelRenderFilterFn}
        onSelect={(channel) => {
          setChannel(channel);
          router.push(`/channel/${channel.id}`);
        }}
        additionalFlatListProps={{
          contentContainerStyle: {
            flexGrow: 1,
          },
        }}
        EmptyStateIndicator={() => <ListEmptyContainer />}
      />
    </Screen>
  );
};

export default ChatScreen;
