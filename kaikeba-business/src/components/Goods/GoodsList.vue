<template>
    <div>
        <Navbar title="商品列表" />
        <div class="page-loadmore">
            <div class="page-loadmore-wrapper" ref="wrapper"  >  <!--  :style="{height:wrapperHeight + 'px'}"   -->
                <mt-loadmore :bottom-method="loadBottom" @bottom-status-change = "handleBottomChange" 
                 ref="loadmore" >  <!--:auto-fill="autoFill" -->                        <!-- :bottom-all-loaded = "allLoaded"  -->
                <!-- < mt-loadmore :bottom-method=“loadBottom” @ bottom-status-change=“handleBottomChange” 
                ：bottom-all-loaded = “allLoaded”  ref = “loadmore” > -->
                <ul class="page-loadmore-list">
                                                                                <!-- <li v-for="(goods,index) in goodsList" :key="index">
                                                                                    <router-link :to='{name:"good.detail",params:{id:goods.id}}'>
                                                                                        <img  :src="goods.imgSrc" alt="">
                                                                                        <div class="title">好东西  {{goods.title | controllShow(14) }} 控制字符长度过滤使用</div>
                                                                                        <div class="desc">
                                                                                            <div class="sell">
                                                                                                <span>￥ 88</span>
                                                                                                <s>￥ 999999</s>
                                                                                            </div>
                                                                                            <div class="detail">
                                                                                                <div class="hot">
                                                                                                    热卖中
                                                                                                </div>
                                                                                                <div class="count">
                                                                                                    仅剩66件
                                                                                        
                                                                                                </div>
                                                                                        </div>
                                                                                        </div>
                                                                                    </router-link>
                                                                                </li> -->
                    <li v-for="goods in goodsList" :key="goods.id">
                         <router-link :to='{name:"good.detail",params:{id:goods.id}}'>
                            <img :src="goods.img" alt="" >
                            <div class="title">{{goods.title}}</div>
                            <div class="desc">
                                <div class="sell">
                                    <span> ￥666</span>
                                    <s>￥ 998</s>
                                </div>
                                <div class="detail">
                                    <div class="hot">
                                        热卖中
                                    </div>
                                    <div class="count">
                                        仅剩66件
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                   
                </ul>
                </mt-loadmore>
            <!-- <  /mt-loadmore> -->
            </div>
        </div>
    </div>
</template>

<script>
import sr1 from '@/assets/shubiao.jpg'
import sr2 from '@/assets/zhaoxianji.jpg'
import sr3 from '@/assets/bijiben.jpg'
import sr4 from '@/assets/shouji.jpg'
import sr5 from '@/assets/jita.jpg'
// var goodsList = [
//     {id:1,title:'鼠标',imgUrl:'sr1'},
//     {id:2,title:'照相机',imgUrl:'sr2'},
//     {id:3,title:'笔记本',imgUrl:'sr3'},
//     {id:4,title:'手机',imgUrl:'sr4'}
// ]
/*
    mt-loadmore中属性

    1.bottomLoad函数
    2.机制bottom Load ：bottom-all-loaded默认为false，可以上拉  true禁止上拉 
    3.auto-fill默认是为true 自动会检测父容器并且调用bottomload直到撑满父容器
    4.pull拉动为满足70px，drop达到70px，loading加载中
    5.loadmore组件对象onBottomLoad()方法通知结束loading进入pull状态 
    6.在组件上写ref，在js中通过this.$refs.xxx获取组建的对象
        通过在普通标签写ref在js中通过this.$refs.xxx获取的是Dom的对象
    7.上拉加载更多的公式
    进入检测机制 ==》 可视 的高度 + 页面卷起的高度 = 设备的高度
*/

export default {
    name:'GoodsList',
    data(){
        return {
            page:this.$route.params.page,
            goodsList:[
                {id:1,title:'鼠标',img:sr1},
                {id:2,title:'照相机',img:sr2},
                {id:3,title:'笔记本',img:sr3},
                {id:4,title:'手机',img:sr4},
                {id:5,title:'吉他',img:sr5}
            ],
            // allloaded:false,
            // wrapperHeight:0,
            // autoFill:false  //设置不自动检测  不主动开启自动检测
        }
    },
    methods:{
        //上拉加载事件
        loadBottom(){
            console.log('菜单上拉了');
            //通知状态发生改变 
            //上拉加载数据
            this.loadGoodsByPage();
            console.log(this.$refs.loadmore);
            // this.$refs.loadmore.onButtomLoad();
        },
        handleBottomChange(status){
            console.log(status);
        },
                            loadGoodsByPage(){
                                this.$axios.get('')    /*  getgoos/?pageindex=${this.page} */
                                .then(res=>{
                                    if(res.data.message.length < 10){
                                        this.$toast('没有数据了');
                                        //如果为true 所有数据都加载完成  禁止上拉
                                        // this.allloaded = true;
                                    }
                                    //上拉判断操作
                                    if(this.page==1){
                                        this.goodsList = res.data.message;
                                    } else {
                                        this.goodsList = this.goodsList.concat(res.data.message);
                                    }
                                    this.page++;
                                    // this.goodsList = res.data.message;
                                })
                                .catch(err=>{
                                    console.log('获取商品数据失败！！！',err);
                                })
                            },
    //          mounted() {   //检测机制 检测高度
    //             this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // }

    },
    created(){
        //加载第一页商品列表数据
        this.loadGoodsByPage();
        // this.$axios.get('getgoos/?pageindex=${this.page}')
        // .then(res=>{
        //     this.goodsList = res.data.message;
        // })
        // .catch(err=>{
        //     console.log('获取商品数据失败！！！',err);
        // })
    }
}
</script>

<style lang="css" scoped>
/* .mint-loadmore{
    margin-top: 80px;
} */

.page-loadmore{
    /* margin-bottom: 100px; */
    margin-top: 80px;
    /* border: 1px solid red;
    height: 400px; */
}
.page-loadmore-list{
    overflow: hidden;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 80px;
}
.title{
    color: #000;
    text-align: center;
}
.page-loadmore-list li{
    width: 50%;
    float: left;
    /* margin-bottom: 10px;
    margin-left: 5px; */
}

li > a:not(.mui-btn){
    margin: 0px;
    padding:0px;
    border:1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;
}
li > a:not(.mui-btn) img{
    width: 100%;
}
.sell > span {
    float: left;
    color: red;
    text-align: left;
    margin-left: 30px;
}
.detail >.hot{
    float: left;
    text-align: left;
    font-size: 15px;
    margin-left: 30px;
}
.detail >.count{
    float: right;
    text-align: right;
    font-size: 15px;
    margin-right: 10px;
} 

/* 撑开，去除浮动没有的高度 */

.detail{
    overflow: hidden;
}
.desc{
    color: red;
    /* background-color: blueviolet; */
}
img{
    width: 180px;
    height: 200px;
}
 .page-loadmore-listitem{
    border-bottom: 1px solid #eee;
}
.page-loadmore-listitem{
    height: 50px;
    line-height: 50px;
    text-align: center;
}
.page-loadmore-listitem:first-child{
    border-top: 1px solid #eee;
}
.page-loadmore-wrapper{
    overflow: scroll;
    /* height: 200px;
    border: 1px solid yellow; */
}
.mint-loadmore-bottom span{
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle;
}
.mint-loadmore-bottom span.is-rotate{
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
</style>>
