# rmui-template

### 基本配置

- 多环境配置
- 引入 CDN
- 适配 rem
- [Mock.js](https://github.com/nuysoft/Mock)
- [Vant](https://github.com/youzan/vant)
- [axios](https://github.com/axios/axios)
- [Less](http://lesscss.org/usage/)
- Babel
- Eslint + Pettier 格式化

### 目录说明

    mock        // 本地 mock server
    api         // 接口文件夹
    assets      // 静态资源文件夹
    components  // 公用组件
    config      // 多环境配置
    directive   // 自定义指令
    filters     // 过滤器
    plugins     // 第三方插件
    router      // 路由
    store       // 状态管理
    style       // 公用样式
    utils       // 工具库
    views       // 路由页面

### 命名规范

**Component**

除了``index.vue``, 所有的``Component``文件都是以大写开头 (PascalCase)。

``` 例子：
@/src/components/BackToTop/index.vue
@/src/components/Charts/Line.vue
@/src/views/example/components/Button.vue
```

**JS 文件**

所有的``.js``文件都遵循横线连接 (kebab-case)。

``` 例子：
@/src/utils/open-window.js
@/src/views/svg-icons/require-icons.js
@/src/components/MarkdownEditor/default-options.js
```

**Views**

在views文件下，代表路由的.vue文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。

```
@/src/views/svg-icons/index.vue
@/src/views/svg-icons/require-icons.js
```