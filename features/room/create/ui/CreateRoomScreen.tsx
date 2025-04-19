/**
 * @yuxincxoi
 * * 방 생성 페이지 UI 컴포넌트입니다.
 * 책방 이름, 일정, 인원 수를 입력받아 '방 생성하기' 버튼을 활성화합니다.
 *
 * @module CreateRoomScreen
 * @returns {JSX.Element} 방 생성 입력 UI 컴포넌트
 */

import { View, Text, Button } from "react-native";
import { useState } from "react";
import CreateRoomButton from "../components/SubmitRoomButton";
import RoomCapacitySelect from "../components/RoomCapacitySelect";
import Input from "@/shared/ui/Input";
import DatePickerModal from "@/shared/ui/DatePicker";
import { Timestamp } from "firebase/firestore";

export default function CreateRoomScreen() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [capacity, setCapacity] = useState<number>();
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  // 모든 입력값이 존재하는 경우 true(버튼 활성화)
  const isFormComplete = name && startDate && endDate && capacity;

  // 전체 독서 기간 계산
  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  // 1인당 책 읽는 일수 = 전체 독서 기간 / 총 인원 수
  const daysPerBook =
    capacity && totalDays ? Math.floor(totalDays / capacity) : "__";

  const handleStartConfirm = (date: Date) => {
    setStartDate(date);
    setStartPickerVisible(false);
  };

  const handleEndConfirm = (date: Date) => {
    setEndDate(date);
    setEndPickerVisible(false);
    if (startDate) {
      setEndPickerVisible(false);
    }
  };

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
      <Text style={{ marginTop: 16 }}>책방 일정</Text>
      <View style={{ marginTop: 10 }}>
        {/* 시작일 선택 */}
        <Button
          title="시작일 선택"
          onPress={() => setStartPickerVisible(true)}
        />
        <DatePickerModal
          isVisible={isStartPickerVisible}
          onConfirm={handleStartConfirm}
          onCancel={() => setStartPickerVisible(false)}
        />

        {/* 종료일 선택 */}
        <View style={{ marginTop: 10 }}>
          <Button
            title="종료일 선택"
            onPress={() => setEndPickerVisible(true)}
          />
          <DatePickerModal
            isVisible={isEndPickerVisible}
            onConfirm={handleEndConfirm}
            onCancel={() => setEndPickerVisible(false)}
          />
        </View>

        {/* 선택된 날짜 표시 */}
        {(startDate || endDate) && (
          <Text style={{ marginTop: 10 }}>
            {startDate?.toLocaleDateString()} ~ {endDate?.toLocaleDateString()}
          </Text>
        )}
      </View>

      {/* 방의 총 인원 수 */}
      <RoomCapacitySelect value={capacity} onChange={setCapacity} />

      {/* 읽는 기간 */}
      <Text style={{ marginVertical: 10 }}>
        📖 책 한 권을 {daysPerBook}일 동안 읽어요!
      </Text>

      {/* '방 생성하기' 버튼 */}
      <CreateRoomButton
        isEnabled={!!isFormComplete}
        roomData={{
          creator_id: "" as string, // todo : 값 수정하기
          created_at: Timestamp.fromDate(new Date()) as Timestamp,
          room_name: name,
          status: "시작전",
          members: [],
          capacity: capacity || 0,
          start_date: startDate
            ? Timestamp.fromDate(startDate)
            : Timestamp.now(),
          end_date: endDate ? Timestamp.fromDate(endDate) : Timestamp.now(),
        }}
      />
    </View>
  );
}
