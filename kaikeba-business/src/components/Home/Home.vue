<template>
  <div id='home'>
      <!-- 轮播图-->
    <mt-swipe :auto="3000" style="height:200px" class="swiper">
        <mt-swipe-item v-for='(item,index) in imgs' :key='index'>   
            <img :src="item.src" alt=""/>
        </mt-swipe-item>
    </mt-swipe>
    <!-- <MySwiper url='getlunbo' myHeight = '250px' />     全局组件轮播图 -->
    <!-- 九宫格 -->
    <div class="list">
        <ul>
            <li v-for='(grid,index) in grids' :key='index'>
                <!-- <a href="javascript:void(0);">
                    <img :src="grid.src" alt="">
                </a> -->
                <!-- 需要实现点击跳转  使用router-link属性 -->
                <router-link :to="grid.router">
                    <img :src="grid.src" alt="">
                </router-link>
                <p>{{grid.title}}</p>   
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
// 模块机制导入 图标
import src1 from '../../assets/xinwenzixun.png'
import src2 from '../../assets/tuwenfenxiang.png'
import src3 from '../../assets/shangpinzixunguanli.png'
import src4 from '../../assets/zixun.png'
import src5 from '../../assets/callmeeting.png'
import src6 from '../../assets/lianxiwomen.png'
// 模块机制导入 轮播图
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
//九宫格
var grids = [
    {id:1,src:src1,title:'新闻资讯',router:{name:'news.list'}},  /*添加点击路由跳转路径*/ 
    {id:2,src:src2,title:'图文分享',router:
            {name:'photo.list',   //点击跳转路由路径
            params:{categoryId:[0]}
            }
    },  //params:{categoryId:[0]}使他一开始加载就获取全部 0

    {id:3,src:src3,title:'商品展示',router:
            {
               
                name:'good.list',
                params:{page:1}
                }
    },
    {id:4,src:src4,title:'资讯',router:{name:'news.list'}},
    {id:5,src:src5,title:'留言反馈',router:{name:'news.list'}},
    {id:6,src:src6,title:'联系我们',router:{name:'news.list'}},

        // {
        //     name:'photo.list',   //点击跳转路由路径  
        //     params:{categoryId:0}
        // }

    // {id:7,src:src1,title:'新闻资讯'},
    // {id:8,src:src2,title:'图文分享'},
    // {id:9,src:src3,title:'商品展示'},
    // {id:10,src:src4,title:'资讯'},
    // {id:11,src:src5,title:'留言反馈'},
    // {id:12,src:src6,title:'联系我们'},
    // {id:13,src:src1,title:'新闻资讯'},
    // {id:14,src:src2,title:'图文分享'},
    // {id:15,src:src3,title:'商品展示'},
]
var imgs = [
    {id:1,src:banner1},
    {id:2,src:banner2},
    {id:3,src:banner3}
]
export default {
    data(){
        return{
            imgs:imgs,
            grids:grids
            
        }
    },
    created(){
        // this.$axios.get('getlunbo')
        // .then(res=>{
        //     console.log(res.data.message);
        //     this.imgs = res.data.message;    //请求获取数据以后即可渲染页面
        // })
        // .catch(err=>{
        //     console.log('轮播图数据异常',err);
        // })
    }
}
</script>

<style lang="css" scoped>   
    /* scoped 限定只对此闭合模块起作用 注入*/
.swiper img{
    width: 100%;
    height: 200px;
    color:red;
}
.list{
    width: 100%;
    height: 100%;
}
.list ul{
    display: flex;
    flex-wrap: wrap;
}
.list ul li {
    width: 33%;
    height: 100px;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}
.list ul li a{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    }
.list ul li a img{
    width: 50px;
}
</style>>