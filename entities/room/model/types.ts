import { Timestamp } from "firebase/firestore";
import { User } from "@/entities/user/model/types";

export type Room = {
  creator_id: string;
  created_at: Timestamp;
  room_name: string;
  status: "시작전" | "진행중" | "완료";
  members: string[];
  capacity: number;
  start_date: Timestamp;
  end_date: Timestamp;
};

export type RoomwithId = Room & {
  room_id: string;
};
