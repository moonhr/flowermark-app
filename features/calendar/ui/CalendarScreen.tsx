/**
 * @yuxincxoi
 * * 캘린더 화면을 렌더링하는 컴포넌트입니다.
 * 사용자가 날짜를 누르면, 해당 날짜가 포함된 방들의 리스트가 아래에 RoomCard 형태로 렌더링됩니다.
 * 각 RoomCard를 클릭하면 해당 책방 상세 페이지로 이동합니다.
 *
 * @module CalendarScreen
 * @returns {JSX.Element} 캘린더가 포함된 View 컴포넌트
 */

import { useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchRooms } from "@/entities/room/api/fetchRooms";
import {
  eachDayOfInterval,
  format,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { RoomwithId } from "@/entities/room/model/types";
import RoomCard from "@/features/room/list/components/RoomCard";

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
  const [selectedRooms, setSelectedRooms] = useState<RoomwithId[]>([]);

  // 방 데이터 로딩 및 markedDates 초기화
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

      // 캘린더에 각 방의 일정 표시
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
    const clickedDate = new Date(date);

    const filtered = rooms.filter((room) => {
      const start = startOfDay(room.start_date.toDate());
      const end = endOfDay(room.end_date.toDate());
      return isWithinInterval(clickedDate, { start, end });
    });

    setSelectedRooms(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 캘린더 */}
      <Calendar
        style={styles.container}
        markingType={"multi-period"}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#3b82f6",
        }}
      />

      {/* 책방 리스트 */}
      <ScrollView contentContainerStyle={styles.roomList}>
        {selectedRooms.map((room) => (
          <TouchableOpacity
            key={room.room_id}
            onPress={() =>
              router.push({
                pathname: "/room-detail/[id]",
                params: {
                  id: room.room_id,
                  name: room.room_name,
                  status: room.status,
                  start: format(room.start_date.toDate(), "yyyy-MM-dd"),
                  end: format(room.end_date.toDate(), "yyyy-MM-dd"),
                },
              })
            }
          >
            <RoomCard room={room} isPinned={false} onTogglePin={() => {}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    marginBottom: 40,
    backgroundColor: "white",
  },
  roomList: {
    paddingBottom: 24,
  },
});
