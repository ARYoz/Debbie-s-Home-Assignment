import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
