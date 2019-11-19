<template>
  <div class="tmpl">
      <div class="photo-bottom">
          <ul>
              <li class="photo-comment">
                  <div>
                      <span>提交评论</span>
                      <span><a href="">返回</a></span>
                  </div>
              </li>
              <li class="texy-conmment">
                  <textarea  cols="50" rows="10" v-model="commentContent"></textarea>
              </li>
              <li>
                  <mt-button type="primary" size='large' @click="commentHandler">评论</mt-button>
              </li>
              <li class="photo-commentText">
                  <div>
                      <span>评论列表</span>
                      <span>666条评论</span>
                  </div>
              </li>
          </ul>
          <ul class="comment-list">
              <li v-for="(comment,index) in comments" :key="index">
                  匿名用户：是哪里的看见那肯定；
                  {{comment.user-name}}:{{comment.content}}  {{comment.add-time | relativeTime}}
              </li>
          </ul>
          <mt-button type="danger" size='large' @click='loadMore(page)'>加载更多</mt-button>
      </div>
  </div>
</template>



<script>
export default {
    name:'Comment',
    props:['cid'],
    data(){
        return {
            comments:[],
            page:1,
            commentContent:''
        };
    },
    methods:{
        //评论事件按钮操作
        commentHandler(){
            //提交post请求
            this.$axios.post('postcomment/${this.cid}','content='+this.commentContent)
            .then(res=>{
                console.log(this.data.message);
                //发表后清空评论框
                this.commentContent=' ';
                //加载第一页数据
                this.page=1;
                this.loadMore(); //再加载一次
            })
            .catch(err=>{
                console.log('提交评论失败！',err);
            })
        },

        //加载更多按钮事件操作
        loadMore(page){
            this.$axios.get('getcomments/${this.cid}?pageindex=${this.page}')
        .then(res=>{
            // this.comments = res.data.message;

            //判断评论加载完  提示用户没有数据了
            if(res.data.message.length === 0){
                this.$toast('没有数据了');
            }
            if(page){
                //表示加载更多  追加
                this.comments = this.comments.concat(res.data.message); 
            } else {
                //直接赋值  第一次加载 
                 this.comments = res.data.message;
            }
            this.page++;
        })
        .catch(err=>{
            console.log('评论加载失败',err);
        })

        }
    },
    created(){
        //配置用户输入id page  和默认情况
        let page = this.$route.query.page || '1';
        //第一次加载
        this.loadMore();
        // this.$axios.get('getcomments/${this.cid}?pageindex=${page}')
        // .then(res=>{
        //     this.comments = res.data.message;
        // })
        // .catch(err=>{
        //     console.log('评论加载失败',err);
        // })
    }
}
</script>



<style scoped>
    .tmpl{
        padding-bottom: 100px;
    }
    .photo-comment > div span:nth-child(1){
        float:left;
        font-weight: bold;
        margin-left: 5px;
    }
     .photo-comment > div span:nth-child(2){
       float: right;
       margin-right: 20px;
    }
    .photo-comment{
        /* height: 100px; */
        border-bottom: 1px solid rgba(0,0,0,0.4);
        line-height: 30px;
        margin-bottom: 5px;
    }
    .text-comment {
        padding: 5 5;
    }
    .text-comment textarea{
        margin-bottom: 5px;
    }
    .comment-list li{
        border-bottom: 1px solid rgba(0,0,0,0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }
    
    li{
        list-style-type: none;
    }
    ul{
        margin: 0;
        padding: 0;
    }
    textarea{
        width: 100%;
    }
</style>>