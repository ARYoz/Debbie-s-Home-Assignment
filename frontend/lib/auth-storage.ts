import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_EMAIL_KEY = "user_email";

export async function setUserEmail(email: string): Promise<void> {
  await AsyncStorage.setItem(USER_EMAIL_KEY, email);
}

export async function getUserEmail(): Promise<string | null> {
  return AsyncStorage.getItem(USER_EMAIL_KEY);
}

export async function clearUser(): Promise<void> {
  await AsyncStorage.removeItem(USER_EMAIL_KEY);
}
