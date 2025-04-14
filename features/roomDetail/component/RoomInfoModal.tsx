import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Animated,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import UserIcon from "./UserIcon";
import BookScheduleCard from "./BookScheduleCard";

type RoomInfoModalProps = {
  visible: boolean;
  onClose: () => void;
  isHost: boolean;
};

export default function RoomInfoModal({
  visible,
  onClose,
  isHost,
}: RoomInfoModalProps) {
  const { id, name, status, schedule } = useLocalSearchParams();
  const roomName = name as string;
  const roomStatus = status as string;
  const roomSchedule = schedule as string;

  const translateX = useRef(new Animated.Value(500)).current;

  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateX }] }]}
        >
          <Text style={styles.closeButton} onPress={handleClose}>
            X
          </Text>
          <ScrollView>
            <Text style={styles.title}>{roomName}</Text>
            <Text style={styles.text}>{roomStatus}</Text>
            <Text style={styles.text}>{roomSchedule}</Text>

            <Text style={styles.sectionTitle}>참가자</Text>
            <View style={styles.row}>
              <UserIcon name="유진" />
              <UserIcon name="혜림" />
            </View>

            <Text style={styles.sectionTitle}>책 일정</Text>
            <BookScheduleCard
              title="죽고 싶지만 떡볶이는 먹고 싶어"
              label="현재 읽는 책"
              date="~ 2025.3.17"
            />
            <BookScheduleCard
              title="파친코"
              label="읽을 예정인 책"
              date="2025.3.18 ~"
            />
            <BookScheduleCard title="자본주의" label="완료된 책" date="완료" />
            <Button title="책 교환 일정 수정 요청하기" onPress={() => {}} />
            {isHost && (
              <>
                <Button title="방 정보 수정하기" onPress={() => {}} />
                <Button title="방 삭제하기" onPress={() => {}} color="red" />
              </>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    fontSize: 20,
  },
});
