const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
    ...defaultConfig,
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: __dirname + "/build",
        libraryTarget: "commonjs2"
    }
};
