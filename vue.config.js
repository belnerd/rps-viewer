module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://rps-viewer.herokuapp.com/'
  }
}