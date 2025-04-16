import { Timestamp } from "firebase/firestore";

export interface User {
  user_id: string;
  nickname: string;
  profile_image: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}
