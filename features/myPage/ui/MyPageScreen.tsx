/**
 * @yuxincxoi
 * * 마이페이지 화면 컴포넌트입니다.
 * * 사용자 정보를 불러오고, 읽은 책 리스트 및 프로필 수정 모달을 제공합니다.
 *
 * @module MyPageScreen
 * @returns {JSX.Element} 마이페이지 UI 및 BookModal, MyPageEditModal을 포함한 컴포넌트
 */

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BookModal from "../component/BookModal";
import MyPageEditModal from "../component/MyPageEditModal";

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
  const [editVisible, setEditVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profileContainer}>
        {/* 프로필 이미지 */}
          <View style={styles.profileImage} />
        )}

        {/* 닉네임 */}
        <Text style={styles.nickname}>유진</Text>

        {/* 연결된 계정 */}
        <Text style={styles.account}>카카오 계정 연결됨</Text>

        {/* 내 정보 수정하기 버튼 */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditVisible(true)}
        >
          <Text style={styles.editButtonText}>내 정보 수정하기</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>읽은 책</Text>
      {/* 읽은 책 리스트를 그리드 형식으로 렌더링 */}
      <View style={styles.grid}>
        {readBooks.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.bookCard}
            onPress={() => setSelected(book)}
          />
        ))}
      </View>

      {/* 책 상세 정보 모달 */}
      <BookModal book={selected} onClose={() => setSelected(null)} />
      {/* 내 정보 수정 모달 */}
      <MyPageEditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      />
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
    gap: 2,
  },
  bookCard: {
    width: "25%",
    aspectRatio: 0.75,
    backgroundColor: "#a1a1aa",
    borderRadius: 2,
  },
});
