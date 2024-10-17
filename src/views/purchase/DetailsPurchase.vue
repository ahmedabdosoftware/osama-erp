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
        <ShowDetails v-else-if="purchaseInfo" :purchaseInfo="purchaseInfo"  ></ShowDetails>
  
      </div>
     
    </div>
  </template>
    <script>
  
    import { mapState, mapActions } from 'pinia'
    import { usePurchasesStore } from '@/store/purchases/purchase.js';
  
    
    // ShowDetails
    import ShowDetails from "@/components/purchases/ShowDetails.vue";
    
    // Skeleton Details 
    import DetailsSkeleton from '@/shared/components/loading/skeletonLoader/DetailsSkeleton.vue';
   
    
    export default {
      name: "DetailsPurchase",
      components: {
        DetailsSkeleton,
        ShowDetails,
      },
      computed: {
        getDarkMode() {
          return this.$store.state.darkMode;
        },
        ...mapState(usePurchasesStore, ['purchases']),
      },
      async created() {
        try {
          await this.fetchPurchases();
          this.isLoading = false;
          console.log('purchases fetched:', this.purchases);
          this.purchaseId = this.$route.params.purchasesId;
          console.log('purchase ID:', this.purchaseId);
    
          this.purchaseInfo = this.purchases.find(purchase => purchase.id === this.purchaseId);
          console.log('purchase Info:', this.purchaseInfo);
          
          
          
        } catch (error) {
          this.isLoading = false;
          console.error('Error fetching purchase:', error);
        }
      },
      
      methods: {
        ...mapActions(usePurchasesStore, ['fetchPurchases']),
        print() {
          window.print();
        },
        
      },
      data() {
        return {
            purchaseId: '',
            purchaseInfo: null,
            isLoading:true,
        };
      },
    };
    </script>
    <style scoped lang="scss">
    
          // global style in path =>  src/scss/global/_globalStyle.scss

    </style>
    