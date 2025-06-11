module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
    ignore: [
      /node_modules\/react-native\/.*\.js/
    ],
  };
};
