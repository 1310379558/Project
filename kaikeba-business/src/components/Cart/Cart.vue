<template>
  <div class="shopCar1">
    <Navbar title="购物车" />
    <!-- 我是购物车 -->
   

    <div class="pay-detail">

         <!-- 轮播图 -->
    <mt-swipe :auto="3000" style="height:200px" class="swiper">
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.src" alt />
      </mt-swipe-item>
    </mt-swipe>

      <ul>
        <li class="p-list" v-for="(shop,index) in shopCart" :key="index">
          <!-- v-for="(shop,index) in shopCart" :key="index" -->
          <mt-switch v-model="shop.isSelected"></mt-switch>
          <img src alt />
          <div class="pay-calc">
            <p>商品标题</p>
            <div class="calc">
              <span>￥ 888</span>
              <span @click="substract(shop)">-</span>
              <span>1</span>
              <span @click="addNum(shop)">+</span>
              <a href="javascript:void(0)" @click="del(shop,index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计（不含运费）</p>
        <span>已选择商品15件，总价￥1888元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTool from "@/GoodsTool";

// 模块机制导入 轮播图
import banner1 from '@/assets/banner1.jpg'
import banner2 from '@/assets/banner2.jpg'
import banner3 from '@/assets/banner3.jpg'
// var imgs = [
//     {id:1,src:banner1},
//     {id:2,src:banner2},
//     {id:3,src:banner3}
// ]
export default {
  name: "Cart",
  data() {
    return {
      shopCart: [{ num: 1, id: 1, title: "手机", "sell-price": 555 }],
      message: 1234,
      imgs:[
           {id:1,src:banner1},
            {id:2,src:banner2},
            {id:3,src:banner3}
      ]
    };
  },
  computed: {
    payment() {
      //默认只有getter方法
      let total = 0; //总钱数
      let count = 0; //总数量

      this.shopCart.forEach(shop => {
        //如果勾选
        if (shop.isSelected) {
          count += shop.num;
          total += shop.num * shop.sell - price;
        }
      });
      return {
        total,
        count
      };
    }
  },
  beforeRouteLeave(to, from, next) {
    //导航离开该组件对应路由时调用
    //可以访问组件实例‘this’

    //还未保存数据  提示用户
    let res = confirm("确定要离开吗？？？");
    let obj = {};
    if (res) {
      //保存用户编辑数据
      this.shopCart.forEach(shop => {
        obj[shop.id] = shop.num;
      });
      GoodsTool.saveGoods(obj);
      next();
    } else {
      next(false); //用户点击取消  取消导航
    }
  },
  methods: {
    del(shop, index) {
      //删除数组元素
      this.shopCart.splice(index, 1);
      //删除shop
      delete GoodsTool[shop.id];
    },
    addNum(shop) {
      shop.num++;
    },
    substract(shop) {
      if (shop.num == 0) {
        return;
      }
      shop.num--;
    }
  },
  created() {
    let goodsList = GoodsTool.getGoodsList();
    let ids = Object.keys(goodsList).join(",");

    if (ids) {
      //发起请求，获取用户购买商品的列表
      this.$axios
        .get("/") //goods/getshopcarlist/${ids}
        .then(res => {
          this.shopCart = res.data.message;
          //vue将shopCart中对象的所有属性进行监视，完成响应式

          //给数组的元素添加属性  同步用户购物添加数量到购物车里数据个数
          for (var i = 0; i < this.shopCart.length; i++) {
            let shop = this.shopCart[i];
            let num = goodsList[shop.id];

            if (num) {
              //如果数据不完整的情况下，要添加属性，就需要手动通知vue完成响应式 ==》 双向数据绑定
              this.$set(shop, "num", num);
              this.$set(shop, "isSelected", true);

              //    shop.num = num;       //代码效果功能和上set一样
              //    shop.isSelected = true;
            }
          }
        })
        .catch(err => {
          console.log("获取用户购买商品列表失败！", err);
        });
    }
  }
};
</script>

<style scoped>
img{
    width: 100%;
    
}
/* .swiper{
    height:100px;
    border:1px solid red;
    margin-top: 80px;
} */
.pay-detail {
  margin-top: 80px;
}
.pay-detail ul li {
  list-style: none;
  border-bottom: 1px solid red;
  margin-bottom: 3px;
}
.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}
.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}
.pay-detail ul li > :nth-child(1),
.pay-detail ul li > :nth-child(3) {
  display: inline-block;
}
.pay-calc p {
  display: inline-block;
  width: 250px;
  overflow: hidden;
  color: blue;
  font-size: 15px;
  margin-bottom: 10px;
}
.pay-detail ul li > :nth-child(1) {
  line-height: 80px;
}

.calc:nth-child(1) {
  color: red;
  font-size: 20px;
}
.calc span:not(:nth-child(1)) {
  border: 1px solid blue;
  display: inline-block;
  width: 20px;
  text-align: center;
}
.calc a {
  margin-left: 20px;
}
.show-1,
.show-2 {
  display: inline-block;
}
.show-1,
.show-2 {
  margin-left: 30px;
}
.show-price {
  background-color: red;
}
</style>