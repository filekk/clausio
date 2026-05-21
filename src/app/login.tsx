import { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      router.replace("/home");
    }
  });

  return () => data.subscription.unsubscribe();
}, []);

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
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
      <Text>Login</Text>

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

      <Button title="Login" onPress={login} />

      <Button title="Go to signup" onPress={() => router.push("/signup")} />
    </View>
  );
}