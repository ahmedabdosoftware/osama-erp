<template>
  <!-- /* eslint-disable */ -->
  <div class="page product">
    <div class="title">
      <div>
        <div class="contTitle">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
            />
          </div>
          <p :class="{ 'dark-mode-title': getDarkMode }">product grid</p>
        </div>
        <div>
          <div class="export">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
            />
            <button>export</button>
          </div>
          <router-link to="/dashboard/AddNewProduct">
            <button class="add">+ add product</button>
          </router-link>
        </div>
      </div>

      <div :class="{ 'dark-mode-box': getDarkMode }">
        <div class="">
          <input
          :class="{ 'dark-mode-search': getDarkMode }"
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
        <div :class="{ 'dark-mode-box': getDarkMode }">
          <div>
            <select placeholder="filter"  class="filter productsFilter"  v-model="selectedCategory">
              <option>all</option>
              <option v-for="category in categories" :value="category.id" :key="category.id">
                 {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <button>last aded</button>
            <img
              class="arroow aded"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HHn9uGD0sPLHcGzdjI_WX8Au22ap-x1b1Q&usqp=CAU"
            />
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'dark-mode-box': getDarkMode }" class="allContent">

      <div v-if="isLoading">
        <BoxSkeletonLoader v-for="n in 6" :key="n" />
      </div>
      <div v-if="!isLoading">
        <ProductList
          :products="getProduct"
        >
        </ProductList>
      </div>

      <NoData v-if="getProduct.length == 0" context="products"></NoData>


    </div>
    
  </div>
</template>
<script>

// actions 
import {  mapState , mapActions } from 'pinia'
//store
import { useProductsStore } from '@/store/products/products.js'
import { useCategoriesStore } from '@/store/categories/categories.js';

//  CategoryList
import ProductList from "@/components/products/ProductList.vue";
// Skeleton Box
import BoxSkeletonLoader from '@/shared/components/loading/skeletonLoader/BoxSkeletonLoader.vue';
  // NoData
import NoData from "@/shared/components/noData/NoData.vue";

export default {
  name: "Product",
  components: {
   NoData,
   BoxSkeletonLoader,
   ProductList,
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
    ...mapState(useProductsStore, ['products']),
    ...mapState(useCategoriesStore, ['categories']),

  // ============ filter => start=======================================
        
        getProduct() {
          let filteredProducts = this.products;
          
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
  async created(){
     await this.fetchProducts()
     this.isLoading = false;
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
      isLoading: true,

      
    };
  },
 
 
};
</script>
<style scoped lang="scss">



.allContent > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  min-height: 380px;
}
.productsFilter{
  width: 100% !important;
}



</style>
