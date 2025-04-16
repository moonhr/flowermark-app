/**
 * @yuxincxoi
 * * 방 상세 페이지에서 책 일정 정보 카드 컴포넌트입니다.
 * 책 제목, 상태, 일정 정보를 포함하며 간단한 커버와 함께 표시됩니다.
 *
 * @module BookScheduleCard
 * @param {string} title 책 제목
 * @param {string} label 책 상태 (ex. 읽는 중, 완료 등)
 * @param {string} date 책 일정
 * @returns {JSX.Element} 책 일정 카드 컴포넌트
 */

import { View, Text, StyleSheet } from "react-native";

type BookScheduleCardProps = {
  title: string;
  label: string;
  date: string;
};

export default function BookScheduleCard({
  title,
  label,
  date,
}: BookScheduleCardProps) {
  // 책 커버와 일정 텍스트를 포함한 카드 UI 렌더링
  return (
    <View style={styles.card}>
      {/* 책 커버 */}
      <View style={styles.cover} />

      <View style={styles.textContainer}>
        {/* 책 제목 */}
        <Text style={styles.title}>{title}</Text>

        {/* 책 상태 */}
        <Text style={styles.label}>{label}</Text>

        {/* 책 일정 */}
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cover: {
    width: 50,
    height: 70,
    backgroundColor: "#a1a1aa",
    borderRadius: 6,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  label: {
    color: "#666",
    fontSize: 12,
  },
  date: {
    fontSize: 12,
  },
});
