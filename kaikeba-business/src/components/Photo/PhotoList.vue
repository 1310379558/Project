<template>
  <div class="photoList">
      <Navbar title="图文列表"/>
      <div class="category-list">
          <ul>
              <li v-for="(category,index) in categoryList" :key="category.id" @click="categoryHandler(category.id,index)">
                  <a href="javascrip:void(0)" :class='{active:index==currentIndex}'>{{category.title}}</a>
              </li>
              
          </ul>
      </div>

      <!-- 图片展示区域 -->
      <div class="photo-list">
          <ul>
              <li v-for="item in imgList" :key="item.id">
                  <router-link :to="{name:'photo.detail',query:{id:item.id}}">
                      <!-- <img :src="item.img" alt=""> -->
                      <!-- mint-ui懒加载使用 -->
                     <img v-lazy="item.img">
                  </router-link>
                  <p>
                      <span>{{item.title}}</span>
                      <br>
                      <span>{{item.zhaiyao}}</span>
                  </p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
//导入assets下的图片资源
import hu from '@/assets/hu.jpg'
import hu1 from '@/assets/hu1.jpg'
import zhao from '@/assets/zhao.jpg'
import zhao1 from '@/assets/zhao1.jpg'

export default {
 name:'PhotoList',
 data(){
     return {
         categoryList:[
             {id:1,title:'财富排行'},
             {id:2,title:'财富升降'},
             {id:3,title:'财富热论'},
             {id:4,title:'近期名人'},
             {id:5,title:'家居财经'},
             {id:6,title:'企业跌幅'},
             {id:7,title:'企业新增'}
         ],
         imgList:[
            {id:1,img:hu,title:'胡歌',zhaiyao:'1996年，14岁的胡歌便成为上海教育电视台的小主持人，2005年毕业于上海戏剧学院表演系，同年在仙侠剧《仙剑奇侠传》中塑造了“李逍遥”一角，并演唱该剧插曲《六月的雨》《逍遥叹》 [1-2]  。'},
            {id:2,img:hu1,title:'胡歌1',zhaiyao:'2006年8月遭受严重车祸，2007年6月复出 [3]  。2009年主演仙侠剧《仙剑奇侠传三》 [4]  ，并演唱片尾曲《忘记时间》 [5]  。2010年主演的穿越剧《神话》在央视八套播出 [6]  。2011年参演历史题材电影《辛亥革命》提名大众电影百花奖“最佳新人奖” [7-8]  。'},
            {id:3,img:zhao,title:'赵丽颖',zhaiyao:'2006年，因获得雅虎搜星比赛冯小刚组冠军而进入演艺圈 [1]  ；同年，在冯小刚执导的广告片《跪族篇》中担任女主角 [2]  。2011年，因在古装剧《新还珠格格》中饰演晴儿一角而被观众认识 [3]  。2013年，凭借古装剧《陆贞传奇》获得更多关注。'},
            {id:4,img:zhao1,title:'赵丽颖1',zhaiyao:'2015年，主演的仙侠剧《花千骨》打破中国内地周播剧收视纪录 [5]  ，而其个人则凭借该剧先后获得第6届澳门国际电视节金莲花最佳女主角奖、第6届国剧盛典最具收视号召力演员奖、第22届上海电视节白玉兰奖最佳女主角奖提名、第28届中国电视金鹰奖观众喜爱的女演员奖 [6-8]  。'}, 
         ],
         currentIndex:0
     }
 },
 methods:{ 
     categoryHandler(id,index){
         //动态路由跳转
        this.$router.push({name:'photo.list',params:{categoryId:id}})
         this.currentIndex = index;  //点击改变颜色 class状态的监听
     },
     
     //图片封装
    loadImgByCategoryId(id){
        this.$axios.get(''+id)    //发起获取图片数据资源的请求
        .then(res=>{
            this.imgList = res.data.message;
            //点击没数据即可使用mint-ui中的组件 Toast提示信息   icon需要去下载  此处没下载应用 下载后还需去全局引入  
            if(this.imgList.length===0){
                this.$toast({
                    message:'没有图片啦！',
                    inconClass:'iconfont icon-shibail',
                    duration:1000    //限定时间
                });
            }
        })
        .catch(err=>{
            console.log('获取图片数据资源失败',err);
            })
    }
 },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm=>{
        //通过vm访问组件实例
        vm.loadImgByCategoryId(to.params.categoryId);
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(to);
    this.loadImgByCategoryId(to.params.categoryId);  //直接使用上面封装的  获取数据
    next();
  },
created(){
    // console.log(this.$router.params.categoryId);
    
    // this.$axios.get()  //数据获取  分类信息
    // .then(res=>{
    //     this.categoryList = res.data.message;
    //      this.categoryList.unshift("id":0,"title":'全部')  获取全部信息分类
    // })
    // .catch(err=>{
    //     console.log('获取资源失败了',err);
    // });


    //获取第二部分图片信息资源
    //this.loadImgByCategoryId(0);  //获取所有图片资源
}
}
</script>

<style lang="css" scoped>
.category{
    width: 100%;
    height: 40px;
    overflow-x: hidden;
}
.category-list ul{
    width: 100%;
    height: 50px;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    margin-top: 80px;
}
.category-list ul li{
    display: inline-block;
    width: 25%;
    height: 100%;
    font-size: 18px;
    line-height: 40px;
    text-emphasis: center;
}
.category-list ul li a{
    text-decoration: none;
    font-size: 16px;
}
.category-list ul li a.active{
    color:#fc0280;
    }
    .photo-list ul li{
        width: 100%;
        position: relative;
        }
.photo-list ul li a{
    display: block;
    width: 100%;
}
.photo-list ul li a img{
    width: 100%;
    /* height: 100px; */
}
.photo-list ul li p{
    position: absolute;
    bottom: 5px;
    width: 100%;
    /* background-color: rgba(0, 0, 0, 2) */
    /* padding: 5px 0; */
}

.photo-list ul li p span{
    /* color:#e6e6e6; */
    color: white;
    font-size: 16px;
    }
.photoList{
    padding-bottom: 100px;
}
    image[lazy=loading] {     /*图片懒加载样式 */
    width: 40px;
    height: 300px;
    margin:auto;
}
.ico-meiyoutupian{
    width: 50px;
    height: 50px;
}
</style>>
