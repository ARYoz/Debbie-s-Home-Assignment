import { useState } from "react";
import { View, Text, TextInput, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/lib/api";
import { setUserEmail } from "@/lib/auth-storage";
import { Button } from "@/components/Button";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const { email: loggedInEmail } = await api.login(email.trim(), password);
      await setUserEmail(loggedInEmail);
      router.replace("/home");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
      const isNetwork = /failed|network|fetch|refused|ECONNREFUSED/i.test(message);
      if (Platform.OS !== "web") {
        Alert.alert(
          "Login failed",
          isNetwork
            ? `${message}\n\nMake sure the backend is running (npm run start in backend folder) and EXPO_PUBLIC_API_URL in .env points to it. On Android emulator use http://10.0.2.2:3000`
            : message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-slate-50 px-6">
      <View className="mx-auto w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-lg shadow-slate-200/80">
        <Text className="mb-1 text-center text-2xl font-bold text-slate-800">
          Welcome
        </Text>
        <Text className="mb-8 text-center text-sm text-slate-500">
          Sign in to continue
        </Text>
        <Text className="mb-2 text-sm font-semibold text-slate-700">Email</Text>
        <TextInput
          className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800"
          placeholder="demo@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#94a3b8"
        />
        <Text className="mb-2 text-sm font-semibold text-slate-700">Password</Text>
        <TextInput
          className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800"
          style={{ marginBottom: 24 }}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#94a3b8"
        />
        {error ? (
          <Text className="mb-4 text-center text-sm text-red-600">{error}</Text>
        ) : null}
        <Button
          label={loading ? "Signing in…" : "Sign in"}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>
    </View>
  );
}
