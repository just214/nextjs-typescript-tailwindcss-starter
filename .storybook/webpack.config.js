const path = require("path");

module.exports = baseConfig => {
  baseConfig.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]]
      }
    },
    {
      test: /\.css$/,
      include: path.resolve(__dirname, "../"),
      use: ["style-loader", "css-loader", "postcss-loader"]
    }
  );

  baseConfig.resolve.extensions.push(".ts", ".tsx");
  return baseConfig;
};
