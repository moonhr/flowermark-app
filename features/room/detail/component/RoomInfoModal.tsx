/**
 * @yuxincxoi
 * * 방 상세 정보 모달 컴포넌트입니다.
 * * 방 이름, 상태, 일정 ,참가자 정보와 책 일정을 표시하고, 방장에게만 수정/삭제 버튼을 표시합니다.
 *
 * @module RoomInfoModal
 * @param {boolean} visible 모달의 표시 여부
 * @param {() => void} onClose 모달을 닫는 함수
 * @param {boolean} isHost 사용자가 방장인지 여부
 * @returns {JSX.Element} 방 상세 정보 모달 컴포넌트
 */

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
import { useState, useEffect, useRef } from "react";
import UserIcon from "./UserIcon";
import BookScheduleCard from "./BookScheduleCard";
import RoomEditModal from "../../update/components/RoomEditModal";
import { Timestamp } from "firebase/firestore";

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
  const { id, name, status, start, end } = useLocalSearchParams();
  const roomName = name as string;
  const roomStatus = status as string;
  const roomStartDate = start as string;
  const roomEndDate = end as string;
  const [editVisible, setEditVisible] = useState(false);

  // 모달 슬라이드 애니메이션 초기값 설정
  const translateX = useRef(new Animated.Value(500)).current;

  // 모달 닫기 애니메이션
  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  // 모달 열기 애니메이션
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
          {/* 닫기 버튼 */}
          <Text style={styles.closeButton} onPress={handleClose}>
            X
          </Text>

          <ScrollView>
            {/* 방 이름, 상태, 일정 */}
            <Text style={styles.title}>{roomName}</Text>
            <Text style={styles.text}>{roomStatus}</Text>
            <Text style={styles.text}>
              {roomStartDate} ~ {roomEndDate}
            </Text>

            {/* 참가자 목록 */}
            <Text style={styles.sectionTitle}>참가자</Text>
            <View style={styles.row}>
              <UserIcon name="유진" />
              <UserIcon name="혜림" />
            </View>

            {/* 책 일정 목록 */}
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

            {/* 책 교환 일정 수정, 방 삭제 요청하기 버튼 */}
            <Button title="책 교환 일정 수정 요청하기" onPress={() => {}} />
            <Button title="방 삭제 및 책 회수 요청하기" onPress={() => {}} />

            {/* 방 정보 수정, 삭제 버튼 - 방장일 경우 표시 */}
            {isHost && (
              <>
                <Button
                  title="방 정보 수정하기"
                  onPress={() => setEditVisible(true)}
                />
                <Button title="방 삭제하기" onPress={() => {}} color="red" />
              </>
            )}

            {/* 내 정보 수정 모달 */}
            <RoomEditModal
              visible={editVisible}
              onClose={() => setEditVisible(false)}
              room={{
                room_name: roomName,
                status: roomStatus as "시작전" | "진행중" | "완료",
                members: [],
                capacity: 0,
                creator_id: "",
                created_at: Timestamp.now(),
                start_date: Timestamp.fromDate(new Date(roomStartDate)),
                end_date: Timestamp.fromDate(new Date(roomEndDate)),
              }}
            />
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
