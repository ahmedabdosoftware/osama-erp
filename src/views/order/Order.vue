<template>
    <!-- /* eslint-disable */ -->
    <div class="page oredrs">
      <div class="title">
        <div>
          <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
              />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }">order grid</p>
          </div>
          <div>
            <div class="export">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
              />
              <button>export</button>
            </div>
            <router-link to="/dashboard/AddNewOrder">
              <button class="add">+ add order</button>
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
            <option value="date">date</option>
            <option value="customerName">customer</option>
            <option value="numberOfOrder">order number</option>
          </select>
          </div>
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <select placeholder="filter"  class="filter"  v-model="selectStatus">
                <option  value="all">الكل</option>
                <option value="0">معلق</option>
                <option value="1">مؤكد</option>
                <option value="2">منتهى </option>
               
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
        
        <TableSkeleton v-if="isLoading" :rows="5" :columns="6" />
        <ListTable v-else-if="getOrders.length > 0" :orders="getOrders"  class="ListTable_cont"></ListTable>
        <NoData v-else  context="orders"></NoData>
     
      </div>
      <div id="scrollUp" class="scrollUp">
        <!-- <img
        /> -->
      </div>
    </div>
  </template>
  <script>
  
  // actions 
  import {  mapState , mapActions } from 'pinia'
  //store
  import { useOrdersStore } from '@/store/order/orders.js';

  // ListTable
  import ListTable from "@/components/orders/ListTable.vue";
  
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
 
  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
  
  export default {
    name: "Order",
    components: {
      ListTable,
      NoData,
      TableSkeleton,
    },
    computed: {

      getDarkMode() {
        return this.$store.state.darkMode;
      },

      ...mapState(useOrdersStore, ['orders']),
  
    // ============ filter => start=======================================
          
          getOrders() {
            let filteredOrders = this.orders;
            
            // فلترة حسب الحالة
            if (this.selectStatus !== 'all') {
              filteredOrders = filteredOrders.filter(
                order => order.status == this.selectStatus
              );
            }
            
              // البحث
          if (this.searchQuery) {
            filteredOrders = filteredOrders.filter(order => {
              const valueToSearch = order[this.selectedFilter].toString().toLowerCase();
              console.log(order[this.selectedFilter].toString().toLowerCase())
              return valueToSearch.includes(this.searchQuery.toLowerCase());
            });
          }
                       
            return filteredOrders;
          }
    // ============ filter => end=======================================
     
    },
    async created(){
      
      await this.fetchOrders()
       this.isLoading = false;


  
    },
    methods: {
      
      // ============ my actions => start=======================================
  
      ...mapActions(useOrdersStore, ['fetchOrders']),


  
      // ============ my actions => end==========================================

  
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
        selectStatus: 'all',
        selectedFilter: 'date',
        isLoading: true,

        
      };
    },
   
   
  };
  </script>
  <style scoped lang="scss">
  
  
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
  
  
  </style>
  