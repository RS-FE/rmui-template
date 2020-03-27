// VConsole 调试
import VConsole from 'vconsole'
if (process.env.NODE_ENV !== 'production') {
  new VConsole()
}
