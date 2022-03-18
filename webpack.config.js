const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  let config;

  if (env.prod) {
    config = { env: 'prod', mode: 'production' };
  } else if (env.qa) {
    config = { env: 'qa', mode: 'development' };
  } else if (env.dev) {
    config = { env: 'dev', mode: 'development' };
  }

  return {
    mode: config?.mode || 'development',
    entry: { ['checkout6-custom']: path.resolve(__dirname, './src/index.tsx') },
    devtool: 'source-map',
    performance: {
      hints: false,
    },
    watchOptions: {
      ignored: ['**/files/**/*.js', '**/node_modules'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|jsx|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false,
                modules: {
                  localIdentName: '[local]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
          use: {
            loader: 'url-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.ts', '.jsx', '.tsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new Dotenv({
        path: `environments/.${config?.env || 'dev'}.env`,
      }),
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
  };
};
