/**
 * Wraps nativewind/babel and removes react-native-worklets/plugin from plugins
 * when the package is not installed (Reanimated 3 + Expo 52).
 * Prevents "Cannot find module 'react-native-worklets/plugin'" on web and Android.
 */
const nativewindBabel = require("nativewind/babel");
module.exports = function (api, options) {
  const config = typeof nativewindBabel === "function" ? nativewindBabel(api, options) : nativewindBabel;
  if (config.plugins) {
    config.plugins = config.plugins.filter(
      (p) => (Array.isArray(p) ? p[0] : p) !== "react-native-worklets/plugin"
    );
  }
  return config;
};
