# zeaoui

> 前端Vue组件库，基于 Element-UI 二次封装

## 安装方式

```bash
#npm
npm install zeaoui --save
```

## 运行模式

``` bash
#clone code
git clone https://github.com/porky-chen/zeaoui.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 文件目录说明
```bash
###########目录结构描述
├── README.md                   // 说明文档   
├── src                         // 组件代码src   
   ├── main.js                  // 组件入口    
   ├── assets                   // 资源文件夹 如果组件没有其对应的文件夹 资源放这个文件夹下
   ├── sass                     // sass样式文件夹  存放组件样式
   ├── mixins                   // 公用方法文件夹 mixins引入vue页面
   ├── components               // 组件代码文件夹  组件的代码放这个文件夹下  
        ├── index.js            // 打包入口  
   ├── App.vue                  // vue项目源
├── .gitignore                  // 忽略文档
├── config                      // webpack.config.js配置文件
├── build                       // webpack.config.js配置文件
├── static                      // 静态文件
├── test                        // 测试文件
├── .eslintrc.js                // eslin规则
├── node_modules                // 加载包
├── package.json                // 包依赖项
├── index.html                  // web静态资源加载      
├── 更新说明.txt                 // 更新文档     

```
## 上传npm
```bash
# 登录账号，验证邮箱
npm login

#更新版本
npm version patch

#发布npm官网
npm publish --access public

#撤包
npm deprecate <pkg>[@<version>] <message>

#root problems add --force
```

## 更新文档
```bash
#可查看-更新说明.txt
```