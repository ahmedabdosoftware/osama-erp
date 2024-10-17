<template>
    <!-- /* eslint-disable */ -->
    <div class="page Branches">
      <div class="title">
        <div>
          <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
              />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }">Branches grid</p>
          </div>
          <div>
            <div class="export">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
              />
              <button>export</button>
            </div>
            <router-link to="/dashboard/AddNewBranch">
              <button class="add">+ add Branch</button>
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
            <option value="nameBranch">name Branch</option>
            <option value="location"> location</option>
          </select>
          </div>
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <select placeholder="filter"  class="filter"  v-model="selectStatus">
                <option  value="all">الكل</option>
                <option value="0">قديم</option>
                <option value="1">جديد</option>
                <option value="3">مؤقت</option>
               
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
        <ListTable v-else-if="getBranches.length > 0" :Branches="getBranches"  class="ListTable_cont"></ListTable>
        <NoData v-else  context="storage"></NoData>
     
      </div>
      
    </div>
  </template>
  <script>
  
  // actions 
  import {  mapState , mapActions } from 'pinia'
  //store

  //store
  import { useBranchesStore } from '@/store/branches/branches.js';

  // ListTable
  import ListTable from "@/components/branches/ListTable.vue";
  
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

      ...mapState(useBranchesStore, ['branches']),
  
    // ============ filter => start=======================================
          
       getBranches() {
            let filteredBranches = this.branches;
            
            // فلترة حسب الحالة
            if (this.selectStatus !== 'all') {
              filteredBranches = filteredBranches.filter(
                branch => branch.status == this.selectStatus
              );
            }
            
              // البحث
          if (this.searchQuery) {
            filteredBranches = filteredBranches.filter(branch => {
              const valueToSearch = branch[this.selectedFilter].toString().toLowerCase();
              console.log(branch[this.selectedFilter].toString().toLowerCase())
              return valueToSearch.includes(this.searchQuery.toLowerCase());
            });
          }
                       
            return filteredBranches;
          }
    // ============ filter => end=======================================
     
    },
    async created(){
      
      await this.fetchBranches()
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
        selectedFilter: 'date',
        isLoading: true,

        
      };
    },
   
   
  };
  </script>
  <style scoped lang="scss">
  
   // global style
 
  </style>
  