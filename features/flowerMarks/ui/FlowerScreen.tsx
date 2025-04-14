import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import FlowerMark from "../component/FlowerMark";
import FlowerMarkModal from "../component/FlowerMarkModal";

const flowerData = [
  {
    id: 1,
    name: "튤립",
    english: "Tulip",
    goal: "자기계발 서적을 10권 이상 읽었어요!",
  },
  {
    id: 2,
    name: "라넌큘러스",
    english: "Ranunculus",
    goal: "총 20권 이상의 책을 읽었어요!",
  },
  {
    id: 3,
    name: "금잔화",
    english: "Calendula",
    goal: "2개의 책방을 완료했어요!",
  },
];

export default function FlowerMarkScreen() {
  const [selected, setSelected] = useState<null | (typeof flowerData)[0]>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {flowerData.map((flower) => (
          <FlowerMark
            key={flower.id}
            flower={flower}
            onPress={() => setSelected(flower)}
          />
        ))}
      </ScrollView>

      {selected && (
        <FlowerMarkModal flower={selected} onClose={() => setSelected(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  flowerMark: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#a1a1aa",
    borderRadius: 12,
  },
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
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
  },
  modalFlowerMark: {
    width: 150,
    height: 150,
    backgroundColor: "#a1a1aa",
    borderRadius: 16,
    marginVertical: 20,
  },
  flowerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flowerEnglish: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  goal: {
    fontSize: 14,
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
