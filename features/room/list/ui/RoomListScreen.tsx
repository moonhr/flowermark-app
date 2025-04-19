/**
 * @yuxincxoi
 * * 책방 리스트 화면 컴포넌트입니다.
 * 책방 생성 버튼과 책방 카드 목록을 렌더링합니다.
 *
 * @module RoomListScreen
 * @returns {JSX.Element} 책방 생성 버튼과 책방 리스트를 포함한 화면
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RoomwithId } from "@/entities/room/model/types";
import RoomCard from "../components/RoomCard";
import CreateRoomButton from "../components/GoToCreateRoomButton";
import { fetchRooms } from "@/entities/room/api/fetchRooms";
import { formatDate } from "@/shared/lib/formatDate";

export default function RoomListScreen() {
  const router = useRouter();
  const [rooms, setRooms] = useState<(RoomwithId & { isPinned?: boolean })[]>(
    []
  );

  // 컴포넌트가 마운트될 때 책방 목록을 가져오기
  useEffect(() => {
    const loadRooms = async () => {
      const fetched = await fetchRooms();
      const extended = fetched.map((room) => ({ ...room, isPinned: false }));
      setRooms(extended);
    };
    loadRooms();
  }, []);

  // 특정 책방의 isPinned 상태를 토글하는 함수
  const togglePin = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.room_id === id
          ? { ...room, isPinned: room.isPinned ? undefined : true }
          : room
      )
    );
  };

  // 고정된 책방을 우선 정렬
  const sortedRooms = [...rooms].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <View style={styles.container}>
      {/* 책방 생성 버튼 */}
      <CreateRoomButton onPress={() => router.push("/create-room")} />

      {/* 책방 리스트 렌더링 */}
      <FlatList
        data={sortedRooms}
        keyExtractor={(item) => item.room_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/room-detail/[id]",
                params: {
                  id: item.room_id,
                  name: item.room_name,
                  status: item.status,
                  start: formatDate(item.start_date),
                  end: formatDate(item.end_date),
                },
              })
            }
          >
            <RoomCard
              room={item}
              isPinned={item.isPinned}
              onTogglePin={togglePin}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  createButton: {
    backgroundColor: "#f9c74f",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  createButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  status: { fontWeight: "bold", color: "#444" },
  pin: { fontSize: 16 },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  schedule: { color: "#666" },
  members: { color: "#888" },
});
