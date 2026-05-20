import { Button } from "react-native";
import { supabase } from "../lib/supabase";
import * as AuthSession from "expo-auth-session";

export default function GoogleLogin() {
  const login = async () => {
    const redirectTo = AuthSession.makeRedirectUri({
      scheme: "clausio",
    });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    console.log("OAUTH:", data, error);
  };

  return <Button title="Google login" onPress={login} />;
}