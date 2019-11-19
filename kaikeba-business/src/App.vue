<template>
  <div id="app">
    <!-- 顶部栏区域 -->
    <mt-header fixed title="信息化管理">
    <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 路由组建的出口      transition给组件添加渐入渐出效果             -->
      <transition name="fade" mode="out-in">       
          <router-view/>
      </transition>



            <!-- 底部栏 -->
            <!-- <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="home">
              <img slot="icon" src="./assets/index.png">
              首页
            </mt-tab-item>
            <mt-tab-item id="vip">
              <img slot="icon" src="./assets/vip.png">
              会员
            </mt-tab-item>
            <mt-tab-item id="cart">
              <img slot="icon" src="./assets/shop-cart.png">
              购物车
            </mt-tab-item>
            <mt-tab-item id="search">
              <img slot="icon" src="./assets/search.png">
              查找
            </mt-tab-item>
            </mt-tabbar> -->

    <!-- 自己书写底部栏 -->
    <div class="tabBar" >
      <ul>
        <li v-for='(tab,index) in tabs' :key='tab.id'>
        <router-link :to='tab.routerName' exact @click.native ='changeHash(index)' :class='{"link-active":index == currentIndex}'>                       <!--router-link类似于a标签作用，写样式标注a标签 -->
        <img :src="tab.imgSrc" alt=""> 
        <mt-badge size="small" color="red" v-if="index===2">{{pickNum}}</mt-badge>
        <p>{{tab.title}}</p>
        </router-link>
        </li>
      </ul>
    </div>



  </div>
</template>


<script>
// 导入assets下的资源
import index from './assets/index.png'
import vip from './assets/vip.png'
import shopcart from './assets/shop-cart.png'
import search from './assets/search.png'
import GoodsTool from '@/GoodsTool'
let tabs = [
  {id:1,title:'首页',imgSrc:index,routerName:{name:'home'}},
  {id:2,title:'会员',imgSrc:vip,routerName:{name:'vip'}},
  {id:3,title:'购物车',imgSrc:shopcart,routerName:{name:'cart'}},
  {id:4,title:'查找',imgSrc:search,routerName:{name:'search'}},
];
export default {
  name: 'App',
  data () {
    return {
      selected:'',
      // fixed:true,
      tabs:tabs,
      currentIndex:0,
      pickNum:0   //购物车  底部栏购物的数量 
    }
  },
  methods:{
    changeHash(index){
      this.currentIndex = index;
    }
  },
  watch:{ //watch  监听单个属性  实时监听
    selected:function (newV,oldV){
      console.log(newV,oldV);  //对应电机的id名
      console.log(this.selected); //查看selected监听的事务
      this.$router.push({name:this.selected}); //渲染命名路由
    }

  },
  created(){
    //绑定事件
    this.$bus.$on('sendPickNum',(data)=>{
      this.pickNum+=data;
    });
    //获取购物车所有总数
    this.pickNum = GoodsTool.getTotalCount()
  }
}
</script>


<style>
*{
  padding: 0;
  margin: 0;
}  
/* 切换组件淡入淡出效果 */
.fade-enter-active,.fade-leave-active{
  transform: opacity 1s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.tabBar{
  width: 100%;
  height: 65px;
  background: #cccccc;
  /* position: absolute; */
  position: fixed;
  bottom: -1px;
  left: 0;
  overflow: hidden;
}
.tabBar ul{
  width: 100%;
  /* overflow: hidden; */
 /* margin-top: -5px; */
}
.tabBar ul li{
  float: left;
  width: 25%;
  height: 55px;
  text-align: center; 
}
.tabBar ul li a{
  display: inline-block;
  width: 100%;
  height: 100%;
  /* padding-top: 10px; */
  position: relative;
  /* margin-top: 10px; */
} 
.tabBar ul li a.link-active{
  background-color:red;
}
.tabBar ul li p{
  font-size: 12px;
}
.tabBar ul li a img{
  width: 25px;
  height: 25px;
  margin-top: 10px;
}
.mint-badge.is-size-small{
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
