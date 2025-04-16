/**
 * @yuxincxoi
 * * 방 상세 페이지 화면 컴포넌트입니다.
 * * 선택된 방의 이름, 현재 읽고 있는 책, 나머지 책들, 방 정보 모달을 포함합니다.
 *
 * @module BookRoomDetailScreen
 * @returns {JSX.Element} 방 상세 UI 및 RoomInfoModal 포함된 화면 컴포넌트
 */

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import RoomInfoModal from "../component/RoomInfoModal";

const dummyRoom = {
  name: "봄날의 독서방",
  dDay: 5,
  currentBook: {
    title: "첫번째 책",
    cover: "https://via.placeholder.com/150",
  },
  otherBooks: [
    {
      id: 1,
      cover: "https://via.placeholder.com/100",
      owner: "유진",
      status: "읽는 중",
    },
    {
      id: 2,
      cover: "https://via.placeholder.com/100",
      owner: "혜림",
      status: "읽기 전",
    },
  ],
};

export default function BookRoomDetailScreen() {
  const { id, name } = useLocalSearchParams();
  const roomId = id as string;
  const roomName = name as string;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 방 제목 */}
      <View style={styles.header}>
        <Text style={styles.roomName}>{roomName}</Text>
      </View>

      {/* 현재 읽고 있는 책 */}
      <View style={styles.currentBook}>
        <Text style={styles.currentBookLabel}>첫번째 책 읽는 중</Text>
        <Text style={styles.dDay}>D-{dummyRoom.dDay}</Text>
        <View style={styles.currentBookImage} />
      </View>

      {/* 나머지 참가자들이 읽고있는 책 */}
      <View style={styles.otherBooks}>
        {dummyRoom.otherBooks.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <View style={styles.smallCover} />
            <Text style={styles.owner}>{book.owner}</Text>
            <Text style={styles.status}>{book.status}</Text>
          </View>
        ))}
      </View>

      {/* 방 정보 모달 열기 버튼 */}
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.infoButtonText}>방 정보 확인</Text>
      </TouchableOpacity>

      {/* 방 정보 모달 */}
      <RoomInfoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        isHost={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  roomName: { fontSize: 20, fontWeight: "bold" },
  dDay: { fontSize: 16, color: "#666" },
  currentBook: { alignItems: "center", marginBottom: 24 },
  currentBookLabel: { marginBottom: 8, fontSize: 16, color: "#444" },
  currentBookImage: {
    width: 160,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#a1a1aa",
  },
  otherBooks: { flexDirection: "row", gap: 16, marginBottom: 24 },
  bookCard: { alignItems: "center" },
  smallCover: {
    width: 80,
    height: 120,
    borderRadius: 6,
    backgroundColor: "#a1a1aa",
  },
  owner: { marginTop: 4, fontSize: 14 },
  status: { fontSize: 12, color: "#888" },
  infoButton: {
    padding: 12,
    backgroundColor: "#f9c74f",
    borderRadius: 8,
    alignItems: "center",
  },
  infoButtonText: { fontWeight: "bold", color: "#333" },
});
