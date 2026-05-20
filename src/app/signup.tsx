import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    router.replace("/home");
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text>Signup</Text>

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />

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