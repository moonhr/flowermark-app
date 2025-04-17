import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Room } from "../model/types";

export async function fetchRooms(): Promise<Room[]> {
  const querySnapshot = await getDocs(collection(db, "rooms"));
  return querySnapshot.docs.map((doc) => doc.data() as Room);
}
