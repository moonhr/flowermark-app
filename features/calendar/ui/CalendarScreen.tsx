/**
 * @yuxincxoi
 * * 캘린더 화면을 렌더링하는 컴포넌트입니다.
 *
 * @module CalendarScreen
 * @returns {JSX.Element} 캘린더가 포함된 View 컴포넌트
 */

import { useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { fetchRooms } from "@/entities/room/api/fetchRooms";
import { eachDayOfInterval, format } from "date-fns";

export default function CalendarScreen() {
  const router = useRouter();
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  useEffect(() => {
    const loadSchedules = async () => {
      const rooms = await fetchRooms();
      const newMarked: { [key: string]: any } = {};
      const colors = [
        "rgba(59, 130, 246, 0.3)",
        "rgba(16, 185, 129, 0.3)",
        "rgba(245, 158, 11, 0.3)",
        "rgba(239, 68, 68, 0.3)",
        "rgba(99, 102, 241, 0.3)",
        "rgba(236, 72, 153, 0.3)",
        "rgba(20, 184, 166, 0.3)",
        "rgba(234, 179, 8, 0.3)",
        "rgba(139, 92, 246, 0.3)",
        "rgba(34, 211, 238, 0.3)",
      ];

      rooms.forEach((room, index) => {
        const startDate = room.start_date.toDate();
        const endDate = room.end_date.toDate();
        const color = colors[index % colors.length];

        const startKey = format(startDate, "yyyy-MM-dd");
        const endKey = format(endDate, "yyyy-MM-dd");

        newMarked[startKey] = {
          startingDay: true,
          color,
          textColor: "white",
        };

        newMarked[endKey] = {
          endingDay: true,
          color,
          textColor: "white",
        };

        const middleDates = eachDayOfInterval({
          start: new Date(startDate.getTime() + 86400000),
          end: new Date(endDate.getTime() - 86400000),
        });

        middleDates.forEach((date) => {
          const key = format(date, "yyyy-MM-dd");
          newMarked[key] = {
            color,
            textColor: "white",
          };
        });
      });

      const today = new Date().toISOString().split("T")[0];
      newMarked[today] = {
        ...newMarked[today],
        marked: true,
        dotColor: "#3b82f6",
        activeOpacity: 0,
      };

      setMarkedDates(newMarked);
    };

    loadSchedules();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    const date = day.dateString;
    const matchedRoom = Object.entries(markedDates).find(
      ([key]) => key === date
    );

    if (matchedRoom) {
      router.push(`/room-detail/${matchedRoom[1].room_id}`);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType={"period"}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          selectedDayMarked: "true",
          selectedDayBackgroundColor: "#3b82f6",
          todayTextColor: "black",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
});
