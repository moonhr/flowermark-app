/**
 * @yuxincxoi
 * * 모든 책방 데이터를 가져오는 유틸 함수입니다.
 *
 * @module fetchRooms
 * @returns {Promise<Room[]>} Firestore의 'rooms' 컬렉션에서 가져온 책방 객체 배열
 */

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Room, RoomwithId } from "../model/types";

// 'rooms' 컬렉션에서 사용자 데이터를 모두 가져와 Room[] 형태로 반환
export async function fetchRooms(): Promise<RoomwithId[]> {
  const querySnapshot = await getDocs(collection(db, "rooms"));
  return querySnapshot.docs.map((doc) => ({
    ...(doc.data() as Room),
    room_id: doc.id,
  }));
}
