const path = require('path');

module.exports = {
  entry: './src/index.js',         // file đầu vào
  output: {
    filename: 'bundle.js',         // file đầu ra sau khi bundle
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',              // hoặc 'production'
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,       // bạn có thể đổi sang 8080, 5173...
    open: true,       // mở trình duyệt tự động
    hot: true         // reload khi có thay đổi
  }
};
