import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import "../../global.css";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    };

    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text>Home</Text>
      <Text>{email}</Text>

      <Button title="Logout" onPress={logout} />
      <Text className="text-xl font-bold text-blue-500">FIGON!</Text>
    </View>
  );
}