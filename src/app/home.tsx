import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      setEmail(user.email ?? null);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("avatar_url, username")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.log("PROFILE ERROR:", error.message);
        return;
      }

      if (!profile) return;

      setAvatar(profile.avatar_url);
      setUsername(profile.username);
    };

    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      {avatar && (
        <Image
          source={{ uri: avatar }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
      <Text>Welcome {username ?? "user"}!</Text>
      <Text>Your e-mail is {email}.</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
