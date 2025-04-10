// app/index.tsx
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Text, View } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      querySnapshot.forEach((doc) => {
        console.log("✅ [ROOM]", doc.id, doc.data());
      });
    };
    fetchRooms();
  }, []);

  return (
    <View>
      <Text>🌸 HomeScreen 입니다!</Text>
    </View>
  );
}
