<template>
  <div class="contPro">
    <div :class=" { 'dark-mode': getDarkMode }">
      <div>
        <img :src="category.imgUrl "  />
      </div>
      <div>
        <span> {{ category.name }}  </span>
        <p >{{ category.desc }}</p>
        <div class="cont-star">
          <img
            class="star"
            src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
          />
          <img
            class="star"
            src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
          />
          <img
            class="star"
            src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
          />
          <img
            class="star"
            src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
          />
          <img
            class="star"
            src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
          />
        </div>
        <span>.....</span>
        <router-link
          :to="{ name: 'EditCategory', params: { id: category.id } }"
        >
          <button class="edit">edit</button>
        </router-link>
        <button @click="delette(category.id)" class= "delete" > delete </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCategoriesStore } from '@/store/categories/categories.js'
import sweetalert from "sweetalert";

export default {
  name: "BoxCatogery",
  props: [ "category"],
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
  },
  created(){
    console.log(this.category)

  },
  
  methods: {
    ...mapActions(useCategoriesStore, ['deleteCategory', 'deleteImageFromStorage']),
    
    async delette(id) {
      try {
        await this.deleteCategory(id);

        await this.deleteImageFromStorage(this.category.imgUrl);
        console.log("done");
        sweetalert({
          text: "Product deleted successfully",
          icon: "success",
        });
      } catch (error) {
        console.error("Deletion failed", error);
        sweetalert( {
          text: `Error: ${error.message}`,
          icon: "error",
        } );
      }
    },
  },
};
//  console.log(pro)
</script>
<style scoped>
* {
  padding: 0%;
  margin: 0px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}
/* cont all products */
/* .contPro {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-around;
} */
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
.contPro > div > div:nth-child(2) p,
.contPro > div > div:nth-child(2) span:nth-of-type(2) {
  text-transform: capitalize;
  color: #088178;
  font-size: 18px;
  /* background-color: salmon; */
}
/* .contPro >div >div:nth-child(2) span:nth-of-type(2){
    background-color: red;
} */
.cont-star {
  margin-left: 15px;
}
/* star */
.star {
  width: 20px;
  height: 20px;
  margin-left: -5px;
}
/* shoppingCart */
/* .shoppingCart {
  width: 37px;
  height: 37px;
  position: absolute;
  right: 10px;
  bottom: 14px;
} */
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
.dark-mode {
  background-color: black !important;
  box-shadow: 0 0 5px rgb(34, 34, 34) !important;
}
</style>
