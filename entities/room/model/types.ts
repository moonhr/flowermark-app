import { Timestamp } from "firebase/firestore";
import { User } from "@/entities/user/model/types";

export type Room = {
  room_id: string;
  creator_id: Timestamp;
  created_at: Timestamp;
  room_name: string;
  status: "시작전" | "진행중" | "완료";
  members: string[];
  capacity: number;
  start_date: Timestamp;
  end_date: Timestamp;
};
