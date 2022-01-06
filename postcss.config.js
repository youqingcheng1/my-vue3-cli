module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem':{
      rootValue: 162.4, //133.4:1rem等于133.4px； //100: 1rem等于100px 75:1rem等于75px 设计稿基数 //162.4：1rem 设计稿1624*750
      propWhiteList: ['*'],
      exclude: /pc\S*.scss/,
      minPixelValue: 1 // （数字）设置要替换的最小像素值
    }
  }
}