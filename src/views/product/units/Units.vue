<template>
    <!-- /* eslint-disable */ -->
    <div class="page units">
      <div class="title--noFilterSearch">
        <div>
          <div class="contTitle">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfifgpU6f6DdemdITBpg_essXRVuwWFaTnhJgl9QGDvchprPgRpZFDLgAZhDRlBiYvEd8&usqp=CAU"
              />
            </div>
            <p :class=" { 'dark-mode-title': getDarkMode } ">units grid</p>
          </div>
          <div>
            <div class="export">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
              />
              <button>export</button>
            </div>
            <router-link to="/dashboard/AddUnit">
              <button class="add">+ add unit</button>
            </router-link>
          </div>
        </div>
        <div :class="{ 'dark-mode-box': getDarkMode }">
          <input
            :class="{ 'dark-mode-search': getDarkMode }"
            placeholder="search"
            type="search"
            v-model="searchQuery"
  
          />
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <button>units</button>
              <img
                class="arroow point"
                src="data:image/png;base64,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"
              />
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
      <unitList v-else-if="getUnits.length > 0" :units="getUnits" class="ListTable_cont"></unitList>
      <NoData v-else context="units"></NoData>
      
      </div>
     
    </div>
  </template>
  
  <script>
  
  // actions 
  import {  mapState , mapActions } from 'pinia'
  //store
  import { useUnitsStore } from '@/store/products/units/units.js';

  // unitList
  import unitList from "@/components/products/units/unitList.vue";
  
  // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';
 
  // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
  
  export default {
    name: "Units",
    components: {
      unitList,
      NoData,
      TableSkeleton,
    },
    computed: {

      getDarkMode() {
        return this.$store.state.darkMode;
      },

    ...mapState(useUnitsStore, ['units']),  

    // ============ filter => start=======================================
          

    getUnits() {
      const query = this.searchQuery.toLowerCase();
      if (!query) {
        return this.units;
      }
      return this.units.filter(unit =>
        unit.name.toLowerCase().includes(query)
      );
    }
    // ============ filter => end=======================================
     
    },
    methods: {
        ...mapActions(useUnitsStore, ['fetchUnits']),
    },
    async created() {
    await this.fetchUnits();
    this.isLoading = false;
    },
    data() {
      return {
        searchQuery: '',
        isLoading: true,

        
      };
    },
   
   
  };
  </script>
  
  <style scoped lang="scss"> 
  
  .allContent {
    margin-top: 2px;
  }
  .allContent > div  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    min-height: 380px;
    // background-color: red;
  }
  
  
  
  
  // phone
  @media (max-width: 477px) {
    .title {
      > div:nth-of-type(2) {
        input {
          width: 130px;
        }
      }
    }
  
   
  }
  </style>
  