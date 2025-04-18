/**
 * @yuxincxoi
 * * 방 생성 페이지에서 총 인원 수를 선택하는 드롭다운 컴포넌트입니다.
 *
 * @module RoomCapacitySelect
 * @param {number | undefined} value 현재 선택된 인원 수
 * @param {(n: number) => void} onChange 인원 수 변경 시 호출되는 콜백 함수
 * @returns {JSX.Element} 인원 선택을 위한 Picker 컴포넌트
 */

import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function RoomCapacitySelect({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (n: number) => void;
}) {
  // 선택 가능한 인원 수 옵션
  const options = [2, 3, 4, 5];

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6 }}>
        <Picker
          selectedValue={value?.toString() ?? ""}
          onValueChange={(itemValue) => {
            if (itemValue === "") return;
            onChange(Number(itemValue));
          }}
        >
          <Picker.Item label="인원 선택" value="" />
          {options.map((opt) => (
            <Picker.Item
              key={opt}
              label={`${opt.toString()}명`}
              value={opt.toString()}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
