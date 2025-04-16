/**
 * @yuxincxoi
 * * 마이페이지에서 프로필을 수정하는 모달 컴포넌트입니다.
 * * 닉네임 변경, 프로필 이미지 변경, 로그아웃 및 계정 삭제 등의 기능을 포함합니다.
 *
 * @module MyPageEditModal
 * @param {boolean} visible 모달 표시 여부
 * @param {() => void} onClose 모달을 닫는 콜백 함수
 * @returns {JSX.Element} 마이페이지 수정 모달
 */

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
  // 슬라이드 애니메이션을 위한 translateY 값 (초기 위치는 아래쪽)
  const translateY = useRef(new Animated.Value(500)).current;

  // visible 상태에 따라 모달을 열고 닫는 애니메이션
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
          {/* Title */}
          <Text style={styles.title}>프로필 수정</Text>

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* 프로필 이미지 변경 */}
          <View style={styles.profileImage} />

          {/* 닉네임 변경 */}
          <TextInput style={styles.input} placeholder="닉네임" />

          {/* 연결된 계정 */}
          <Text style={styles.account}>카카오 계정 연결됨</Text>

          {/* 수정하기 버튼 */}
          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmText}>완료</Text>
          </TouchableOpacity>

          {/* 로그아웃 버튼 */}
          <TouchableOpacity>
            <Text style={styles.logout}>로그아웃</Text>
          </TouchableOpacity>

          {/* 계정 삭제 버튼 */}
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
