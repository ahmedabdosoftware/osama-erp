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
        <ShowDetails v-else-if="branchInfo" :branchInfo="branchInfo"  ></ShowDetails>
  
      </div>
     
    </div>
  </template>
    <script>
  
    import { mapState, mapActions } from 'pinia'
    import { useBranchesStore } from '@/store/branches/branches.js';
  
    
    // ShowDetails
    import ShowDetails from "@/components/branches/ShowDetails.vue";
    
    // Skeleton Details 
    import DetailsSkeleton from '@/shared/components/loading/skeletonLoader/DetailsSkeleton.vue';
   
    
    export default {
      name: "DetailsOrder",
      components: {
        DetailsSkeleton,
        ShowDetails,
      },
      computed: {
        getDarkMode() {
          return this.$store.state.darkMode;
        },
        ...mapState(useBranchesStore, ['branches']),
      },
      async created() {
        try {
          await this.fetchBranches();
          this.isLoading = false;
          console.log('branches fetched:', this.branches);
          this.branchId = this.$route.params.branchId;
          console.log('branch ID:', this.branchId);
    
          this.branchInfo = this.branches.find(branch => branch.id === this.branchId);
          console.log('branch Info:', this.branchInfo);
          
          
          
        } catch (error) {
          this.isLoading = false;
          console.error('Error fetching branches:', error);
        }
      },
      
      methods: {
        ...mapActions(useBranchesStore, ['fetchBranches']),
        print() {
          window.print();
        },
        
      },
      data() {
        return {
          branchId: '',
          branchInfo: null,
          isLoading:true,
        };
      },
    };
    </script>
    <style scoped lang="scss">
    
          // global style in path =>  src/scss/global/_globalStyle.scss

    </style>
    