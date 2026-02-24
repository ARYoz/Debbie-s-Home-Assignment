import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUser, getUserEmail, setUserEmail } from "../auth-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe("auth-storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("setUserEmail stores value in AsyncStorage", async () => {
    await setUserEmail("user@example.com");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("user_email", "user@example.com");
  });

  it("getUserEmail returns stored value", async () => {
    (AsyncStorage.getItem as unknown as jest.Mock).mockResolvedValue("user@example.com");
    const email = await getUserEmail();
    expect(email).toBe("user@example.com");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("user_email");
  });

  it("clearUser removes user from AsyncStorage", async () => {
    await clearUser();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user_email");
  });
});
