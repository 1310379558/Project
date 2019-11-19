// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'   //引入axios

import Moment from 'moment'  //导入三方时间处理库

Vue.config.productionTip = false

//使用mint-ui引入全部组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'  //引入样式
Vue.use(MintUI)

//配置axios
Vue.prototype.$axios = Axios;  //挂载到原型上去

//引入自己书写全局css样式
import '../static/css/global.css'

//配置公共URL  后台给的
// Axios.defaults.baseURL = 'https://www.sinya.online/api/';
// Axios.defaults.baseURL='http://127.0.0.1:8899/api/';  

//配置图片查看器插件 引入并使用
import VuePreview from 'vue-preview'
Vue.use(VuePreview);   //内部会运行 Vue.compomemt('vue-preview',{})

//注册全局导航栏组件
import Navbar from '@/components/Common/Navbar'
Vue.component(Navbar.name, Navbar);

//注册全局评论组件
import Comment from '@/components/Common/Comment'
Vue.component(Comment.name, Comment);

//注册全局轮播组件
import MySwiper from '@/components/Common/MySwiper'
Vue.component(MySwiper.name, MySwiper );

//自定义moment全局过滤器  对时间处理   时间.格式化
Vue.filter('converTime', function (data, formatStr) {
  return Moment(data).format(formatStr);
});
Vue.filter('relativeTime', function (data) {
  return Moment(data).formatNow();
});

//设置Moment库中文显示时间
Moment.locale('zh-cn');

//控制字数显示
Vue.filter('controllShow', function (str, num) {
  //如果当前字符串长度小于num，返回原值
  if (str.length <= num) {
    return str;
  }
  //如果字符串长度大于num，则截取0-num-1位
  if (str.length > num) {
    return str.substr(0, num - 1) + '...';
  }
});

//添加请求拦截器
Axios.interceptors.request.use(function (config) {
  //在发送请求之前做一些事情

  //加载提示框
  // MintUI.Indicator.open({                     //网速差的时候  提示正在加载
  //   text:'玩命加载中...'
  // });
  return config;
}, function(error) {
  //做一些有请求错误的事情
  return Promise.reject(error);
});

//添加响应拦截器
Axios.interceptors.response.use (function(response) {
   //关闭加载提示框
   MintUI.Indicator.close();               //当页面资源加载完成 关闭提示
  //使用响应数据返回响应；
} ,function (error) {
  //使用响应错误返回
  Promise.reject(error);
});

//将bus对象挂载到Vue的原型上  公交车对象
import EventBus from './EventBus.js'
Vue.prototype.$bus = EventBus;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/> '
})
