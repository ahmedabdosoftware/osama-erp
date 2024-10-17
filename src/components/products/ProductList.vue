<template>
    <div class="cont-ProductsBox">
      <div v-for="product in products" :key="product.id">
        <BoxProduct
          :oneProduct="product"
        ></BoxProduct>
      </div>
    </div>  
</template>
  
<script>

// BoxProduct
import BoxProduct from "@/components/products/BoxProduct.vue";

export default {
  name: "ProductList",

  props: ["products"],

  components: {
    BoxProduct,

  },
 

};
</script>

<style scoped lang="scss">
 .cont-ProductsBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  min-height: 380px;

 }
</style>
  