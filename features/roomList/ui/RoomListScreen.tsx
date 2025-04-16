/**
 * @yuxincxoi
 * * 책방 리스트 화면 컴포넌트입니다.
 * 책방 생성 버튼과 책방 카드 목록을 렌더링합니다.
 *
 * @module RoomListScreen
 * @returns {JSX.Element} 책방 생성 버튼과 책방 리스트를 포함한 화면
 */

import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RoomCard from "../components/RoomCard";
import CreateRoomButton from "../components/CreateRoomButton";

type Room = {
  id: string;
  name: string;
  status: "시작전" | "진행중" | "완료";
  schedule: string;
  members: number;
  max: number;
  isPinned: boolean;
};

const dummyRooms: Room[] = [
  {
    id: "1",
    name: "봄날의 독서방",
    status: "시작전",
    schedule: "2025년 3월 10일 ~ 4월 9일",
    members: 1,
    max: 4,
    isPinned: true,
  },
  {
    id: "2",
    name: "여름밤 독서클럽",
    status: "진행중",
    schedule: "2025년 4월 15일 ~ 5월 15일",
    members: 3,
    max: 4,
    isPinned: false,
  },
];

export default function RoomListScreen() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(dummyRooms);

  // 책방 생성 버튼 클릭 시 실행되는 함수
  const handleCreateRoom = () => {
    console.log("새 책방 만들기 클릭됨");
  };

  // 특정 책방의 isPinned 상태를 토글하는 함수
  const togglePin = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, isPinned: !room.isPinned } : room
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/room-detail/[id]",
                params: {
                  id: item.id,
                  name: item.name,
                  status: item.status,
                  schedule: item.schedule,
                },
              })
            }
          >
            <RoomCard room={item} onTogglePin={togglePin} />
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
