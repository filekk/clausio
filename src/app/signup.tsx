import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (userId: string) => {
    if (!avatar) return null;

    const filePath = `${userId}.jpg`;

    const response = await fetch(avatar);
    const arrayBuffer = await response.arrayBuffer();

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, arrayBuffer, {
        upsert: true,
        contentType: "image/jpeg",
      });

    if (error) {
      console.log("UPLOAD ERROR:", error.message);
      return null;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const signup = async () => {
    if (!username.trim()) return;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("AUTH ERROR:", error.message);
      return;
    }

    const user = data.user;
    if (!user) return;

    const avatarUrl = await uploadAvatar(user.id);

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      username,
      avatar_url: avatarUrl,
    });

    if (profileError) {
      console.log("PROFILE ERROR:", profileError.message);
      return;
    }

    router.replace("/home");
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text>Signup</Text>

      {avatar && (
        <Image
          source={{ uri: avatar }}
          style={{ width: 100, height: 100, borderRadius: 999 }}
        />
      )}

      <Button title="Pick profile picture" onPress={pickImage} />

      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput placeholder="email" value={email} onChangeText={setEmail} />

      <TextInput
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Create account" onPress={signup} />

      <Button title="Go to login" onPress={() => router.push("/login")} />
    </View>
  );
}
