/**
 * @yuxincxoi
 * * 꽃갈피 정보를 표시하는 모달 컴포넌트입니다.
 *
 * @module FlowerMarkModal
 * @param {Object} flower 꽃갈피 정보 객체 (id, name, englishName, goal)
 * @param {() => void} onClose 모달을 닫을 때 실행되는 콜백 함수
 * @returns {JSX.Element} 모달로 출력되는 꽃갈피 정보 컴포넌트
 */

import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FlowerMarkModal({
  flower,
  onClose,
}: {
  flower: {
    id: number;
    name: string;
    englishName: string;
    goal: string;
  };
  onClose: () => void;
}) {
  return (
    <Modal visible={!!flower} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* 닫기 버튼 */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* 꽃 이름 */}
          <Text style={styles.flowerName}>{flower.name}</Text>

          {/* 꽃 영어 이름 */}
          <Text style={styles.flowerEnglishName}>{flower.englishName}</Text>

          {/* 꽃갈피 이미지 */}
          <View style={styles.modalFlowerMark} />

          {/* 달성한 목표 */}
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
  flowerEnglishName: {
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
