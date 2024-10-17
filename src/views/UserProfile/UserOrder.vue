<template>
  <!-- /* eslint-disable */ -->
  <div class="page oredrs">
    <div class="title--pagesInProfile">
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
   

  </div>
</template>

<script>

// actions 
import {  mapState , mapActions } from 'pinia'
//store
import { useOrdersStore } from '@/store/order/orders.js';

// componnents
  // ListTable
  import ListTable from "@/components/orders/ListTable.vue";
  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
  
  

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
          let filteredOrders = this.orders.filter(order => order.status !== '0');
          if (this.profileId) {
              filteredOrders = filteredOrders.filter(order => 
              order.customerId === this.profileId || order.technicalId === this.profileId
            );
          }          
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
    
    this.profileId = this.$route.params.profileId;
    await this.fetchOrders()
    this.isLoading = false;


  },
  methods: {
    
    // ============ my actions => start=======================================

    ...mapActions(useOrdersStore, ['fetchOrders']),



    // ============ my actions => end==========================================

   

  },
  data() {
    return {
      searchQuery: '',
      selectStatus: 'all',
      selectedFilter: 'date',
      profileId: null,
      isLoading: true,

    };
  },
 
 
};
</script>
<style scoped lang="scss">


.title--pagesInProfile {
  width: 100%;
  height: 80px;
  margin-top: 25px;
  //background-color: sandybrown;
  display: flex;
  flex-wrap: wrap;
 
  > div:first-child {
    width: 96%;
    height: 100%;
    margin-left: 4%;
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
       //background-color: red;
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
       //background-color: red;
       display: flex;
       justify-content: space-evenly;
       align-items: center;
       select {
        border-radius: 5px;
        height: 30px;
        text-transform: capitalize;
        color: black;
        border: solid 2px rgb(233, 230, 230);
        width: 100% !important;

      }
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



@media (max-width: 477px) {
  .allContent {
    margin-bottom: 250px;
  }
 
 
}

  
.title--pagesInProfile {

> div:first-child {
   >div:first-child {
    width: 210px;
  
    input {
    margin-left: 4px;
    width: 100px;
    
  }
  select{
    width: 70px;

  }
  }
  > div:nth-of-type(2) {
    
    > div {
      width: 70px;
      button {
        width: 70px;
        font-size: 11px;
      }
      img {
        width: 16px;
        height: 16px;
        margin-left: 3px;
        margin-right: 3px;
      }
    }
    >div:nth-child(2){
      width: 90px;


    }
  }
}

}

</style>
