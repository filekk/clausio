import { useEffect } from "react";
import { Redirect } from "expo-router";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Index() {
  const [route, setRoute] = useState<null | string>(null);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setRoute("/home");
      } else {
        setRoute("/login");
      }
    };

    check();
  }, []);

  if (!route) return null;

  return <Redirect href={route} />;
}