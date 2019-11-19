import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//引入
import Home from '@/components/Home/Home'  //导入首页组件
import Vip from '@/components/Vip/Vip'    //导入VIP组件
import Cart from '@/components/Cart/Cart' //导入购物车组件
import Search from '@/components/Search/Search'     //导入查询组件
import NewsList from '@/components/News/NewsList'    //导入新闻列表组件
import NewsDetail from '@/components/News/NewsDetail'  //导入新闻详细内容组件
import PhotoList from '@/components/Photo/PhotoList'      //导入图文分享列表组件
import PhotoDetail from '@/components/Photo/PhotoDetail'      //导入图文分享详细内容组件
import GoodsList from '@/components/Goods/GoodsList'     //导入商品信息列表
import GoodsDetail from '@/components/Goods/GoodsDetail'     //导入商品购物车详细信息列表
import GoodsComment from '@/components/Goods/GoodsComment'     //导入商品评论组件

//使用vue-router插件  vue.prptptype.$router = Router; 类似添加嗲到原型，全局  我们this.router即可拿到它
Vue.use(Router)

export default new Router({
  linkActiveClass:'link-active',   //给class加默认样式
    //匹配的路由规则
  routes: [
    {
      path:'/',
      redirect:'/home'   //重定向第一页面
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
    //新闻列表
    ,{
      path: '/news/list',
      name: 'news.list',
      component: NewsList
    }
    //新闻列表详细内容
    ,{
      path: '/news/detail',
      name: 'detail',
      component: NewsDetail,
      props:{
        title:'新闻详情'
      }
    }
    //图文分享
    ,{
      path: '/photos/list/:categoryId',  //动态匹配路由
      name: 'photo.list',
      component: PhotoList
    },
    {
      path: '/photos/list/detail',  //图文分享详细内容
      name: 'photo.detail',
      component: PhotoDetail
    },
    {
      path: '/goods/list/:page',  //  商品列表  :动态匹配
      name: 'good.list',
      component: GoodsList
    },
    {
      path: '/goods/detail/:id',       //  商品购物列表详情  :动态匹配
      name: 'good.detail',
      component: GoodsDetail
    },
  {
    path: '/goods/photo/info',       //  商品图文详细介绍
    name: 'photo.info',
    component: NewsDetail,
    props:{
      title:'图文介绍'
    }
  },
  {
    path: '/goods/comment',       //  评论列表组件
    name: 'good.comment',
    component: GoodsComment
  }
  ]
})
