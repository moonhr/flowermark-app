import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Room = {
  id: string;
  name: string;
  status: "시작전" | "진행중" | "완료";
  schedule: string;
  members: number;
  max: number;
  isPinned: boolean;
};

export default function RoomCard({
  room,
  onTogglePin,
}: {
  room: Room;
  onTogglePin: (id: string) => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.status}>{room.status}</Text>
        <TouchableOpacity onPress={() => onTogglePin(room.id)}>
          <Text style={styles.pin}>{room.isPinned ? "📌" : "📍"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{room.name}</Text>
      <Text style={styles.schedule}>{room.schedule}</Text>
      <Text style={styles.members}>
        {room.members}명 / {room.max}명
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
