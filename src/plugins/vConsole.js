// 开发环境，使用 VConsole 调试
if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole/dist/vconsole.min.js')
  new VConsole()
}
