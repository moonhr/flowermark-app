// CreateRoomScreen.tsx
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

  const isFormComplete = name && startDate && endDate && capacity;

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  const daysPerBook =
    capacity && totalDays ? Math.floor(totalDays / capacity) : "__";

  return (
    <View style={{ padding: 20 }}>
      <Input
        value={name}
        onChangeText={(text) => {
          if (text.length <= 20) setName(text);
        }}
        placeholder="책방 이름을 입력하세요."
      />

      <Text>책방 일정</Text>
      {/* 캘린더 선택기 */}
      {/* ex. '2025년 3월 10일 ~ 2025년 4월 9일'이라는 텍스트도 함께 표시 */}

      <RoomCapacitySelect value={capacity} onChange={setCapacity} />

      <Text style={{ marginVertical: 10 }}>
        📖 책 한 권을 {daysPerBook}일 동안 읽어요!
      </Text>

      <CreateRoomButton isEnabled={!!isFormComplete} />
    </View>
  );
}
