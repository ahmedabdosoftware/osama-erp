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
      <ShowDetails v-else-if="orderInfo" :orderInfo="orderInfo"  ></ShowDetails>

    </div>
   
    <div id="scrollUp" class="scrollUp"></div>
  </div>
</template>
  <script>

  import { mapState, mapActions } from 'pinia'
  import { useOrdersStore } from '@/store/order/orders.js';

  
  // ShowDetails
  import ShowDetails from "@/components/orders/ShowDetails.vue";
  
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
      ...mapState(useOrdersStore, ['orders']),
    },
    async created() {
      try {
        await this.fetchOrders();
        this.isLoading = false;
        console.log('Orders fetched:', this.orders);
        this.orderId = this.$route.params.orderId;
        console.log('Order ID:', this.orderId);
  
        this.orderInfo = this.orders.find(order => order.id === this.orderId);
        console.log('Order Info:', this.orderInfo);
        
        
        
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching orders:', error);
      }
    },
    
    methods: {
      ...mapActions(useOrdersStore, ['fetchOrders']),
      print() {
        window.print();
      },
      
    },
    data() {
      return {
        orderId: '',
        orderInfo: null,
        isLoading:true,
      };
    },
  };
  </script>
  <style scoped lang="scss">
  
            // global style in path =>  src/scss/global/_globalStyle.scss

  </style>
  