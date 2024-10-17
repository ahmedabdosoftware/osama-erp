<template>
  <div class="page todayOrder">
    <div class="title--todayOrder">

        <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
              />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }"> today orders info</p>
          </div>
          <div class="export_cont">
            <div class="export">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
              />
              <button>export</button>
            </div>
           
          </div>

        </div>
        <div class="dashboard__SearchOrder" :class="{ 'dark-mode-box': getDarkMode }">
        <div class="">
            <input
            :class="{ 'dark-mode-search': getDarkMode }"
            placeholder="search"
            type="search"
            v-model="searchQuery" 
        />
        <select placeholder="filter"  class="filter" v-model="selectedFilter">
            <option value="customerName">اسم العميل</option>
            <option value="numberOfOrder">رقم الطلب </option>
        </select>
        </div>   
    </div>
    <div :class="{ 'dark-mode-box': getDarkMode }" class="allContent"> 

        <TableSkeleton v-if="isLoading" :rows="5" :columns="6" />
        <ListTable v-else-if="getOrders.length > 0" :orders="getOrders"  class="ListTable_cont"></ListTable>
        <NoData v-else  context="todayOrders"></NoData>

    </div>
  </div>
    
</template>


<script>
// date library
import moment from 'moment';

// actions 
import {  mapState , mapActions } from 'pinia'


//store
import { useOrdersStore } from '@/store/order/orders.js';
  
  // components
  
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
  
  // ListTable
  import ListTable from "@/components/orders/ListTable.vue";

  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";

  // statistics
  

export default {
  name: "TodayOrder",
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

          // الطلبات المؤكده فقط
          let filteredOrders = this.orders.filter(order => order.status == '1');
         
         // طلبات اليوم فقط
          const now = moment();
          filteredOrders = filteredOrders.filter(order => {
            const orderDate = moment(order.date);
            return orderDate.isSame(now, 'day');
          });

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


  
  },
  data() {
    return {
      searchQuery: '',
      selectedFilter: 'customerName',
      isLoading: true,

      
    };
  },
 
 
};
</script>

<style scoped lang="scss">
.page{
    width: 100%;
}
.title--todayOrder{
    width: 100% ;
}
.contTitle{
    width: 100% ;
    margin: 30px 0px 5px  ;
    background-color: blue;
    height: 40px;
    width: 196px;
    display: flex;
    align-items: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    div {
        width: 35px;
        height: 35px;
        border-radius: 17.5px;
        margin-left: 10px;
        background-color: white;
        
        img {
            width: 100%;
            height: 100%;
        }
    }
    p {
        text-transform: capitalize;
        text-align: center;
        margin-left: 20px;
        font-size: 18px;
        font-weight: 600;
        color: white;
        margin-right: 10px;
    }
}
.export_cont {
    width: 100% ;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > div {
      width: 100px;
      height: 40px;
      background-color: white;
      border-radius: 4px;
      margin-right: 100px;
      button {
        width: 60px;
        background-color: white;
        color: black;
      }
      img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
.dashboard__SearchOrder {
    width: 96%;
    height: 60px;
    margin-left: 4%;
    margin-bottom: 20px;
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
    
  }

.allContent {
  width: 96%;
  min-height: 400px;
  background-color: white;
  margin-bottom: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  margin-left: 4%;
}
.allContent > div {
  width: 100%;
  height: 400px;
  margin-top: 15px;
  margin-bottom: 15px;
}



@media (max-width: 477px) {
  .title {
    > div:nth-of-type(2) {
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

  .title {
    height: 210px;
    // background-color: red;
    > div:first-child {
      height: 60%;
      flex-direction: column;
      > div:first-child {
        align-self: flex-start;
        margin-top: 15px;
      }
      > div:nth-of-type(2) {
        align-self: flex-end;
      }
    }
  }
}


</style>
