const getBaseUrl = () =>
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

const base = getBaseUrl().replace(/\/$/, ""); // no trailing slash

export const api = {
  baseUrl: base,

  async login(
    email: string,
    password: string
  ): Promise<{ success: true; email: string }> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Login failed");
    }
    return res.json();
  },

  async deleteAccount(email: string): Promise<{ message: string; email: string }> {
    const url = `${this.baseUrl}/users/delete`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const text = await res.text();
      // 400 often returns JSON with message or validation errors
      let msg = text || "Delete account failed";
      try {
        const j = JSON.parse(text) as { message?: string | string[]; statusCode?: number };
        if (Array.isArray(j.message)) msg = j.message.join(", ");
        else if (typeof j.message === "string") msg = j.message;
      } catch {
        /* use text as-is */
      }
      throw new Error(msg);
    }
    return res.json();
  },
};
