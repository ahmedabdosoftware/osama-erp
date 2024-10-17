<template>
    <div class="details">
      <div class="details_title">
        <div>
          <div class="contTitle">
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU" />
            </div>
            <p :class="{ 'dark-mode-title': getDarkMode }">Details grid</p>
          </div>
          <div>
            <div class="export">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU" />
              <button>png</button>
            </div>
            <button @click="print" class="generate">
              <font-awesome-icon class="printIcon" icon="fa-solid fa-print" />
              <p>print</p>
            </button>
          </div>
        </div>
      </div>
  
      <div :class="{ 'dark-mode-box': getDarkMode }" class="details_allContent">
        <DetailsSkeleton v-if="isLoading" />
        <ShowDetails v-else-if="returnsInfo" :returnsInfo="returnsInfo"  ></ShowDetails>
  
      </div>
     
    </div>
  </template>
    <script>
  
    import { mapState, mapActions } from 'pinia'
    import { useReturnsStore } from '@/store/purchaseReturns/returns.js';
  
    
    // ShowDetails
    import ShowDetails from "@/components/returns/ShowDetails.vue";
    
    // Skeleton Details 
    import DetailsSkeleton from '@/shared/components/loading/skeletonLoader/DetailsSkeleton.vue';
   
    
    export default {
      name: "DetailsReturn",
      components: {
        DetailsSkeleton,
        ShowDetails,
      },
      computed: {
        getDarkMode() {
          return this.$store.state.darkMode;
        },
        ...mapState(useReturnsStore, ['returns']),
      },
      async created() {
        try {
          await this.fetchAllReturns();
          this.isLoading = false;
          console.log('returns fetched:', this.returns);
          this.returnId = this.$route.params.returnId;
          console.log('returnId ID:', this.returnId);
    
          this.returnsInfo = this.returns.find(ret => ret.id === this.returnId);
          console.log('returns Info:', this.returnsInfo);
          
          
          
        } catch (error) {
          this.isLoading = false;
          console.error('Error fetching returns:', error);
        }
      },
      
      methods: {
        ...mapActions(useReturnsStore, ['fetchAllReturns']),
        print() {
          window.print();
        },
        
      },
      data() {
        return {
            returnId: '',
            returnsInfo: null,
            isLoading:true,
        };
      },
    };
    </script>
    <style scoped lang="scss">
    
          // global style in path =>  src/scss/global/_globalStyle.scss

    </style>
    