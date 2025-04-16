/**
 * @yuxincxoi
 * * 마이페이지에서 책 정보를 표시하는 모달 컴포넌트입니다.
 * 제목, 저자, 카테고리, 커버 이미지, 리뷰를 보여줍니다.
 *
 * @module BookModal
 * @param {Object|null} book 표시할 책 정보 객체
 * @param {() => void} onClose 모달을 닫는 콜백 함수
 * @returns {JSX.Element|null} 책 정보가 있을 경우에만 표시되는 모달 컴포넌트
 */

import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BookModal({
  book,
  onClose,
}: {
  book: {
    id: number;
    title: string;
    author: string;
    category: string;
    review: string;
  } | null;
  onClose: () => void;
}) {
  // book 정보가 없으면 모달을 렌더링하지 않음
  if (!book) return null;

  return (
    <Modal visible={!!book} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* 책 제목 */}
          <Text style={styles.bookTitle}>{book.title}</Text>

          {/* 책 저자와 카테고리 */}
          <Text style={styles.bookAuthor}>
            {book.author} ・ {book.category}
          </Text>

          {/* 책 커버 이미지 */}
          <View style={styles.bookCover} />

          {/* 책 리뷰 */}
          <Text style={styles.bookReview}>"{book.review}"</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeText: {
    fontSize: 18,
    color: "#666",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  bookCover: {
    width: 150,
    height: 220,
    backgroundColor: "#a1a1aa",
    borderRadius: 5,
    marginVertical: 20,
  },
  bookReview: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 12,
  },
});
