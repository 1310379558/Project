<template>
<div class="detail">
    <Navbar title="商品详情"></Navbar>
    <div class="outer-swiper">
        <div class="swiper">
           
            我是轮播图呢
            <!-- :url='url' -->
            <MySwiper  myHeight='300px'/> 
        </div>
    </div>
    <div class="product-desc">
        <ul>
            <li>
                <span class="product-desc-span">
                    商品标题
                </span>
            </li>
            <li class="price-li">市场价：
                <s>￥ 999</s> 销售价：<span style="font-size:18px;">￥388</span></li>
            <li class="number-li">购买数量： <span @click="substract"> - </span> <span> {{pickNum}} </span><span @click="add"> + </span> </li>
            <li>
            <mt-button type="primary" size="small">立即购买</mt-button>
                <!-- 给“加入购物车”按钮添加点击事件 -->
            <mt-button type="danger" size="small" @click="ballHandler">加入购物车</mt-button>
            </li>
        </ul>
    </div>
    <transition name="ball" @after-enter='afterEnter'>   <!--实现小球动画  使用vue中的transition组件  -->
         <div class="ball" v-if="isExist"></div>
    </transition>
   
    <div class="product-props"></div>
    <ul>
        <li>商品参数</li>
        <li>商品货号：135613</li>
        <li>库存情况：666件</li>
        <li>上架时间：2019-10-12</li>
        <!-- {{goodsInfo.add-time | converTime('YYYY-MM-DD')}} -->
    </ul>

    <div class="product-info">
        <ul>
            <li>
                <mt-button type="primary" size="small" plain @click.native="showShopInfo">图文介绍</mt-button>
            </li>
            <li>
                <mt-button type="danger" size="small" plain @click.native="shopComment">商品评论</mt-button>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import GoodsTool from '@/GoodsTool'
var goodsInfo = [
                {id:1,'add-time':2019-10-13,stockNum:999}
            ]
export default {
    name:'GoodsDetail',
    data(){
        return {
            // url:'getthumImages/${this.$route.parans.id}',
            goodsInfo:[
                 {id:1,'add-time':2019-10-13,stockNum:999}
            ],
            pickNum:1,
            isExist:false,  //默认小球隐藏 
    
        };
    },
    methods:{
        
        //小球进入之后  让小球隐藏
        afterEnter(){
            this.isExist = false;
               //向父传递  使用bus  触发公交车bus绑定事件
            this.$bus.$emit('sendPickNum',this.pickNum)
            //将添加到购物车的数据，保存到本地存储对象中
            GoodsTool.add({
                id:this.goodsInfo.id,
                num:this.pickNum
            });
        },
        //加入购物车  小球飞下去效果
        ballHandler(){
            //让小球显示  执行transition动画
            this.isExist= true;
         
        },

        //购买数量 ++    小于库存数才可以++
        add(){
            console.log(this.pickNum);
            console.log(this.goodsInfo.stockNum);
            if(this.pickNum < 99){   //console.log(this.goodsInfo.stockNum);
                this.pickNum ++;
            }
        },
        //购买数量 -- 大于一件  才可以减  最少一件
        substract(){
            if(this.pickNum === 1){
                return;
            }
            this.pickNum--;
        },
        shopComment(){
            this.$router.push({
                name:'good.comment',
                query:{
                    id:this.$router.params.id
                }
            })
        },
        showShopInfo(){
            //通过动态路由进行跳转
            this.$router.push({
                name:'photo.info',
                query:{
                    id:this.route.parmas.id
                }
            })
        }
    },
    created(){
        // this.url = 'getthumImages'
        this.$axios.get('')   //goods/getinfo/${this.$route.params.id}
        .then(res=>{
            this.goodsInfo = res.data.message[0];
        })
        .catch(err=>{
            console.log('获取库存数据失败了',err);
        })

    }
}
</script>

<style lang="css" scoped>
.detail{
    margin-bottom: 65px;
}
.ball-enter-active{
    /*给一秒的事件让小球进入动画效果 */
    animation: bounce-in 1s;
}
.ball-leave{
    /* 元素进入以后，透明度为0，整个动画都是0*/
    /*元素默认是1 所以会闪一下，设置为0 */
    opacity:0 ;
}
@keyframes bounce-in {
    0%{
        transform: translate3d(0,0,0)
    }
    50%{
        transform: translate3d(140px,-50px,0)
    }
    75%{
        transform: translate3d(160px,0,0)
    }
    100%{
        transform: translate3d(140px,300px,0)
    }
}

.swiper{
    border: 1px solid yellow;
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
    margin-top: 40px;
}
.outer-swiper,
.outer-desc,
.outer-props,
.outer-info{
    border-radius: 5px;
    border: 1px solid red;
    margin: 3px;
}

.outer-swiper ul,
.outer-desc ul,
.outer-props ul,
.outer-info ul{
    padding:0;
}

.product-desc ul li,
.product-info ul li,
.product-props ul li{
    list-style: none;
    font-size: 15px;
    color: purple;
    margin-top: 8px;
}
.product-desc ul >:nth-child(1) span{
    color: blue;
    font-size: 18px;
    font-weight: bold;
}
.product-desc ul >:nth-child(1){
    border-bottom: 1px solid red;
}
.product-desc ul,
.product-info ul,
.product-props ul{
    padding-left: 10px;
}
.price-li span{
    color-adjust: yellow;
    font-size: 25px;
}
.price-li s{
    margin-right: 16px;
}
.number-li span{
    text-align: center;
}
.number-li >:nth-child(2){
    width: 40px;
}
.ball{
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}

</style>