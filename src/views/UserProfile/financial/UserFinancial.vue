<template>
    <!-- /* eslint-disable */ -->
    <div class="page transactions">
      <div class="title--pagesInProfile">
          <div>
            <div>
             <div class="export">
                <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvEXj1Sr-tzeKuEP9PgzajIUDvR_-L-zfkg&usqp=CAU"
                />
                <button>export</button>
             </div>
              <router-link v-if="isAdmin"
              :to="generateRoute('AddFinancial')">
              <button class="add">+ add financial</button>
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
            <option value="adress">adress</option>
          </select>
          </div>
          <div :class="{ 'dark-mode-box': getDarkMode }">
            <div>
              <select placeholder="filter"  class="filter"  v-model="selectStatus">
                <option  value="all">الكل</option>
                <option value="مفتوح">مفتوح</option>
                <option value="منهى">منهى</option>
               
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
            <!-- /* eslint-disable */ -->
            <TableSkeleton v-if="isLoading" :rows="5" :columns="6" />
            <ListTable v-else-if="getTransactions.length > 0" :transactions="getTransactions" class="ListTable_cont"></ListTable>
            <NoData v-else context="transactions"></NoData>
     
      </div>
     
      <div id="scrollUp" class="scrollUp">
        <!-- <img
          src="data:image/png;base64,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"
        /> -->
      </div>
    </div>
  </template>
  

  <script>
  import { mapState, mapActions } from 'pinia'
  
  //store
  import { useTransactionsStore } from '@/store/transactions/transactions.js';
  import { useUserStore } from '@/store/auth/auth.js';
  
  // componnents
    // ListTable
    import ListTable from "@/components/users/financial/ListTable.vue";
    // NoData
  import NoData from "@/shared/components/noData/NoData.vue";
    // Skeleton Table
  import TableSkeleton from '@/shared/components/loading/skeletonLoader/TableSkeleton.vue';

  
  export default {
    name: "Transactions",
    components: {
      ListTable,
      NoData,
      TableSkeleton,
    },
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
      ...mapState(useTransactionsStore, ['userTransactions']),
  
      // ============ filter => start=======================================
      ...mapState(useUserStore, ['isAdmin']),

      getTransactions() {
        let filteredTransactions = this.userTransactions
        
        if (this.selectStatus !== 'all') {
          filteredTransactions = filteredTransactions.filter(
            transaction => transaction.status == this.selectStatus
          );
        }
        
        if (this.searchQuery) {
          filteredTransactions = filteredTransactions.filter(transaction => {
            const valueToSearch = transaction[this.selectedFilter].toString().toLowerCase();
            return valueToSearch.includes(this.searchQuery.toLowerCase());
          });
        }
          
        return filteredTransactions;
      }

// ============ filter => end=======================================

    },
   async created() {
      this.profileId = this.$route.params.profileId;
      await this.fetchTransactionsByUserId(this.profileId );
      this.isLoading = false;

    },
    methods: {
      ...mapActions(useTransactionsStore, ['fetchTransactionsByUserId']),
      generateRoute(section) {
      const layout = this.$route.meta.layout;

      if (layout === 'DashboardLayout') {
        
        return `/dashboard/profile/${this.profileId}/${section}`;
      } else if (layout === 'profileInDashboardLayout') {
        return `/dashboard/profile/${this.profileId}/${section}`;
      } else if (layout === 'profileOutDashboardLayout') {
        return `/profile/${this.profileId}/${section}`;
      }
    },
      showScrollUp() {
        let Buttom = document.getElementById("scrollUp");
        window.onscroll = function () {
          Buttom.style.visibility = scrollY >= 500 ? "visible" : "hidden";
        };
      },
    },
    data() {
      return {
        searchQuery: '',
        selectStatus: 'all',
        selectedFilter: 'date',
        profileId: null,
        isLoading: true,

      };
    },
  };
  </script> 
  <style scoped lang="scss">
  
  
  .title--pagesInProfile {
    width: 100%;
    height: 180px;
   // background-color: sandybrown;
    display: flex;
    flex-wrap: wrap;
    > div:first-child {
      //background-color: rgb(17, 141, 120);
      width: 100%;
      height: 60%;
      display: flex;
      flex-direction: row ;
      justify-content: flex-end ;
      align-items: center ;

      > div:first-child {
        width: 340px;
        height: 80px;
      //  background-color: greenyellow;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        > div {
          width: 100px;
          height: 40px;
          background-color: white;
           //background-color: black;
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
    > div:nth-of-type(2) {
      width: 96%;
      height: 40%;
      margin-left: 4%;
      background-color: white;
      //background-color: rgb(129, 76, 19);
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      display: flex;
      justify-content: space-between ;
      align-items: center;
      div:first-child{
        display: flex;
        justify-content: space-evenly ;
        align-items: center;
        height: 100%;
        width: 350px;
         //background-color: red;
        select {
          // margin-right: 400px;
          border-radius: 5px;
          height: 30px;
          width: 100px;
          text-transform: capitalize;
          color: black;
          border: solid 2px rgb(233, 230, 230);
        }
        input {
          height: 30px;
          width: 200px;
          padding-left: 5px;
          color: black;
          border: solid 2px rgb(233, 230, 230);
          border-radius: 5px;
        }
        input:focus {
          outline: none;
        }
      }
      > div:nth-child(2) {
        width: 350px;
        height: 40px;
         //background-color: red;
         display: flex;
         justify-content: space-evenly;
         align-items: center;
         select {
          border-radius: 5px;
          height: 30px;
          text-transform: capitalize;
          color: black;
          border: solid 2px rgb(233, 230, 230);
          width: 100% !important;

        }
         div {
           width: 140px;
           display: flex;
           justify-content: space-evenly;
           align-items: center;
           height: 80%;
           border-radius: 3px;
           background-color: white;
          border: 2px solid rgb(222, 218, 218);
          button {
            background-color: white;
          }

        }
      }
    }
  }
 
 
  
@media (max-width: 477px) {
  .allContent {
    margin-bottom: 250px;
  }
 
 
}

  
.title--pagesInProfile {

> div:nth-child(2) {
   >div:first-child {
    width: 210px;
  
    input {
    margin-left: 4px;
    width: 100px;
    
  }
  select{
    width: 70px;

  }
  }
  > div:nth-of-type(2) {
    
    > div {
      width: 70px;
      button {
        width: 70px;
        font-size: 11px;
      }
      img {
        width: 16px;
        height: 16px;
        margin-left: 3px;
        margin-right: 3px;
      }
    }
    >div:nth-child(2){
      width: 90px;


    }
  }
}

}

  
  </style>
  