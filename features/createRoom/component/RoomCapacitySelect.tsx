import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function RoomCapacitySelect({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (n: number) => void;
}) {
  const options = [2, 3, 4, 5];

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6 }}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue: number) => onChange(itemValue)}
        >
          <Picker.Item label="인원 선택" value={null} />
          {options.map((opt) => (
            <Picker.Item key={opt} label={`${opt}명`} value={opt} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
