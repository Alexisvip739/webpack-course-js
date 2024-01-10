// Importar el módulo 'path' para manejar rutas de archivos
const path = require('path');

// Importar módulos de plugins de Webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// Configuración de Webpack
module.exports = {
     // Punto de entrada de la aplicación
     entry: "./src/index.js",


     // Configuración de salida
     output: {
          path: path.resolve(__dirname, "dist"),
          filename: "[name].[contenthash].js",
          assetModuleFilename: "assets/images/[hash][ext][query]"
     },
     mode: 'development',
     watch: true,
     // Configuración de resolución de extensiones
     resolve: {
          extensions: [".js"],
          alias: {
               //establecemos las configuracion de los alias para los path de los archivos
               '@utils': path.resolve(__dirname, 'src/utils/'),
               '@templates': path.resolve(__dirname, 'src/templates/'),
               '@styles': path.resolve(__dirname, 'src/styles/'),
               '@images': path.resolve(__dirname, 'src/assets/images/'),


          }
     },

     // Configuración de reglas para módulos
     module: {
          rules: [
               // Configuración para transpilar JavaScript con Babel
               {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                         loader: "babel-loader"
                    },
               },
               // Configuración para manejar estilos CSS
               {
                    test: /\.css$/,
                    use: [
                         MiniCssExtractPlugin.loader,
                         'css-loader'
                    ]
               },
               // Configuración para manejar imágenes
               {
                    test: /\.png/,
                    type: "asset/resource"
               },
               // Configuración para manejar fuentes tipo WOFF y WOFF2
               {
                    test: /\.(woff|woff2)$/,
                    use: {
                         loader: 'url-loader',
                         options: {
                              limit: 1000,
                              mimetype: 'application/font-woff',
                              name: "[name].[contenthash].[ext]",
                              outputPath: "./assets/fonts/",
                              publicPath: "../assets/fonts/",
                              esModule: false,
                         }
                    }
               }
          ]
     },

     // Configuración de plugins de Webpack
     plugins: [
          // Plugin para generar el archivo HTML
          new HtmlWebpackPlugin({
               inject: true,
               template: "./public/index.html",
               filename: "./index.html"
          }),

          // Plugin para extraer y minificar estilos CSS
          new MiniCssExtractPlugin({
                    filename: 'assets/[name].[contenthash].css',
               }
          ),

          // Plugin para copiar archivos estáticos (imágenes, etc.)
          new CopyPlugin({
               patterns: [
                    {
                         from: path.resolve(__dirname, "src", "assets/images"),
                         to: "assets/images"
                    }
               ]
          }),
          new Dotenv(),
     ],

};
