# vue-easyrefresh

[![License](https://img.shields.io/badge/license-MIT-green.svg)](/LICENSE)
[![Awesome Flutter](https://img.shields.io/badge/Awesome-Vue-orange.svg)](https://vuejs.org)
[![Pub](https://img.shields.io/badge/npm-v1.0.2-orange.svg)](https://www.npmjs.com/package/vue-easyrefresh)

## English | [中文](https://github.com/xuelongqy/vue-easyrefresh/blob/master/README.md)

Just like the name, EasyRefresh makes it easy to implement pull-down refresh and pull-up operations on Vue-based web applications, supporting mainstream PCs and mobile browsers. Its function is inspired by Android's SmartRefreshLayout, which also draws on the advantages of many three-party libraries. EasyRefresh integrates a variety of styles of Header and Footer, but it has no limitations, you can easily customize it to do whatever you want. Using Html's powerful animations, even a simple control can be done. The goal of EasyRefresh is to create a powerful, stable, and mature drop-down refresh framework.

App version: [flutter_easyrefresh](https://github.com/xuelongqy/flutter_easyrefresh)

## Features:

 - Support cross-bounce rebound effect
 - Support for customization and has integrated a lot of cool Header and Footer
 - Support pull-down refresh, pull-up loading (automatically)
 - Support trigger refresh and load
 - Support for Header and Footer list embedding as well as view floats
 - Support list event listener, make any look of Header and Footer, and can be placed anywhere
 
## Portal

 - [Properties document](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/en/PROPERTY.md)
 - [FAQ](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/en/FAQ.md)
 - [Change log](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/en/CHANGELOG.md)
 - [Custom Header and Footer](https://github.com/xuelongqy/vue-easyrefresh/blob/master/art/md/en/CUSTOM_HEADER_FOOTER.md)

## Demo
[https://xuelongqy.github.io/vue-easyrefresh](https://xuelongqy.github.io/vue-easyrefresh)

![](https://raw.githubusercontent.com/xuelongqy/vue-easyrefresh/master/art/image/demo_QRCode.png)
 
## Sample
#### 1.Install vue-easyrefresh
```
// Use commands
npm install vue-easyrefresh -S
or
yarn add vue-easyrefresh

// Use package.json
"dependencies": {
  "vue-easyrefresh": "version",
  ....
}
```
#### 2.import EasyreFresh
```javascript
import Vue from 'vue'
import EasyRefresh from 'vue-easyrefresh'
Vue.use(EasyRefresh)
```
#### 3.use EasyreFresh
```javascript
<EasyRefresh
    :userSelect="false"
    :onRefresh="onRefresh"
    :loadMore="loadMore">
    <!-- content goes here -->
</EasyRefresh>
<!-- For more ways to use, please refer to Example -->
```

## Use the specified Header and Footer
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
<!-- Note: <template v-slot:header> is the syntax after vue2.6, you can still use <MaterialHeader slot="header"/> -->
```

# Donation
If you like my project, please in the upper right corner of the project "Star". Your support is my biggest encouragement! ^_^
You can also scan the qr code below or [![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=334PPRBZTY3J8&source=url), donation to Author.

![](https://raw.githubusercontent.com/xuelongqy/donation/master/pay_alipay.jpg?raw=true) ![](https://raw.githubusercontent.com/xuelongqy/donation/master/pay_wxpay.jpg?raw=true) ![](https://raw.githubusercontent.com/xuelongqy/donation/master/pay_tencent.jpg?raw=true)

If in donation message note name, will be record to the list if you are making open source authors, donation can leave when making project address or personal home page, a link will be added to the list have the effect of promoting each other
[Donation list](https://github.com/xuelongqy/donation/blob/master/DONATIONLIST.md)

### QQ Group - 623262733
#### Into the group of instructions
The group is not only solve the problem of EasyreFresh, any Flutter related issues can be discussed. Just as its name, craigslist, as long as there is time, group of Lord will help you solve problems together.

## Thanks
[vue-scroller](https://github.com/wangdahoo/vue-scroller)   
[SmartRefreshLayout](https://github.com/scwang90/SmartRefreshLayout)  

## Open source licenses
 
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
