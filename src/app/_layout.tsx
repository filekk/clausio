import "../../global.css";
import { Tabs } from "expo-router";
import { Home, Notebook } from "lucide-react-native";
import Avatar from "../components/avatar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Layout() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadAvatar = async () => {
            const { data } = await supabase.auth.getUser();
            const user = data.user;

            if (!user) return;

            const { data: profile } = await supabase
                .from("profiles")
                .select("avatar_url")
                .eq("id", user.id)
                .single();

            setAvatarUrl(profile?.avatar_url ?? null);
        };

        loadAvatar();
    }, []);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#000",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Home size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="routines"
                options={{
                    title: "Routines",
                    tabBarIcon: ({ color, size }) => (
                        <Notebook size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: () => (
                        <Avatar uri={avatarUrl} />
                    ),
                }}
            />

            {/* ukryte ekrany */}
            <Tabs.Screen name="login" options={{ href: null }} />
            <Tabs.Screen name="signup" options={{ href: null }} />
            <Tabs.Screen name="index" options={{ href: null }} />
        </Tabs>
    );
}