import { useEffect, useState } from "react";
import { StreamChat, UserResponse } from "stream-chat";

export const useStreamUsers = (client: StreamChat, userId: string) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await client.queryUsers(
          //   don't fetch myself and admins
          {
            id: { $nin: [userId] },
            role: { $nin: ["admin"] },
          } as any,
          { last_active: -1 },
          { limit: 50 },
        );
        setUsers(response.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUsers();
    }
  }, [client, userId]);

  return {
    users,
    loading,
  };
};
