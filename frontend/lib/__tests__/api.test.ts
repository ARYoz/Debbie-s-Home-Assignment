/**
 * Simple tests for API helpers: correct URL and method.
 * We mock fetch so we don't call the real backend.
 */
const mockFetch = jest.fn();
(global as unknown as { fetch: typeof fetch }).fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("api.login", () => {
  it("calls POST /auth/login and returns success and email", async () => {
    const { api } = await import("../api");
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, email: "a@b.com" }),
    });

    const result = await api.login("a@b.com", "pass");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "a@b.com", password: "pass" }),
      })
    );
    expect(result).toEqual({ success: true, email: "a@b.com" });
  });

  it("throws when response is not ok", async () => {
    const { api } = await import("../api");
    mockFetch.mockResolvedValue({ ok: false, text: () => Promise.resolve("Unauthorized") });

    await expect(api.login("a@b.com", "wrong")).rejects.toThrow();
  });
});

describe("api.deleteAccount", () => {
  it("calls POST /users/delete with email", async () => {
    const { api } = await import("../api");
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Account deleted", email: "a@b.com" }),
    });

    const result = await api.deleteAccount("a@b.com");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/delete"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "a@b.com" }),
      })
    );
    expect(result).toEqual({ message: "Account deleted", email: "a@b.com" });
  });
});
