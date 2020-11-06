module.exports = {
  // 配置stylelint，css语法检测自动修复
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: true, // boolean (default: true)
    },
  },

  // test: /\.scss$/,
  //   loader: 'sass-loader!style-loader!css-loader',
  //   options: {
  //   loaders: {
  //     scss: 'vue-style-loader!css-loader!sass-loader',
  //       sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
  //   },
  // },
};
