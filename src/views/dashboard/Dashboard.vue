<template>
  <!-- /* eslint-disable */ -->
  <div class="page dashboard">
    <div class="dashboard_title">
      <div>
        <div class="contTitle">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQUVkx6lAgtb3-3fMuDZnDixihOSrrNSAOg&usqp=CAU"
            />
          </div>
          <p :class="{ 'dark-mode-title': getDarkMode }">dashboard grid</p>
        </div>  
      </div>
      <WelcomeMessage  />
    </div>
    <StatisticsInfo  />
    <TodayOrder  />
    <StockAlert  />
    <PurchasesUnpaid />
  </div>
</template>

<script>

// components

  // statistics
  import StatisticsInfo from "@/components/dashboard/statistics/StatisticsInfo.vue";

  // todayOrder
  import TodayOrder from "@/components/dashboard/TodayOrder.vue";
  
  // StockAlert
  import StockAlert from "@/components/dashboard/StockAlert.vue";
  
  // WelcomeMessage
  import WelcomeMessage from "@/components/dashboard/WelcomeMessage.vue";

  //Purchases
  import PurchasesUnpaid from "@/components/dashboard/PurchasesUnpaid.vue";

export default {
  name: "dashboard",
  components: {
    StatisticsInfo,
    TodayOrder,
    StockAlert,
    WelcomeMessage,
    PurchasesUnpaid,
  },
  computed: {

    getDarkMode() {
      return this.$store.state.darkMode;
    },


  
  },
  async created(){
    
 
  },
  methods: {
    
 
  },
  data() {
    return {
     
      
    };
  },
 
 
};
</script>

<style scoped lang="scss">


.dashboard_title {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  > div:first-child {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:first-child {
      background-color: blue;
      height: 40px;
      width: 220px;
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
   
  }
  
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
