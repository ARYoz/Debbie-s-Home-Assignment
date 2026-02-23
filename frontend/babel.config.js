module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Reanimated plugin removed so web build works without react-native-worklets.
    // Add back "react-native-reanimated/plugin" (must be last) if you use Reanimated animations on native.
    plugins: [],
  };
};
