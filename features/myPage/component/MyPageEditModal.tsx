import { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
} from "react-native";

export default function MyPageEditModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start(onClose);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
          <Text style={styles.title}>프로필 수정</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <View style={styles.profileImage} />

          <TextInput style={styles.input} placeholder="닉네임" />

          <Text style={styles.account}>카카오 계정 연결됨</Text>

          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmText}>완료</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.logout}>로그아웃</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.delete}>계정 삭제</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#a1a1aa",
    alignSelf: "center",
    marginTop: 30,
  },
  profileChange: {
    textAlign: "center",
    color: "#555",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 24,
    fontSize: 16,
  },
  account: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  confirmButton: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
    alignItems: "center",
  },
  confirmText: {
    color: "#333",
    fontSize: 16,
  },
  logout: {
    color: "#666",
    textAlign: "center",
    marginTop: 24,
  },
  delete: {
    color: "red",
    textAlign: "center",
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },
});
