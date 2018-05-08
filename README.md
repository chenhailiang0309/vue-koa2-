# shop

> A Vue.js project

#笔记
1、打包时 图片都不显示  使用require方式引入
    ```
        <img :src="locationIcon">

        data() {
            return {
                locationIcon:require('../../assets/images/location.png')
            }
        }
    ```
2、轮播图 图片懒加载   谷歌浏览器 设置slow 3G   组件中的点会超出 给组件父元素设置最大高度（图片高度未知，也可能是经常改变图片宽高）

3、https://www.easy-mock.com/    mock数据
4、全局引入axios
    ```
        import axios from 'axios'
        Vue.prototype.$http = axios

        this.$http({
            url: 'https://www.easy-mock.com/mock/5aeeafc4ee70f3596f06e50d/vue+koa2-shopping/index',
            method: 'get'
          })
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
    ```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
