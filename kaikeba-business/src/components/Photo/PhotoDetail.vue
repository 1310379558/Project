<template>
    <div>
        <Navbar title="图文详情"/>
        <div class="photo-title">
            <p>图片标题</p>
            <span>发起时间：2019-10-12</span>
            <span>88次浏览</span>
            <span>分类：财富热论</span>

            <!-- 缩略图 -->
            <!-- <ul>
                <li v-for='(thumImg,index) in thumImgs' :key="index" >
                    <a href="javascript:void(0)">
                        <img :src="thumImg.src" alt=""/>
                    </a>
                </li>
            </ul> -->
            <!-- //使用插件 设置图片查看器 -->
            <vue-preview :slides="thumImgs"></vue-preview>


            <!-- 详细信息 -->
            <div class="photo-desc">
                    详细内容信息
              <!-- <p v-html='imgInfo.content'> </p>     内容信息 -->
            </div>

            <!-- 评论组件 -->
            <Comment :cid='$route.query.id'/>

        </div>
    </div>
</template>

<script>

import liu from '@/assets/liu.jpg'
import liu1 from '@/assets/liu1.jpg'
import liu2 from '@/assets/liu2.jpg'

var thumImgs = [
        {id:1,src:liu},
        {id:1,src:liu1},
        {id:1,src:liu2},
]
export default {
    
    name:'PhotoDetail',
    data(){
        return {
            imgInfo:[],
            thumImgs:[
                // {id:1,src:liu},
                // {id:1,src:liu1},
                // {id:1,src:liu2},
            ]
        };
    },
    
    created(){   //并发执行请求
    // let id = this.$route.query.id;
    // //获取图文详情
    //     var getImageInfo= ()=>{
    //         return this.$axios.get(''+id);   //getimageinfo/
    //         //如果使用普通函数申明 当前this为undefined，建议使用箭头函数改变当前this指向
    //     }
    //     //获取缩略图
    //     var getThumImages = ()=>{
    //         return this.$axios.get(''+id);  //getthumimages/
    //     }
    //     this.$axios.all([getImageInfo(),getThumImages()])
    //     .then(this.$axios.spread(function(acc,perms) {
    //         //两个请求都执行
    //         console.log(acc);
    //         console.log(perms);
    //         this.imgInfo = acc.data.message[0];
    //         this.thumImgs = perms.data.message;

    //         //遍历循环
    //         this.thumImgs.forEach((item,index) => {
    //             item.msrc = item.src;
    //             item.w = 600;
    //             item.h = 600;
    //         });
    //     }));
    }
}
</script>

<style lang='css' scoped>
*{
    margin: 1px;
}
.photo-title{
    margin-top: 80px;
}
    .photo-title p{
        font-size: 20px;
        font-weight: 600;
        color: blue;
        margin-top: 15px 0;
    }
    .photo-title span{
        padding: 10px 5px;
    }
    .photo-desc{
          height: 200px;
        border:1px solid red;
    }
    .photo-desc p{
        font-size: 18px;
        color: #333333;
    }
    .photo-title ul li{
        display: inline-block;
    }
    .photo-title ul li a img{
        width: 200px;
    }
</style>>
