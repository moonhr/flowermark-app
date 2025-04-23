/**
 * @yuxincxoi
 * * 책방 목록 화면에서 책방 정보를 카드 형태로 렌더링하는 컴포넌트입니다.
 * 책방 상태, 이름, 일정, 인원 수를 표시하고 핀 버튼으로 상단 고정 여부를 토글할 수 있습니다.
 *
 * @module RoomCard
 * @param {Room} room 책방 정보 객체
 * @param {boolean} [isPinned] 핀 상태
 * @param {(id: string) => void} onTogglePin 핀 버튼 클릭 시 호출되는 콜백 함수
 * @returns {JSX.Element} 책방 정보를 담은 카드 컴포넌트
 */

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RoomwithId } from "@/entities/room/model/types";
import { formatDate } from "@/shared/lib/formatDate";

export default function RoomCard({
  room,
  isPinned,
  onTogglePin,
}: {
  room: RoomwithId;
  isPinned?: boolean;
  onTogglePin: (id: string) => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        {/* 책방 상태 */}
        <Text style={styles.status}>{room.status}</Text>

        {/* 핀 아이콘 버튼 */}
        <TouchableOpacity onPress={() => onTogglePin(room.room_id)}>
          <Text style={styles.pin}>{isPinned ? "📌" : "📍"}</Text>
        </TouchableOpacity>
      </View>
      {/* 책방 이름 */}
      <Text style={styles.name}>{room.room_name}</Text>

      {/* 책방 일정 */}
      <Text style={styles.schedule}>
        {formatDate(room.start_date)} ~ {formatDate(room.end_date)}
      </Text>

      {/* 현재 인원 / 최대 인원 */}
      <Text style={styles.members}>
        {room.members.length}명 / {room.capacity}명
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
