import * as WebBrowser from "expo-web-browser";
import { Stack } from "expo-router";
import "../../global.css";

WebBrowser.maybeCompleteAuthSession();

export default function Layout() {
  return <Stack />;
}