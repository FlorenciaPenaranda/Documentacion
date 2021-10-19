/** @format */

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    plugins: [
        new webpack.DefinePlugin({
            SERVICE_LOGIN_URL: JSON.stringify("http://200.80.227.180/documentacion"),
            /*SERVICE_LOGIN_URL: JSON.stringify("https://www.uocra.net/intranet/promocionsocial/MotivosCategorias"),*/
            SERVICE_URL: JSON.stringify("http://200.80.227.180/Documentacion"),
            SERVICE_CA_URL: JSON.stringify("http://localhost/CentroAutorizador"),
        }),
    ],
});
