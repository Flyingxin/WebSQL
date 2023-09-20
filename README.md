## 简介
  这是利用Vue + WebSQL创建的单机离线项目demo
    附加：导出word、调用c语言自定义函数功能
## 版本
  <p> node: v16.17.0</p>
  <p> npm : v6.14.14</p>
  <p> vue : v2.6.14</p>
  <p> vuex : v3.6.2</p>
  <p> vue-router : v3.6.5</p>

## 调用c语言自定义函数功能
```
1、安装emcc环境
  git clone https://github.com/juj/emsdk.git
  cd emsdk
  # 在 Windows 上（在cmd中不行，可以在git bash界面）
  emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
  emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

  启动emcc（无法启动可到emsdk点击 -> emcmdprompt.bat）
  emsdk_env.bat
2、编译c文件
  按照c的编译模板文件
  执行指令： emcc seuif97.c -o seuif97.js -s EXPORTED_FUNCTIONS="['_test']"  
  seuif97为文件名、 导出_test自定义函数

  生成-->seuif97.js 和 seuif97.wasm（二进制文件）
  并在js文件最底下写---> export default Module
3、调用函数
  vue.config配置好fs、NodePolyfillPlugi、CopyWebpackPlugin插件
  vue文件中导入seuif97.js文件
  初始化Module
  调用_test()自定义函数
```
## 导出word
```
导出word有两种方法
  1、 特定模板word，通过第三方库的插值语法格式生成word（不推荐、离线项目存在跨域，需开启代理服务器）
  2、 通过base64、Bolb等等转换生成word文件
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Author
  ccyx @2023/08/31
