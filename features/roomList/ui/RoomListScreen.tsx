import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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
  const [rooms, setRooms] = useState<Room[]>(dummyRooms);

  const handleCreateRoom = () => {
    console.log("새 책방 만들기 클릭됨");
  };

  const togglePin = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, isPinned: !room.isPinned } : room
      )
    );
  };

  const sortedRooms = [...rooms].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
        <Text style={styles.createButtonText}>+ 새 책방 만들기</Text>
      </TouchableOpacity>
      <FlatList
        data={sortedRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.status}>{item.status}</Text>
              <TouchableOpacity onPress={() => togglePin(item.id)}>
                <Text style={styles.pin}>{item.isPinned ? "📌" : "📍"}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.schedule}>{item.schedule}</Text>
            <Text style={styles.members}>
              {item.members}명 / {item.max}명
            </Text>
          </View>
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
