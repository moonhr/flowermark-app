import { DEFAULT_PROFILE_IMAGES } from "@/constants/defaultProfileImages";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Animated,
} from "react-native";

export default function ProfileImageSelector({
  onSelect,
  onClose,
  visible,
}: {
  onSelect: (uri: any) => void;
  onClose: () => void;
  visible: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(DEFAULT_PROFILE_IMAGES[0]);

  // 모달 슬라이드 애니메이션 초기값 설정
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalBackground} />
        <Animated.View
          style={[styles.animatedContainer, { transform: [{ translateY }] }]}
        >
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.title}>프로필 이미지를 선택하세요.</Text>
              <View style={styles.previewWrapper}>
                <Image source={selectedImage} style={styles.previewImage} />
              </View>
              <View style={styles.imageGrid}>
                {DEFAULT_PROFILE_IMAGES.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImage(img)}
                  >
                    <Image source={img} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>이전으로</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  onSelect(selectedImage);
                }}
              >
                <Text style={styles.saveText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalBackground: {
    flex: 1,
  },
  animatedContainer: {
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  modalContent: {
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  previewWrapper: {
    marginBottom: 16,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    margin: "auto",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
    marginBottom: 24,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 8,
    backgroundColor: "#e5e5e5",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    backgroundColor: "#007aff",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});
