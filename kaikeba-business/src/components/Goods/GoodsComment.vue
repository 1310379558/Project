<template>
  <div>
      <Navbar title="商品品论"/> 
      <component:cid='$router.query.id' />
  </div>
</template>

<script>
export default {
    name:'GoodsComment',
    data () {
        return {

        };
    },
}
</script>

<style>

</style>