/** Jest globals for TypeScript when @types/jest is not resolved. */
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void | Promise<void>) => void;
declare const expect: (value: unknown) => {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
  toHaveBeenCalled: () => void;
  toHaveBeenCalledWith: (...args: unknown[]) => void;
  toThrow: () => void;
  rejects: { toThrow: () => Promise<void> };
};
declare const beforeEach: (fn: () => void | Promise<void>) => void;
declare const beforeAll: (fn: () => void | Promise<void>) => void;

declare namespace jest {
  function fn<T = unknown>(impl?: (...args: unknown[]) => T): Mock<T>;
  function clearAllMocks(): void;
  function mock(module: string, factory?: () => unknown): unknown;
  interface Mock<T = unknown> {
    mockResolvedValue(value: T): Mock<T>;
    mockRejectedValue(value: unknown): Mock<T>;
    mockImplementation(fn: (...args: unknown[]) => T): Mock<T>;
    mockReturnValue(value: T): Mock<T>;
  }
}
