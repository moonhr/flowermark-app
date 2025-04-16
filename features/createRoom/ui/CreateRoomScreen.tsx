/**
 * @yuxincxoi
 * * 방 생성 페이지 UI 컴포넌트입니다.
 * 책방 이름, 일정, 인원 수를 입력받아 '방 생성하기' 버튼을 활성화합니다.
 *
 * @module CreateRoomScreen
 * @returns {JSX.Element} 방 생성 입력 UI 컴포넌트
 */

import { View, Text } from "react-native";
import { useState } from "react";
import CreateRoomButton from "../component/CreateRoomButton";
import RoomCapacitySelect from "../component/RoomCapacitySelect";
import Input from "@/shared/ui/Input";

export default function CreateRoomScreen() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [capacity, setCapacity] = useState<number | undefined>(undefined);

  // 모든 입력값이 존재하는 경우 true(버튼 활성화)
  const isFormComplete = name && startDate && endDate && capacity;

  // 전체 독서 기간
  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  // 1인당 책 읽는 일수 = 전체 독서 기간 / 총 인원 수
  const daysPerBook =
    capacity && totalDays ? Math.floor(totalDays / capacity) : "__";

  return (
    <View style={{ padding: 20 }}>
      {/* 책방 이름 (최대 20자) */}
      <Input
        value={name}
        onChangeText={(text) => {
          if (text.length <= 20) setName(text);
        }}
        placeholder="책방 이름을 입력하세요."
      />

      {/* 책방 일정 */}
      <Text>책방 일정</Text>
      {/* 캘린더 추가하기 */}
      {/* ex. '2025년 3월 10일 ~ 2025년 4월 9일'이라는 텍스트도 함께 표시 */}

      {/* 방의 총 인원 수 */}
      <RoomCapacitySelect value={capacity} onChange={setCapacity} />

      {/* 읽는 기간 */}
      <Text style={{ marginVertical: 10 }}>
        📖 책 한 권을 {daysPerBook}일 동안 읽어요!
      </Text>

      {/* '방 생성하기' 버튼 */}
      <CreateRoomButton isEnabled={!!isFormComplete} />
    </View>
  );
}
