<template>
  <div>
        <!-- 轮播图-->
    <mt-swipe :auto="3000" :style="{height:myHeight}" class="swiper">
        <mt-swipe-item v-for='(item,index) in imgs' :key='index'>   
            <img :src="item.src || item.img" alt=""/>
        </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
// 模块机制导入 轮播图
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
var imgs = [
    {id:1,src:banner1},
    {id:2,src:banner2},
    {id:3,src:banner3}
]
export default {
    name:'MySwiper',
    data(){
        return {
            imgs:[]
        };
    },
    props:['url','myHeight'],
                // created(){
                //     this.$axios.get(this.url)
                //     .then(res=>{
                //         console.log(res.data.message);
                //         this.imgs = res.data.message;    //请求获取数据以后即可渲染页面
                //     })
                //     .catch(err=>{
                //         console.log('轮播图数据异常',err);
                //     })
                // }
}
</script>

<style lang="css" scoped>
img{
    width: 100%;
}
</style>
