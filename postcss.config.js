module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    new : HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
      css: [
        'index.css',
        'Forms.css'
      ]
    })
  },
}
