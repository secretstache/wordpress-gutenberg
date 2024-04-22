const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
    ...defaultConfig,
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "build"),
        libraryTarget: "commonjs2"
    },
    devServer: {
        static: path.resolve(__dirname, "build"),
        hot: true,
        port: 3000
    }
};