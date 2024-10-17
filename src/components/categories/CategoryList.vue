<template>
    <div class="cont-categoryBox">
        <div  v-for="category in Categories" :key="category.id">
            <BoxCatogery
                :category="category"
            >
            </BoxCatogery>
        </div>  
    </div>  
</template>
  
<script>
//  BoxCatogery
import BoxCatogery from "@/components/categories/BoxCatogery.vue";
 

export default {
  name: "CategoryList",

  props: ["Categories"],

  components: {
    BoxCatogery,

  },
 

};
</script>

<style scoped lang="scss">
 .cont-categoryBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  min-height: 380px;

 }
</style>
  