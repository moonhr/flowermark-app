/**
 * @yuxincxoi
 * * Input 컴포넌트입니다.
 *
 * @module Input
 * @param {string} [label] 입력 필드 상단에 표시되는 라벨
 * @param {string} value 입력 값
 * @param {(text: string) => void} onChangeText 입력 값이 변경될 때 실행되는 함수
 * @param {string} [placeholder] 플레이스홀더
 * @param {number} [maxLength] 입력 가능한 최대 글자 수
 * @param {string} [error] 에러 메시지
 * @returns {JSX.Element} 입력 필드 컴포넌트
 */

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

type InputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  error?: string;
} & TextInputProps;

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  error,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {/* 라벨 */}
      {label && <Text style={styles.label}>{label}</Text>}
      {/* 텍스트 입력 필드 */}
      <TextInput
        style={[styles.input, error && { borderColor: "red" }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={maxLength}
        {...rest}
      />
      {/* 에러 메시지 (선택적) */}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { marginBottom: 4, fontSize: 14, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  error: { marginTop: 4, color: "red", fontSize: 12 },
});
