import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function RoomDeleteModal({
  visible,
  reason,
  onChangeReason,
  onClose,
}: {
  visible: boolean;
  reason: string;
  onChangeReason: (text: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.deleteOverlay}>
        <View style={styles.deleteModal}>
          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>방 삭제 사유를 입력해주세요</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="예: 책이 모두 회수되었어요."
            value={reason}
            onChangeText={onChangeReason}
          />
          <TouchableOpacity
            style={[
              styles.requestButton,
              reason.trim()
                ? styles.requestButtonActive
                : styles.requestButtonDisabled,
            ]}
            disabled={!reason.trim()}
            onPress={() => {
              // todo : 알림 전송 및 상태 비활성화 로직으로 연결 예정
              console.log(`[삭제 요청] ${reason}`);
              onClose();
            }}
          >
            <Text style={styles.requestButtonText}>삭제 요청하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  deleteOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  deleteModal: {
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    height: 100,
    textAlignVertical: "top",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    color: "#333",
  },
  requestButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  requestButtonActive: {
    backgroundColor: "#007AFF",
  },
  requestButtonDisabled: {
    backgroundColor: "#ccc",
  },
  requestButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
