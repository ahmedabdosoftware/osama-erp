<template>
  <!-- /* eslint-disable */ -->
  <div class="fatora">
    <div class="title">
      <div>
        <div class="contTitle">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
            />
          </div>
          <p :class="{ 'dark-mode-title': getDarkMode }">Fatora grid</p>
        </div>
        <div>
          <div class="export">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
            />
            <button>png</button>
          </div>
         
            <button @click="print" class="generate">
              <font-awesome-icon class="printIcon" icon="fa-solid fa-print" />
              <p>print</p> 
            </button>
         
        </div>
      </div>

    </div>

    <div :class="{ 'dark-mode-box': getDarkMode }" class="allContent">

      <DetailsSkeleton v-if="isLoading" />
      <ShowFatoora v-else-if="orderInfo" :orderInfo="orderInfo" :isCustomized="isCustomized" ></ShowFatoora>

    </div>
    
    <div id="scrollUp" class="scrollUp">
      
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useOrdersStore } from '@/store/order/orders.js';

  // ShowFatoora
  import ShowFatoora from "@/components/orders/ShowFatoora.vue";
  
  // Skeleton Details 
  import DetailsSkeleton from '@/shared/components/loading/skeletonLoader/DetailsSkeleton.vue';
 
  
export default {
  name: "Fatora",
  components: {
    DetailsSkeleton,
    ShowFatoora,
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
    ...mapState(useOrdersStore, ['orders']),
   
  },
  async created() {
    
    console.log('before fetched:', this.orders);
    try {
      await this.fetchOrders();
      this.isLoading = false;

      console.log('Orders fetched:', this.orders);
      this.orderId = this.$route.params.orderId;
      this.isCustomized = this.$route.params.isCustom

      console.log('Order ID:', this.orderId);
      console.log('isCustomized Param:', this.isCustomized);

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
      isCustomized: false, // حالة لتحديد نوع الفاتورة


    };
  },
};
</script>
<style scoped lang="scss">
.fatora {
 // background-color: aqua;
  display: flex;
  flex-wrap: wrap;
}

.title {
  width: 100%;
  height: 80px;
 // background-color: sandybrown;
  display: flex;
  flex-wrap: wrap;
  > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //background-color: rgb(21, 97, 107);
    > div:first-child {
      height: 40px;
      background-color: blue;
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
  min-height: 550px;
  background-color: white;
  //background-color: rgb(207, 70, 70);
  margin-bottom: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  margin-left: 4%;
}

%center_flex{
  display: flex;
  align-items: center;
  justify-content: center;
}

.generate {
    @extend  %center_flex;

    width: 140px;
    height: 40px;
    background-color: blue;
    cursor: pointer;
    border-radius: 5px;
    .printIcon{
      width: 20px;
      height: 20px;
    }

  p {
    font-size: 17px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    text-transform: capitalize;
    color: white;
    margin-left: 10px;
  }
}
.generate p::first-letter {
  font-weight: 500;
  font-size: 19px;
}

@media (max-width: 477px) {
 

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

@media print{
  .title,.fatoora__btns {
    display: none ;
  }

 
  

}
</style>
