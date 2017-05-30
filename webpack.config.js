/**
 * Created by wanrenya on 2017/2/24.
 */
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app:'./src/main.js',
    vendor:['element-ui']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'admin.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // ,
        // options: {
        //   loaders: {
        //     css: ExtractTextPlugin.extract({
        //       loader: 'css-loader',
        //       fallbackLoader: 'vue-style-loader'
        //     })
        //   }
        // }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //include: path.resolve(__dirname, '../'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions:['.js','.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'element-ui.js'})
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#cheap-module-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
