import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MyPageModal from "../component/MyPageModal";

const readBooks = [
  {
    id: 1,
    title: "죽고 싶지만 떡볶이는 먹고 싶어",
    author: "백세희",
    category: "에세이",
    review: "솔직한 내면을 들여다보게 되었어요.",
  },
  {
    id: 2,
    title: "파친코",
    author: "이민진",
    category: "역사소설",
    review: "가족의 이야기가 깊이 다가왔어요.",
  },
  {
    id: 3,
    title: "달러구트 꿈 백화점",
    author: "이나모리 가즈오",
    category: "판타지",
    review: "따뜻한 상상력을 자극해요.",
  },
];

export default function MyPageScreen() {
  const [selected, setSelected] = useState<(typeof readBooks)[0] | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage} />
        <Text style={styles.nickname}>유진</Text>
        <Text style={styles.account}>카카오 계정 연결됨</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>내 정보 수정하기</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>읽은 책</Text>
      <View style={styles.grid}>
        {readBooks.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.bookCard}
            onPress={() => setSelected(book)}
          />
        ))}
      </View>

      <MyPageModal book={selected} onClose={() => setSelected(null)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#a1a1aa",
    marginBottom: 8,
  },
  nickname: {
    fontSize: 18,
    fontWeight: "bold",
  },
  account: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  editButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#e5e5e5",
  },
  editButtonText: {
    color: "#333",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  bookCard: {
    width: "48%",
    aspectRatio: 0.75,
    backgroundColor: "#a1a1aa",
    borderRadius: 12,
  },
});
