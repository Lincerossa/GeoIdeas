module.exports = {

  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "index.js"
  },

  module: {
    rules: [
      {
        test: /\.(js||jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
};
