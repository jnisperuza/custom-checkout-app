const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const envName = env.prod ? 'prod' : env.qa ? 'qa' : env.dev ? 'dev' : 'dev';
  const isProd = envName === 'prod';

  return {
    mode: 'production',
    entry: { 
      ['checkout6-custom']: path.resolve(__dirname, './src/index.tsx'),
      ['checkout-confirmation4-custom']: path.resolve(__dirname, './src/index.tsx'),
    },
    devtool: !isProd ? 'source-map' : false,
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
      new Dotenv({
        path: `environments/.${envName}.env`,
      }),
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
  };
};
