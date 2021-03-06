import fs from 'fs/promises'
import path from 'path'
import glob from 'glob'
import sveltePreprocess from 'svelte-preprocess'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import TerserPlugin from 'terser-webpack-plugin'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const dev = process.env.NODE_ENV !== 'production'
const entry = glob.sync('src/**/script.js').map(file => [path.basename(path.dirname(file)), path.resolve(__dirname, file)])
const packages = await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8')

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: Object.fromEntries(entry),
  output: {
    filename: '[name]/script.js',
  },
  // Hot reload will no longer work if the target browser is specified in the browserslist field of the .browserslistrc file or package.json
  // A workaround is to set {target: 'web'}
  // This issue will fix in webpack-dev-server v4
  target: dev ? 'web' : 'browserslist',
  module: {
    rules: [
      // Transpile js svelte helpers
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!svelte)/,
        use: 'babel-loader',
      },
      // Transpile svelte compiled templates
      {
        test: /\.(html|svelte)$/,
        exclude: packages['dependencies'] !== void 0 ? new RegExp(`node_modules\/(?!(${Object.keys(packages['dependencies']).join('|').replace(/\//g, '\\/')})\/).*`) : /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              preprocess: sveltePreprocess({
                defaults: {
                  style: 'scss',
                },
                postcss: !dev && {
                  plugins: [
                    autoprefixer({
                      grid: 'autoplace',
                    }),
                    cssnano(),
                  ],
                },
              }),
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
        ],
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
    ...entry.map(([chunk]) => {
      return new HtmlWebpackPlugin({
        chunks: [chunk],
        filename: `${chunk}/index.html`,
        title: '',
        meta: [
          {'charset': 'utf-8'},
          {'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge'},
        ],
        hash: true,
      })
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