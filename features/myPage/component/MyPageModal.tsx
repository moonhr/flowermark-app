import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MyPageModal({
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
  if (!book) return null;

  return (
    <Modal visible={!!book} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>
            {book.author} ・ {book.category}
          </Text>
          <View style={styles.bookCover} />
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
