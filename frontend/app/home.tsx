import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/lib/api";
import { getUserEmail, clearUser } from "@/lib/auth-storage";
import { Button } from "@/components/Button";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getUserEmail().then((e) => {
      setEmail(e);
      setChecked(true);
    });
  }, []);

  useEffect(() => {
    if (checked && !email) {
      router.replace("/login");
    }
  }, [checked, email, router]);

  const handleDeleteAccount = async () => {
    setError(null);
    if (!email) {
      clearUser();
      router.replace("/login");
      return;
    }
    setLoading(true);
    try {
      await api.deleteAccount(email);
      // Navigate first so the user sees the login screen immediately
      router.replace("/login");
      clearUser(); // clear storage in background
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete account");
    } finally {
      setLoading(false);
    }
  };

  if (!checked || !email) {
    return null;
  }

  return (
    <View className="flex-1 justify-center bg-slate-50 px-6">
      <View className="mx-auto w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-lg shadow-slate-200/80">
        <Text className="mb-2 text-center text-2xl font-bold text-slate-800">
          Home
        </Text>
        <Text className="mb-8 text-center text-sm text-slate-500">
          You are signed in as {email}
        </Text>
        {error ? (
          <Text className="mb-4 text-center text-sm text-red-600">{error}</Text>
        ) : null}
        <Button
          label={loading ? "Deleting…" : "Delete Account"}
          variant="danger"
          onPress={handleDeleteAccount}
          disabled={loading}
        />
      </View>
    </View>
  );
}
