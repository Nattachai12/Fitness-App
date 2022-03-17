const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCSS = require("mini-css-extract-plugin");
const imgPath = "./client/components/bird";
// const imageminGifsicle = require("imagemin-gifsicle");
// const imageminPngquant = require("imagemin-pngquant");
// const imageminSvgo = require("imagemin-svgo");
// const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = {
  //
  mode: process.env.NODE_ENV,

  //indeicate where webpack should be building this
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    // assetModuleFilename: "assets/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            //bundle all file together
            loader: "babel-loader",
            //Transform JS and react to ES5
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        //style-loader inject CSS into the DOM.
        //css-loader - Translates CSS into CommonJS
        //sass-loader - Compiles Sass to CSS
        use: [miniCSS.loader, "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.(jpg|txt)$/,
      //   include: path.resolve(__dirname),
      //   type: "asset/resource",
      //   generator: {
      //     filename: "assets/[name][ext]",
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./client/index.html" }), new miniCSS()],

  devServer: {
    static: {
      publicPath: "/build",
      directory: path.resolve(__dirname, "build"),
    },
    port: 8080,
    proxy: {
      "/api/leaders": "http://localhost:3000",
    },
  },
};
