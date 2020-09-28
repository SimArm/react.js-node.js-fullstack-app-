
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    alias: {
            'components': path.resolve(__dirname, 'src/components'),
          },
    extensions: ['.jsx', '.js', '.scss', '.json']
  },

  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use : {
        loader : 'babel-loader',
        options : {
            presets : ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
              sassOptions: { includePaths }
            }
        }]
    }
    ]
  }
};

// module.exports = {
//   resolve: {
//     alias: {
//       'components': path.resolve(__dirname, 'src/components'),
//     },
//     extensions: ['.jsx', '.js', '.scss', '.json'],
//   },
// };
