const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // punto de entrada para la página
      entry: 'src/main.js',
      // el título del documento
      title: 'Mi App Tangle',
    },
  },
})
