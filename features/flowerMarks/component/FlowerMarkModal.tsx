import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FlowerMarkModal({
  flower,
  onClose,
}: {
  flower: {
    id: number;
    name: string;
    english: string;
    goal: string;
  };
  onClose: () => void;
}) {
  return (
    <Modal visible={!!flower} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.flowerName}>{flower.name}</Text>
          <Text style={styles.flowerEnglish}>{flower.english}</Text>
          <View style={styles.modalFlowerMark} />
          <Text style={styles.goal}>{flower.goal}</Text>
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
  modalFlowerMark: {
    width: 120,
    height: 200,
    backgroundColor: "#a1a1aa",
    borderRadius: 10,
    marginVertical: 20,
  },
  flowerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flowerEnglish: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  goal: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
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
});
