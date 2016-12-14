'use strict'
const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR         = path.resolve(__dirname, 'dist');
const APP_DIR           = path.resolve(__dirname, 'src');


module.exports = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: '/js/[name].js',
  },
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ReactJS Hello World',
      xhtml: true,
      inject: true,
      template: require('html-webpack-template'),
      appMountId: 'root-container',
      scripts: [
      //   // "/socket.io/socket.io.js"
      //   // "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzVkLA7e6e-kwBRasdSM90ZQif2NN64OA"
      //   window.fbAsyncInit = function() {
      //     FB.init({
      //       appId      : process.env.CLIENT_ID,
      //       xfbml      : true,
      //       version    : 'v2.8'
      //     });
      //     FB.AppEvents.logPageView();
      //   };
      //
      //   (function(d, s, id){
      //      var js, fjs = d.getElementsByTagName(s)[0];
      //      if (d.getElementById(id)) {return;}
      //      js = d.createElement(s); js.id = id;
      //      js.src = "//connect.facebook.net/en_US/sdk.js";
      //      fjs.parentNode.insertBefore(js, fjs);
      //    }(document, 'script', 'facebook-jssdk'));

      ]
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true
    })
  ],

  module : {
    include: path.join(__dirname, 'src'),
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.gif$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      }
    ]
  }
};
