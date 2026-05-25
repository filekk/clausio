import { Image, View } from "react-native";

export default function Avatar({ uri }: { uri: string | null }) {
  if (!uri) return null;

  return (
    <View>
      <Image
        source={{ uri }}
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
        }}
      />
    </View>
  );
}