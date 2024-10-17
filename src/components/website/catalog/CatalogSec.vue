<template>
  <!-- /* eslint-disable */ -->

    <div class="catalogSection">
      <div class="title">
        <div>
          <div class="">
            <input
            placeholder="search"
            type="search"
            v-model="searchQuery" 
          />
          <select placeholder="filter"  class="filter" v-model="selectedFilter">
            <option value="name">title</option>
            <option value="priceMaterial">priceMaterial</option>
            <option value="priceWithLabor">priceWithLabor</option>
          </select>
          </div>
          <div>
            <div>
              <select placeholder="filter"  class="filter categoriesFilter"  v-model="selectedCategory">
                <option>all</option>
                <option v-for="category in categories" :value="category.id" :key="category.id">
                   {{ category.name }}
                </option>
              </select>
            </div>
            <!--
            <div>
              <button>last aded</button>
              <img
                class="arroow aded"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HHn9uGD0sPLHcGzdjI_WX8Au22ap-x1b1Q&usqp=CAU"
            </div>
              /> -->
          </div>
        </div>
      </div>
      <div  class="allContent">
        <swiper
        :slidesPerView="4"
        :spaceBetween="30"
        :centeredSlides="false"
        :pagination= "{
        clickable: true,
        }"
        :breakpoints="{
           '360': {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          '420': {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          '640': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '915': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          '1024': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
        >
    
        <swiper-slide class="swiper-slide_cont" v-for="product in getProduct" :key="product.id">
          <BoxProduct
            :oneProduct="product"
          ></BoxProduct>
        </swiper-slide>
  
      </swiper>
  
    </div>        
      <div id="loader">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div id="scrollUp" class="scrollUp">
        <!-- <img
          src="data:image/png;base64,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"
        /> -->
      </div>

    </div>
  </template>
  <script>
  // Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import required modules
import {EffectFade, Navigation, Pagination  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

  // actions 
  import {  mapState , mapActions } from 'pinia'
  //store
  import { useProductsStore } from '@/store/products/products.js'
  import { useCategoriesStore } from '@/store/categories/categories.js';
  
  // BoxProduct
  import BoxProduct from "@/components/catalog/BoxProduct.vue";
  
  export default {
    name: "CatalogSec",
    components: {
     BoxProduct,
      Swiper,
      SwiperSlide,
    },
    computed: {

      ...mapState(useProductsStore, ['products']),
      ...mapState(useCategoriesStore, ['categories']),
  
    // ============ filter => start=======================================
          
          getProduct() {
            let filteredProducts = this.products;
            
           // فلترة لعرض المنتجات التي يرغب الأدمن في عرضها
           filteredProducts = filteredProducts.filter(product => product.displayOnSite);
           
            // فلترة حسب الفئة
            if (this.selectedCategory !== 'all') {
              filteredProducts = filteredProducts.filter(
                product => product.categoryId === this.selectedCategory
              );
            }
            
            // البحث
            if (this.searchQuery) {
              filteredProducts = filteredProducts.filter(product => {
                const valueToSearch = product[this.selectedFilter].toString().toLowerCase();
                return valueToSearch.includes(this.searchQuery.toLowerCase());
              });
            }
            
            return filteredProducts;
          }
    // ============ filter => end=======================================
     
    },
     created(){
       this.fetchProducts()
       this.fetchCategories();
  
    },
    methods: {
      
      // ============ my actions => start=======================================
  
      ...mapActions(useProductsStore, ['fetchProducts']),
      ...mapActions(useCategoriesStore, ['fetchCategories']),
  
  
      // ============ my actions => end==========================================
  
      // ============loader => start=============================================
      loaderToggle: function (show) {
        let loader = document.getElementById("loader");
        if (show) {
          loader.style.visibility = "visible";
        } else {
          loader.style.visibility = "hidden";
        }
      },
      // ============loader => end=============================================
  
      // ===========show posts => start========================================
      // show scroll up
      showScrollUp: function () {
        let Buttom = document.getElementById("scrollUp");
        window.onscroll = function () {
          if (scrollY >= 500) {
            Buttom.style.visibility = "visible";
          } else {
            Buttom.style.visibility = "hidden";
          }
        };
      },
    
      // ===========show posts filter => start================================================
     
      // ===========show posts filter => end================================================
  
    },
    data() {
      return {
        searchQuery: '',
        selectedCategory: 'all',
        selectedFilter: 'name',
        modules: [ EffectFade, Pagination,Navigation],
        
      };
    },
   
   
  };
  </script>
  <style scoped lang="scss">
  
  .catalogSection {
    //background-color: aqua;
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    height: 100%;
  }
  
  .title {
    width: 100%;
    height: 80px;
   // background-color: sandybrown;
    display: flex;
    flex-wrap: wrap;
    > div:first-child {
      width: 100%;
      height: 100%;
      background-color: white;
      //background-color: rgb(129, 76, 19);
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      display: flex;
      justify-content: space-between ;
      align-items: center;
      div:first-child{
        display: flex;
        justify-content: space-evenly ;
        align-items: center;
        height: 100%;
        width: 350px;
        // background-color: red;
        select {
          // margin-right: 400px;
          border-radius: 5px;
          height: 30px;
          width: 100px;
          text-transform: capitalize;
          color: black;
          border: solid 2px rgb(233, 230, 230);
        }
        input {
          height: 30px;
          width: 200px;
          padding-left: 5px;
          color: black;
          border: solid 2px rgb(233, 230, 230);
          border-radius: 5px;
        }
        input:focus {
          outline: none;
        }
      }
      > div:nth-child(2) {
        width: 350px;
        height: 40px;
        // background-color: red;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        div {
          width: 140px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          height: 80%;
          border-radius: 3px;
          background-color: white;
          border: 2px solid rgb(222, 218, 218);
          button {
            background-color: white;
          }
        }
      }
    }
  }
  .contTitle {
    background-color: blue;
  }
  .arroow {
    width: 15px;
    height: 15px;
  }
  
  .allContent {
    width: 100%;
    min-height: 500px;
    background-color: white;
  }
  .allContent >.mySwiper{
    width: 100%;
    min-height: 500px;
    .swiper-slide_cont{
    //background-color: rgb(207, 70, 70);
    width: 300px;
    height: 470px;
   

    }
  }
  $bg-dark: rgb(42, 42, 112);


::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  color: white;
  background-color: $bg-dark;
  padding: 10px;
  width: 65px ;
  height: 65px ;
  border-radius: 50% ;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: white;
    color: $bg-dark;
  }
}

  .categoriesFilter{
    width: 100% !important;
  }
  
  /* loader => start  */
  .lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: rgb(27, 25, 25);
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  #loader {
    width: 500px;
    height: 500px;
    visibility: hidden;
    /* background-color: slategray; */
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* loader => end  */
  
  /* scrollUp => start */
  .scrollUp {
    width: 60px;
    height: 60px;
    //   background-color: blue;
    position: fixed;
    right: 20px;
    bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    /* border: 2px solid white; */
    cursor: pointer;
    //   visibility: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  // .scrollUp::after {
  //   content: "^";
  //   width: 50%;
  //   height: 50%;
  // //   background-color: darkorange;
  //   position: absolute;
  //   top: 10%;
  //   font-weight: 500;
  //   font-size: 40px;
  //   text-align: center;
  //   color: white;
  // }
  // .scrollUp::before {
  //   content: "^";
  //   color: white;
  //   position: absolute;
  //   top: 35%;
  //   width: 50%;
  //   height: 50%;
  // //   background-color: darkorange;
  //   font-weight: 500;
  //   font-size: 40px;
  //   text-align: center;
  // }
  /* scrollUp => end */
  
  .dark-mode-search {
    background-color: rgb(36, 36, 36);
    border: none !important;
    color: white !important;
  }
  .dark-mode {
    background-color: rgb(9, 9, 9) !important;
  }
  .dark-mode-title {
    color: white !important;
  }
  .dark-mode-box {
    background-color: black !important;
    box-shadow: 0 0 5px rgb(17, 16, 16);
  }
  @media (max-width: 477px) {
    
    .title {
      > div:first-child  {
        div:first-child{
          width: 170px;
          select {
          width: 60px;
        }
        input {
          width: 100px;
        }
        }
        div:nth-child(2){
          // background-color: aqua;
          width: 180px;
          div {
            width: 80px;
          }
  
        }
      }
    }
  
    .allContent >.mySwiper{
      //background-color: aqua;
      display: flex;
      flex-wrap: wrap;
      justify-content: center ;
      align-items: center;
      padding-left: 20px;

      .swiper-slide_cont{
        //margin-left: 10px;

      }
  }
  
}
@media (max-width: 365px) {
  
  .allContent >.mySwiper{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  
    .swiper-slide_cont{
      margin-left: 10px;
  
    }
  }
}
@media(max-width:429px){
    
    .allContent >.mySwiper{
     // background-color: aqua;      
      .swiper-slide_cont{
        height: 530px;
        
      }
    }


  }
  </style>
  