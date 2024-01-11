module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: path.resolve("preprocess.js"),
          },
        ],
      },
    ],
  },
};
