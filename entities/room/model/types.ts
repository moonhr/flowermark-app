import { Timestamp } from "firebase/firestore";

export type Room = {
  room_id: string;
  creator_id: Timestamp;
  created_at: Timestamp;
  room_name: string;
  status: "시작전" | "진행중" | "완료";
  members: number;
  capacity: number;
  start_date: Timestamp;
  end_date: Timestamp;
};
