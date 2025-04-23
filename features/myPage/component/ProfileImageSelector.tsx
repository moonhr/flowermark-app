import { DEFAULT_PROFILE_IMAGES } from "@/constants/defaultProfileImages";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileImageSelector({
  onSelect,
  onClose,
}: {
  onSelect: (uri: any) => void;
  onClose: () => void;
}) {
  return (
    <View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        {DEFAULT_PROFILE_IMAGES.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(img)}>
            <Image source={img} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    color: "#333",
  },
});
