/**
 * @yuxincxoi
 * * DateTimePicker 모달 컴포넌트입니다.
 *
 * @param {boolean} isVisible - 모달의 표시 여부
 * @param {"date" | "time" | "datetime"} [mode] - 선택 모드
 * @param {(date: Date) => void} onConfirm - 날짜 선택 후 처리 함수
 * @param {() => void} onCancel - 취소 처리 함수
 */

import React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

interface DatePickerModalProps {
  isVisible: boolean;
  mode?: "date" | "time" | "datetime";
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  mode = "date",
  onConfirm,
  onCancel,
}) => {
  return (
    <DateTimePicker
      isVisible={isVisible}
      mode={mode}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default DatePickerModal;
