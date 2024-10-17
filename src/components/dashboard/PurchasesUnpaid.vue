<template>
    <!-- /* eslint-disable */ -->
    <div class="Purchases">
      <div class="title">
        <div>
          <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
              />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }">unpaid Purchases </p>
          </div>
          <div>
            <div class="export">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
              />
              <button>export</button>
            </div>
        
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
            <option value="adress">Supplier</option>
            <option value="selectedBranch"> branch</option>
          </select>
          </div>
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <select placeholder="filter"  class="filter"  v-model="selectStatus">
                <option  value="all">الكل</option>
                <option value="1">اجل</option>
               
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
        <ListTable v-else-if="getPurchases.length > 0" :purchases="getPurchases"  class="ListTable_cont"></ListTable>
        <NoData v-else  context="unpaidPurchases"></NoData>
     
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
  import { usePurchasesStore } from '@/store/purchases/purchase.js';

  // ListTable
  import ListTable from "@/components/purchases/ListTable.vue";
  
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
 
  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
  
  export default {
    name: "Purchase",
    components: {
      ListTable,
      NoData,
      TableSkeleton,
    },
    computed: {

      getDarkMode() {
        return this.$store.state.darkMode;
      },

      ...mapState(usePurchasesStore, ['purchases']),
  
    // ============ filter => start=======================================
          
    getPurchases() {
            let filteredPurchases = this.purchases.filter(
                purchase => purchase.status == "1"
              );
            
            // فلترة حسب الحالة
            if (this.selectStatus !== 'all') {
              filteredPurchases = filteredPurchases.filter(
                purchase => purchase.status == this.selectStatus
              );
            }
            
              // البحث
          if (this.searchQuery) {
            filteredPurchases = filteredPurchases.filter(purchase => {
              const valueToSearch = purchase[this.selectedFilter].toString().toLowerCase();
              console.log(purchase[this.selectedFilter].toString().toLowerCase())
              return valueToSearch.includes(this.searchQuery.toLowerCase());
            });
          }
                       
            return filteredPurchases;
          }
    // ============ filter => end=======================================
     
    },
    async created(){
      
      await this.fetchPurchases()
       this.isLoading = false;


  
    },
    methods: {
      
      // ============ my actions => start=======================================
  
      ...mapActions(usePurchasesStore, ['fetchPurchases']),


  
      // ============ my actions => end==========================================

  
     
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
  .Purchases {
   // background-color: aqua;
    display: flex;
    flex-wrap: wrap;
    
  }
  
  .title {
    width: 100%;
    height: 180px;
    //background-color: sandybrown;
    display: flex;
    flex-wrap: wrap;
    > div:first-child {
      width: 100%;
      height: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div:first-child {
        background-color: blue;
        height: 40px;
        width: 190px;
        display: flex;
        align-items: center;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        > div {
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
      > div:nth-of-type(2) {
        width: 340px;
        height: 80px;
        // background-color: greenyellow;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        > div {
          width: 100px;
          height: 40px;
          background-color: white;
          // background-color: black;
          border-radius: 4px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          button {
            width: 60px;
            background-color: white;
            // background-color: black;
            color: black;
          }
          img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
        }
      }
    }
    > div:nth-of-type(2) {
      width: 96%;
      height: 40%;
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
  .contTitle {
    background-color: blue;
  }
  .arroow {
    width: 15px;
    height: 15px;
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
  
  .add {
    width: 140px;
    height: 40px;
    background-color: blue;
    cursor: pointer;
    // margin-left: 80%;
    // margin-top: 60px;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    text-transform: capitalize;
    color: white;
  }
  .add::first-letter {
    font-weight: 500;
    font-size: 19px;
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
  