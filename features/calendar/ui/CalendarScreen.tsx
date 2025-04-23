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
import { RoomwithId } from "@/entities/room/model/types";

type MarkedDates = {
  [date: string]: {
    periods?: {
      startingDay?: boolean;
      endingDay?: boolean;
      color: string;
      textColor?: string;
    }[];
    marked?: boolean;
    dotColor?: string;
    color?: string;
    textColor?: string;
    startingDay?: boolean;
    endingDay?: boolean;
    room_id?: string;
  };
};

export default function CalendarScreen() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomwithId[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const loadSchedules = async () => {
      const loadRooms = await fetchRooms();
      setRooms(loadRooms);

      const newMarked: MarkedDates = {};
      const colors = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#6366f1",
        "#ec4899",
        "#14b8a6",
        "#eab308",
        "#8b5cf6",
        "#22d3ee",
      ];

      loadRooms.forEach((room, index) => {
        const startDate = room.start_date.toDate();
        const endDate = room.end_date.toDate();
        const color = colors[index % colors.length];

        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        allDates.forEach((date, i) => {
          const key = format(date, "yyyy-MM-dd");
          if (!newMarked[key]) {
            newMarked[key] = {};
          }
          if (!newMarked[key].periods) {
            newMarked[key].periods = [];
          }
          newMarked[key].periods.push({
            startingDay: i === 0,
            endingDay: i === allDates.length - 1,
            color,
            textColor: "white",
          });

          if (i === 0) {
            newMarked[key].room_id = room.room_id;
          }
        });
      });

      const today = new Date().toISOString().split("T")[0];
      newMarked[today] = {
        ...newMarked[today],
        marked: true,
        dotColor: "#3b82f6",
      };

      setMarkedDates(newMarked);
    };

    loadSchedules();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    const date = day.dateString;
    const matched = markedDates[date];
    if (!matched || !matched.room_id) return;

    const room = rooms.find((r) => r.room_id === matched.room_id);
    if (!room) return;

    router.push({
      pathname: "/room-detail/[id]",
      params: {
        id: room.room_id,
        name: room.room_name,
        status: room.status,
        start: format(room.start_date.toDate(), "yyyy-MM-dd"),
        end: format(room.end_date.toDate(), "yyyy-MM-dd"),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType={"multi-period"}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#3b82f6",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
