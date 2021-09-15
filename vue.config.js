module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '^/address/': {
        target: 'https://tophats.website/address/',
        changeOrigin: true
      }
    }
  }
}
