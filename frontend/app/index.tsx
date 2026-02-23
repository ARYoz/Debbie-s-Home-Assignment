import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { getUserEmail } from "@/lib/auth-storage";

export default function IndexScreen() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const email = await getUserEmail();
      setChecking(false);
      if (email) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    })();
  }, [router]);

  const containerStyle = { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" };
  if (checking) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100" style={containerStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 items-center justify-center bg-gray-100" style={containerStyle}>
      <ActivityIndicator size="large" />
    </View>
  );
}
