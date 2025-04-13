import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>🌸 HomeScreen 입니다!</Text>
    </View>
  );
}
