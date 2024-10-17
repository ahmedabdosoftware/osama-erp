<template>
    <!-- /* eslint-disable */ -->
    <div class="page StockAlerts">
      <div class="title">
        <div>
          <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
              />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }">Stock alerts grid</p>
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
            <option value="branchName"> branch Name </option>
            <option value="productName">  product Name</option>
            <option value="productQuantity"> productQuantity</option>
          </select>
          </div>
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <select placeholder="filter"  class="filter"  v-model="selectStatus">
                <option  value="all">الكل</option>
                <option value="0">فى مستوى خطير </option>
                <option value="1">مستوى متوسط </option>
                <option value="3">عادى</option>
               
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
        <ListTable v-else-if="getStockAlerts.length > 0" :StockAlerts="getStockAlerts"  class="ListTable_cont"></ListTable>
        <NoData v-else  context="stock-alerts"></NoData>
     
      </div>
      
    </div>
  </template>
  <script>
  
  // actions 
  import {  mapState , mapActions } from 'pinia'

  //store
  import { useBranchesStore } from '@/store/branches/branches.js';

  // ListTable
  import ListTable from "@/components/branches/Stockalerts/ListTable.vue";
  
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
 
  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
  
  export default {
    name: "StockAlerts",
    components: {
      ListTable,
      NoData,
      TableSkeleton,
    },
    computed: {

      getDarkMode() {
        return this.$store.state.darkMode;
      },

      ...mapState(useBranchesStore, ['branches']),
  
    // ============ filter => start=======================================
          
    getStockAlerts() {
      let filteredStockAlerts = [];

      this.branches.forEach(branch => {
        branch.products.forEach(product => {
          //console.log(product.quantity)
          //console.log(product.quantity <= product.alert)
          if (product.quantity <= product.alert) {
            let status = '';
          const ratio = product.quantity / product.alert;

          if (ratio <= 0.3) {
            status = '0'; // خطير
          } else if (ratio <= 0.7) {
            status = '1'; // متوسط
          } else {
            status = '3'; // عادي
          }

        filteredStockAlerts.push({
          branchName: branch.nameBranch,
          productName: product.name,
          productQuantity: product.quantity,
          alertQuantity: product.alert,
          status: status,
        });

          }
        });
      });
          
            // فلترة حسب الحالة
            if (this.selectStatus !== 'all') {
              filteredStockAlerts = filteredStockAlerts.filter(
                alert => alert.status == this.selectStatus
              );
            }
            
              // البحث
          if (this.searchQuery) {
            filteredStockAlerts = filteredStockAlerts.filter(alert => {
              const valueToSearch = alert[this.selectedFilter].toString().toLowerCase();
              console.log(alert[this.selectedFilter].toString().toLowerCase())
              return valueToSearch.includes(this.searchQuery.toLowerCase());
            });
          }
                       
            return filteredStockAlerts;
          }
    // ============ filter => end=======================================
     
    },
    async created(){
      
      await this.fetchBranches()
      console.log(this.transferes)
       this.isLoading = false;


  
    },
    methods: {
      
      // ============ my actions => start=======================================
  
      ...mapActions(useBranchesStore, ['fetchBranches']),


  
      // ============ my actions => end==========================================

  
    },
    data() {
      return {
        searchQuery: '',
        selectStatus: 'all',
        selectedFilter: 'branchName',
        isLoading: true,

        
      };
    },
   
   
  };
  </script>
  <style scoped lang="scss">

 // global style
  
  </style>
  