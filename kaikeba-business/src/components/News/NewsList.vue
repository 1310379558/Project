<template>
  <div class="news" >
    <!-- 我展示的是多个列表及其内容
    {{NewsList}} -->
    <Navbar title="新闻列表"/>
    <div class="newList">
        <ul>
            <li v-for="(news,index) in NewsList" :key="index">
                <router-link :to='{name:"detail",query:{id:news.id}}'>
                    <div class="new_img">
                        <img src="@/assets/dzq.jpg" alt="">
                    </div>
                    <div class="content">
                        <p class="title">我爱我的祖国</p>
                        <div class="news-desc">
                            <p class="summary">我的摘要内容</p>
                            <p>
                                <span class="praise">点赞数：55555</span><br/>
                                <span class="time">发表时间：   2019-10-10 <!--{{2019-10-10 | converTime('YYYY-MM-DD')}}--></span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'NewsList',
        data (){
            return{
                NewsList:[
                    {id:1,title:'新闻一',desc:'内容一'},
                    {id:2,title:'新闻二',desc:'内容二'},
                    {id:3,title:'新闻三',desc:'内容三'},
                    {id:4,title:'新闻四',desc:'内容四'},
                    {id:5,title:'新闻五',desc:'内容五'},
                    {id:6,title:'新闻六',desc:'内容六'},
                    {id:6,title:'新闻七',desc:'内容七'},
                    {id:6,title:'新闻八',desc:'内容八'},
                    {id:6,title:'新闻九',desc:'内容九'},
                    {id:6,title:'新闻十',desc:'内容十'},
                ]
            }
        },
        // created(){
        //     this.$axios.get('')
        //     .then(res=>{
        //         this.NewsList = res.data.message;
        //          console.log(this.NewsList);
        //     })
        //     .catch(err=>{
        //         console.log('新闻列表刷新失败',err);
        //     })
        // }
}
</script>

<style lang="css" scoped>

.newList{
    height: 100%;
    margin-bottom: 40%;
    margin-top: 80px;
}
.newList ul li{
    margin-bottom: 80px;
}
.newList .new_img img{
    width: 120px;
    height: 140px;
    /* float: left; */
    margin-left: 15px;
    margin-top: 10px; 
}
.content{
    margin-left: 150px;
    margin-top: -120px;
}
</style>>