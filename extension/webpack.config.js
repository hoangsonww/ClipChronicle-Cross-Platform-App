const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    background: "./src/background/index.ts",
    content: "./src/content/index.ts",
    popup: "./src/popup/index.tsx",
    options: "./src/options/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "public", to: "public" },
      ],
    }),
    new HtmlPlugin({
      filename: "popup.html",
      template: "src/popup/popup.html",
      chunks: ["popup"],
    }),
    new HtmlPlugin({
      filename: "options.html",
      template: "src/options/options.html",
      chunks: ["options"],
    }),
  ],
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 5173,
    devMiddleware: { writeToDisk: true },
    open: false,
  },
};
