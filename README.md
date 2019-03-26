# vue-easyrefresh

[![License](https://img.shields.io/badge/license-MIT-green.svg)](/LICENSE)
[![Awesome Flutter](https://img.shields.io/badge/Awesome-Vue-orange.svg)](https://vuejs.org)
[![Pub](https://img.shields.io/badge/npm-v1.0.1-orange.svg)](https://www.npmjs.com/package/vue-easyrefresh)

## [English](https://github.com/xuelongqy/vue-easyrefresh/blob/master/README_EN.md) | 中文

正如名字一样，EasyRefresh很容易就能在基于Vue的Web应用上实现下拉刷新以及上拉加载操作，支持主流的PC和移动浏览器。它的功能灵感来源于与Android的SmartRefreshLayout，同样也吸取了很多三方库的优点。EasyRefresh中集成了多种风格的Header和Footer，但是它并没有局限性，你可以很轻松的自定义，做到你想要的任何样子。使用Html强大的动画，甚至随便一个简单的控件也可以完成。EasyRefresh的目标是打造一个强大，稳定，成熟的下拉刷新框架。

App版本移步：[flutter_easyrefresh](https://github.com/xuelongqy/flutter_easyrefresh)

## 特点功能:

 - 支持越界回弹效果
 - 支持自定义并且已经集成了很多炫酷的 Header 和 Footer
 - 支持下拉刷新、上拉加载(可自动)
 - 支持触发刷新和加载
 - 支持 Header 和 Footer 列表嵌入以及视图浮动两种形式
 - 支持列表事件监听，制作任何样子的 Header 和 Footer，并且能够放在任何位置
 
## 传送门

 - [属性文档](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/cn/PROPERTY.md)
 - [常见问题](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/cn/FAQ.md)
 - [更新日志](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/cn/CHANGELOG.md)
 - [自定义Header和Footer](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/cn/CUSTOM_HEADER_FOOTER.md)

## Demo
[https://xuelongqy.github.io/vue-easyrefresh](https://xuelongqy.github.io/vue-easyrefresh)

![](https://raw.githubusercontent.com/xuelongqy/vue-easyrefresh/master/art/image/demo_QRCode.png)
 
## 简单用例
#### 1.安装vue-easyrefresh
```
// 使用命令安装
npm install vue-easyrefresh -S
或者
yarn add vue-easyrefresh

// 使用package.json
"dependencies": {
  "vue-easyrefresh": "version",
  ....
}
```
#### 2.引入 EasyreFresh
```javascript
import Vue from 'vue'
import EasyRefresh from 'vue-easyrefresh'
Vue.use(EasyRefresh)
```
#### 3.使用 EasyreFresh
```javascript
<EasyRefresh
    :userSelect="false"
    :onRefresh="onRefresh"
    :loadMore="loadMore">
    <!-- 列表内容 -->
</EasyRefresh>
<!-- 更多使用方法请参考Example -->
```

## 使用指定的 Header 和 Footer
```html
<EasyRefresh
        :userSelect="false"
        :onRefresh="onRefresh"
        :loadMore="loadMore">
    <template v-slot:header>
        <MaterialHeader/>
    </template>
    <StripeList :count="itemCount"/>
    <template v-slot:footer>
        <MaterialFooter/>
    </template>
</EasyRefresh>
<!-- 注：<template v-slot:header>为vue2.6后的语法，仍然可以使用<MaterialHeader slot="header"/> -->
```

# 捐赠
如果你喜欢我的项目，请在项目右上角 "Star" 一下。你的支持是我最大的鼓励！ ^_^
你也还可以扫描下面的二维码，或者通过[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=334PPRBZTY3J8&source=url)，对作者进行打赏。  

![](https://raw.githubusercontent.com/xuelongqy/donation/master/pay_alipay.jpg?raw=true) ![](https://raw.githubusercontent.com/xuelongqy/donation/master/pay_wxpay.jpg?raw=true) ![](https://raw.githubusercontent.com/xuelongqy/donation/master/pay_tencent.jpg?raw=true)

如果在捐赠留言中备注名称，将会被记录到列表中~ 如果你也是github开源作者，捐赠时可以留下github项目地址或者个人主页地址，链接将会被添加到列表中起到互相推广的作用  
[捐赠列表](https://github.com/xuelongqy/donation/blob/master/DONATIONLIST.md)

### QQ讨论群 - 623262733
#### 进群须知
这个群不仅仅是解决EasyreFresh的问题，任何Vue.js相关的问题都可以进行讨论。正如它的名字一样，有问必答，只要群主有时间，都会帮大家一起解决问题。

## 感谢
[vue-scroller](https://github.com/wangdahoo/vue-scroller)   
[SmartRefreshLayout](https://github.com/scwang90/SmartRefreshLayout)  

## 开源协议
 
```
 
MIT License

Copyright (c) 2019 xuelongqy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 
 ```
