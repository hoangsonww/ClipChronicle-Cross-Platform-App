import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push(
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{ loader: "ts-loader" }],
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
