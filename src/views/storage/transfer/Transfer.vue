<template>
    <!-- /* eslint-disable */ -->
    <div class="page transfers">
      <div class="title">
        <div>
          <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
              />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }">transfers grid</p>
          </div>
          <div>
            <div class="export">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
              />
              <button>export</button>
            </div>
            <router-link to="/dashboard/AddTransfer">
              <button class="add">+ add transfer</button>
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
            <option value="selectedBranchTo"> Branch To</option>
            <option value="selectedBranchFrom"> Branch From</option>
          </select>
          </div>
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <select placeholder="filter"  class="filter"  v-model="selectStatus">
                <option  value="all">الكل</option>
                <option value="0">فى الانتظار</option>
                <option value="1">اثناء النقل</option>
                <option value="3">منجز</option>
               
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
        <ListTable v-else-if="getTransfers.length > 0" :transferes="getTransfers"  class="ListTable_cont"></ListTable>
        <NoData v-else  context="transfers"></NoData>
     
      </div>
      
    </div>
  </template>
  <script>
  
  // actions 
  import {  mapState , mapActions } from 'pinia'
  //store

  //store
  import { useBranchTransferStore } from '@/store/branches/transfer.js';

  // ListTable
  import ListTable from "@/components/branches/transfer/ListTable.vue";
  
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
 
  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
  
  export default {
    name: "transfers",
    components: {
      ListTable,
      NoData,
      TableSkeleton,
    },
    computed: {

      getDarkMode() {
        return this.$store.state.darkMode;
      },

      ...mapState(useBranchTransferStore, ['transferes']),
  
    // ============ filter => start=======================================
          
       getTransfers() {
            let filteredTransferes = this.transferes;
            
            // فلترة حسب الحالة
            if (this.selectStatus !== 'all') {
              filteredTransferes = filteredTransferes.filter(
                transfer => transfer.status == this.selectStatus
              );
            }
            
              // البحث
          if (this.searchQuery) {
            filteredTransferes = filteredTransferes.filter(transfer => {
              const valueToSearch = transfer[this.selectedFilter].toString().toLowerCase();
              console.log(transfer[this.selectedFilter].toString().toLowerCase())
              return valueToSearch.includes(this.searchQuery.toLowerCase());
            });
          }
                       
            return filteredTransferes;
          }
    // ============ filter => end=======================================
     
    },
    async created(){
      
      await this.fetchTransferes()
      console.log(this.transferes)
       this.isLoading = false;


  
    },
    methods: {
      
      // ============ my actions => start=======================================
  
      ...mapActions(useBranchTransferStore, ['fetchTransferes']),


  
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
 
  
 
  
  
  </style>
  