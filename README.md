# itcast_manager_project

#### 使用vue-cli创建项目

#### 使用element-ui框架

- 1.下载
- 2.在main.js引入



## 登录

#### 实现界面效果

##### 创建当文件组件

- 添加一个存放用户组件的文件夹 ：views
- 添加登录单文件组件 ：@/views/ login.vue

##### 下载引入路由

- 添加一个存放路由的文件夹 ： router
- 添加封装路由的文件 ： @/router/router.js

##### 进行路由的配置

##### 使用element-ui的组件引入适合的表单

- 1.写入登录页面样式‘
- 2.对引入的代码进行筛选整理
- 3.寻找输入框加入图标的方法
- 3.要对当前登录的提交进行2次验证,如果不正确会弹框



#### 实现功能

##### 在填写无误时,发送请求验证账号

- 1.封装axios  ---@/utils/myaxios.js

- 2.添加一个存放api(验证接口方法)的文件夹 ： api

- 增加登录验证的发送请求文件 : @/api/login.js

   1.在此文件引入axios

  2.添加登录验证的方法--要记得return axio

- 在login.vue引用login.js请求方法

  1.要在数据库添加数据

  2.要开启服务器

  3.在成功登录的状态下,跳转到主页

  4.在登录成功的状态下,设置状态模式

- 添加主页单文件组件 ： @/views/home.vue

##### 设置导航守卫

1.登录页面不需要返回登录页面

2.已经登录的状态也不需要返回登录页面

##### 设置主页面结构

- 在element-ui找到合适的布局复制结构

### 

## 首页

> @/views/home.vue

#### 左侧菜单栏

- 在element-ui找到合适的菜单栏
- 设置需要增加的属性
- 增加图片logo

#### 头部栏

- 添加字体图标,标题,退出

#### 主体

>@/views/welcome.vue

主体是home组件的子组件

设置一开始的主页的默认主题是这个主体组件

由于后续的跳转都是在主体进行的,因此此时的主体可以作为根组件,需要添加router-view展示区域

### 用户列表

>添加一个存放用户列表所需的组件 @/users/users.vue
>
>用户列表分为4个部分
>
>1.面包屑导航
>
>2.搜索框和添加按钮
>
>3.表格明细
>
>4.分页

要单击菜单栏的实行跳转组件,需要设置菜单栏的属性route为true,后续通过index作为path进行路由跳转  index="/home/users"

在element-ui寻找合适的面包屑导航

在element-ui寻找合适的搜索框和按钮

在element-ui寻找合适的表格

使用自定义列模板添加用户状态和操作