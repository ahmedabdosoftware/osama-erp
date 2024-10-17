<template>
  <div class="contPro">
    <div :class="{ 'dark-mode': getDarkMode }">
      <div>
        <img :src="oneProduct.imageUrl" />
      </div>
      <div>
        <span> {{ oneProduct.name | subName }}</span>
        <p class="descrption">{{ oneProduct.description | sub }}</p>
        <div class="cont-star">
          <img class="star" src="https://img.freepik.com/free-vector/start_53876-25533.jpg" />
          <img class="star" src="https://img.freepik.com/free-vector/start_53876-25533.jpg" />
          <img class="star" src="https://img.freepik.com/free-vector/start_53876-25533.jpg" />
          <img class="star" src="https://img.freepik.com/free-vector/start_53876-25533.jpg" />
          <img class="star" src="https://img.freepik.com/free-vector/start_53876-25533.jpg" />
        </div>
        <span>{{ oneProduct.priceMaterial }} :  سعرال{{ oneProduct.unitName.name }}</span>
        <span v-if="oneProduct.priceWithLabor">{{ oneProduct.priceWithLabor }} : مصنعية</span>
        <router-link :to="{ name: 'EditProduct', params: { id: oneProduct.id } }">
          <button class="edit">edit</button>
        </router-link>
        <button class="delete" @click="delette(oneProduct.id)">delete</button>
      </div>
    </div>
  </div>
</template>

<script>

// actions 
import { mapActions } from 'pinia';
import { useProductsStore } from '@/store/products/products.js'

// sweetalert 
import sweetalert from "sweetalert";

export default {
  name: "BoxProduct",
  props: ["oneProduct"],
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
  },
  methods: {
    // ============ my actions => start =============================================
    ...mapActions(useProductsStore, ['deleteProduct', 'deleteImageFromStorage']),
    // ============ my actions => end ==============================================

    async delette(id) {
      try {
        await this.deleteProduct(id);
        console.log("Product deleted from database");
        
        await this.deleteImageFromStorage(this.oneProduct.imageUrl);
        console.log("Product image deleted from storage");

        sweetalert({
          text: "Product deleted successfully",
          icon: "success",
        });
      } catch (error) {
        console.error("Deletion failed", error);
        sweetalert({
          text: `Error: ${error.message}`,
          icon: "error",
        });
      }
    },
  },
};
</script>


<style scoped>
* {
  padding: 0%;
  margin: 0px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}
.contPro {
  width: 300px;
  height: 380px;
  margin-top: 15px;
  margin-bottom: 15px;
}
/* cont one product */
.contPro > div {
  width: 100%;
  height: 100%;
  background-color: white;
  margin-left: 15px;
  box-shadow: 0 0 5px rgb(210, 205, 205);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  /* background-color: red; */
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

/* cont img =>flower */
.contPro > div > div:first-child {
  width: 90%;
  height: 59%;
  background-color: rgb(194, 191, 191);
  /* background-color:rgb(141, 28, 28); */
  border-radius: 15px;
  position: relative;
}
/*img => flower */
.contPro > div > div:first-child img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

/* cont all descrption */
.contPro > div > div:nth-child(2) {
  width: 100%;
  height: 27%;
  /* background-color:rgb(210, 49, 49) ; */
  padding-right: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  position: relative;
}
/* marka */
.contPro > div > div:nth-child(2) span:nth-of-type(1) {
  color: rgb(91, 89, 89);
  /* background-color: rgb(155, 77, 77); */
}
/* price and  short descrption */
.contPro > div > div:nth-child(2) span:nth-of-type(2),
.contPro > div > div:nth-child(2) span:nth-of-type(3)  {
  text-transform: capitalize;
  color: #088178;
  font-size: 18px;
}
.contPro > div > div:nth-child(2) span:nth-of-type(3){
  margin: 5px 0px 0px 15px ;
}
.cont-star {
  margin-left: 15px;
}
/* star */
.star {
  width: 20px;
  height: 20px;
  margin-left: -5px;
}

.delete,
.edit {
  width: 55px;
  height: 30px;
  position: absolute;
  bottom: 14px;
  border-radius: 5px;
  text-transform: capitalize;
  cursor: pointer;
}
.edit {
  right: 10px;
}
.delete {
  right: 70px;
  color: red;
}
.contPro > div > div:nth-child(2) span:nth-of-type(1),
.contPro > div > div:nth-child(2) p,
.contPro > div > div:nth-child(2) span:nth-of-type(2) {
  padding-left: 15px;
}
.descrption {
  font-size: 14px;
  width: 100%;
}
.dark-mode {
  background-color: black !important;
  box-shadow: 0 0 5px rgb(34, 34, 34) !important;
}
</style>
