import path from 'path'
import glob from 'glob'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const dev = process.env.NODE_ENV !== 'production'

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: Object.fromEntries(glob.sync('src/**/script.js').map(file => [path.basename(path.dirname(file)), path.resolve(__dirname, file)])),
  output: {
    filename: '[name]/script.js',
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            // Enable it for the standard Webpack compilation flow (test: /\.s?css$/)
            emitCss: true,  // Default: false
            // Enable HMR only for dev mode
            hotReload: dev,  // Default: false
            compilerOptions: {
              // Svelte's dev mode MUST be enabled for HMR to work
              dev,  // Default: false
            },
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: /^!|@preserve|@license|@cc_on|@author/i,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '[name]/index.html',
      title: '',
      meta: [
        {'charset': 'utf-8'},
        {'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge'},
      ],
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/style.css',
    }),
  ],
  devServer: {
    // Root directory
    contentBase: path.resolve(__dirname, 'dist'),
    // Enable HMR
    hot: true,
    // Open the browser after server had been started
    open: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
}