/**
 * @yuxincxoi
 * * 획득한 꽃갈피를 보여주는 화면입니다.
 * * 꽃갈피을 누르면 상세 정보가 모달로 표시됩니다.
 *
 * @module FlowerMarkScreen
 * @returns {JSX.Element} 꽃갈피 목록 및 선택된 꽃 상세 모달을 포함한 화면 컴포넌트
 */

import { useState, useEffect } from "react";
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
import { fetchFlowerMarks } from "../api/fetchFlowerMarks";
import { FlowerMarkProps } from "../model/types";

export default function FlowerMarkScreen() {
  const [flowerMarks, setFlowerMarks] = useState<FlowerMarkProps[]>([]);
  // 선택된 꽃갈피 정보를 저장
  const [selected, setSelected] = useState<FlowerMarkProps | null>(null);

  // 컴포넌트가 마운트될 때 꽃갈피 목록을 가져오기
  useEffect(() => {
    const loadFlowerMarks = async () => {
      const fetched = await fetchFlowerMarks();
      const extended = fetched.map((room) => ({ ...room, isPinned: false }));
      setFlowerMarks(extended);
    };
    loadFlowerMarks();
  }, []);

  return (
    <View style={styles.container}>
      {/* 꽃갈피 목록을 그리드 형태로 렌더링 */}
      <ScrollView contentContainerStyle={styles.grid}>
        {flowerMarks.map((flower) => (
          <FlowerMark
            key={flower.mark_id ?? flower.name}
            flower={flower}
            onPress={() => setSelected(flower)}
          />
        ))}
      </ScrollView>

      {/* 꽃갈피를 선택한 경우, 꽃갈피 상세 정보를 모달로 표시 */}
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
    gap: 4,
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
