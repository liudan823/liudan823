### vue项目开发

#### 一、清除项目无用文件

#### 二、关联远程仓库

#### 三、 去除默认样式 (reset-css || normalize.css)

#### 四、 引入css框架ui库（elementUI）

- npm i element-ui

* 配置

- 如果使用vue-cli3.*以上版本，插件安装element

```
vue add element
```

- 自行安装配置的话，分两种情况，全部引入和按需引入

> 全部引入会增加代码打包体积，按需引入的话可以优化打包体积。

* 按需引入注意事项

.babelrc 是老版本的bable的配置文件
babel.config.js 是新版本的babel的配置文件

#### 登录页面

- 样式编写尽量使用UI框架提供的组件

- AJax请求要封装

- Form表单如何实现验证

- 登录机制-JWT


- Ajax params 传参方法

* 1、手动拼接
* 2、循环拼接
* 3、qs库

- 表单验证（async-validator）
* 1、标准的验证
* 2、自定义验证规则

- Ajax封装

- 基本api
- axios拦截器
- localstorage 持久化
- token 理解
- elementui布局
- vuex知识回顾