<template>
    <div class="details">
      <div class="title">
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
      <div :class="{ 'dark-mode-box': getDarkMode }" class="allContent">
        <div class="detailsContent">
          <div class="detailsContent__title">
            <p>تفاصيل المعاملة: (رقم الطلب: {{ transactionInfo.numberOfOrder }})</p>
        </div>
          <div class="detailsContent__transactionInfo">
            <div class="detailsContent__transactionInfo__date">
                <p>تاريخ المعاملة: {{ transactionInfo.date }}</p>
            </div>
            <div v-if="transactionInfo.amount" class="detailsContent__transactionInfo__general">
              <p>المستحق : {{ transactionInfo.amount }}</p>
              <p>الباقى: {{ remainingAmount }}</p>
            </div>
           
            <div class="detailsContent__transactionInfo__general">
              <p>نوع المعاملة: {{ transactionInfo.transactionType }}</p>
              <p>الحالة: {{transactionInfo.status }}</p>
            </div>
          </div>
          <div class="detailsContent__listTransactions">
            <div>
              <p>:الدفعات</p>
            </div>
            <div>
                <table class="table">
              <thead>
                <tr>
                  <th>المبلغ</th>
                  <th>تاريخ الدفع</th>
                </tr>
              </thead>
              <tbody v-if="transactionInfo.payments">
                <tr v-for="(payment, index) in transactionInfo.payments" :key="index">
                  <td>{{ payment.amount }}</td>
                  <td>{{ payment.transactionDate }}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <div class="detailsContent__note">
            <div class="detailsContent__note_title">
              <p>:الملاحظات</p>
            </div>
            <div class="detailsContent__note_cont">
              <p v-if="transactionInfo.notes">{{ transactionInfo.notes }}</p>
              <div v-else class="no-notes">
                <font-awesome-icon icon="sticky-note" size="4x" />
                <p>لا توجد ملاحظات</p>
              </div>
            </div>
          </div>
        </div>
        <div class="details__btns">
          <button @click.prevent="goBack">اغلاق</button>
        </div>
      </div>
     
      <div id="scrollUp" class="scrollUp"></div>
    </div>
  </template>
    <script>
    import { mapActions } from 'pinia';
    import { useTransactionsStore } from '@/store/transactions/transactions.js';
    
    export default {
      name: "DetailsTransaction",
      computed: {
        getDarkMode() {
          return this.$store.state.darkMode;
        },
        
        remainingAmount() {
          
          if (this.transactionInfo.amount && this.transactionInfo.payments) {
            const totalPayments = this.transactionInfo.payments.reduce((total, payment) => total + payment.amount, 0);
            return (this.transactionInfo.amount - totalPayments).toFixed(2);
            
          }else{
            return null
          }
        },
      },
      async created() {
         
        this.transactionId = this.$route.params.transactionId
        this.loadTransaction(this.transactionId);
      },
      methods: {
        ...mapActions(useTransactionsStore, ['fetchTransactionById']),

        async loadTransaction(transactionId) {
        const transaction = await this.fetchTransactionById(transactionId);
        if (transaction) {
            this.transactionInfo = transaction  
        }
    },
        print() {
          window.print();
        },
        goBack() {
          const layout = this.$route.meta.layout;
          const profileId = this.$route.params.profileId;
           if (layout === 'profileInDashboardLayout') {
            this.$router.push(`/dashboard/profile/${profileId}/financial`);
          } 
          else if (layout === 'profileOutDashboardLayout') {
            this.$router.push(`/profile/${profileId}/financial`);
          }
          else if (layout === 'DashboardLayout') {
            this.$router.push(`/dashboard/Order`);
          }
        }
      },
      data() {
        return {
          transactionId: '',
          transactionInfo: null,
        };
      }
    };
    </script>
      <style scoped lang="scss">
    .details {
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
    
    
    // **detailsContent section** => start
    
    //varibles
    
    $buttom_detailsContent_background:rgb(235, 229, 229);
    $buttom_font_detailsContent: 22px;
    $font_weight_detailsContent: 700;
    $border_detailsContent:2px solid rgb(71, 71, 71);
    $buttom_color_detailsContent: black;
    $buttom_font: 19px;
    
    
    //reset => normalize 
    *{
      margin: 0px;
    }
    
    
    //extends
    
    %btn-style{
      text-align: center;
      font-size: $buttom_font;
      border-radius: 5px;
      border: none;
      font-weight: 500;
      background-color: $buttom_color_detailsContent;
      color: white;
      cursor: pointer;
    
    }
    
    %use_flex{
      display: flex;
      flex-wrap: wrap;
    }
    %p_common{
     
        text-align: end;
        padding-right: 10px;
        line-height: 50px;
        color: rgb(128, 128, 128);
  
        font: {
          size:18px;
          weight:600;
          family: Arial, Helvetica, sans-serif;
        }
    }
  
  
    %center_flex{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    %btn-style_detailsContent{
      text-align: center;
      font-size: $buttom_font_detailsContent;
      border-radius: 5px;
      border: none;
      font-weight: 700;
      background-color:$buttom_detailsContent_background;
      color: block;
      cursor: pointer;
    
    }
    
    %font{
      font: {
          size:19px;
          weight:600;
        }
    }
    
    .detailsContent{
     // background-color: rgb(173, 62, 173);
      @extend %use_flex;
      justify-content:center;
      align-content: space-evenly;
      width: 60%;
      min-height:70vh;
      margin: auto;
      margin-top: 32px;
      border :$border_detailsContent;
      border-radius: 5px;
  
    }
    .detailsContent >div{
      width: 100%;
    }
    .detailsContent__title{
      height: 50px;
      border-bottom: 1px solid rgb(236, 235, 235);
      //background-color: rgb(153, 69, 69);
      p{
          @extend %p_common;
      }
      
    }
    .detailsContent__transactionInfo{
    //  background-color: red;
      @extend %use_flex;
      justify-content: space-evenly;
      align-items: center;
      min-height: 200px;
      >div{
        width: 33%;
        height: 150px;
       // background-color: antiquewhite;
        p{
          @extend %p_common;
        }
       
      }
      .detailsContent__transactionInfo__date{
        width: 100%;
        height: 50px;
      //  background-color: silver;
        p{
        text-align: start;
        padding-left: 10px;
        }
  
      }
      
    }
    .detailsContent__listTransactions{
      //background-color: rgb(53, 58, 134);
      @extend %use_flex;
      min-height: 130px;
      margin-top: 25px;
      
      div:nth-child(1){
        width: 100%;
        height:50px ;
        // background-color: rgb(99, 93, 93);
        p{
          @extend %p_common;
          font-size: 24px;
        }
      }
      div:nth-child(2){
        
            @extend %use_flex;
            justify-content: center;
            width: 100%;
            min-height:80px ;
           // background-color: salmon;
            .table{
              width: 90%;
              height: 100%;
              border-collapse: collapse;
  
                tr{
                  height: 30px;
                  td,th{
                    border: $border_detailsContent;
                    text-align: center;
                  }
  
  
                  }
               }
            thead {
              border-radius: 10px;
              background-color: var(--popularCalar);
              
              th {
                color: white;
                height: 40px;
              }
            }
          }
    
    }
    
    .detailsContent__note{
      @extend %use_flex;
      min-height: 100px;  
      .detailsContent__note_title{
        width: 100%;
        height:50px ;
        p{
          @extend %p_common;
          font-size: 24px;
        }
      }
      .detailsContent__note_cont{
        width: 100%;
        min-height:50px;
        border-radius: 15px;
        p{
          @extend %p_common;
        }
  
      }
      .no-notes{
        @extend  %center_flex;
        width: 95%;
        margin: 0px 0px 10px 15px;
        min-height:50px;
        border-radius: 15px;
       
      }
    }
    .no-image,
    .no-notes {
      @extend  %use_flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;  
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 5px;
      margin-top: 10px;
      p{
        margin-top: 10px;
  
      }
  }
    .details__btns{
      @extend %use_flex;
      justify-content: flex-start;
      align-items: center;
      width: 60%;
      height: 120px;
  
      
      button{
        margin-left: 15px;
        width: 100px;
        height: 40px;
        border: $border_detailsContent;
        @extend %btn-style_detailsContent;
        background-color: var(--popularCalar);
        color: white;
  
      }
    
  }
  
    @media (max-width: 450px){
    
    // allContent
      .allContent{
        margin-left: 0%;
        width: 100%;
    
      }
     
    
    
    }
    
    
    
    // **fatora section** => end
    
    
    /* loader => start  */
    .lds-spinner {
      color: official;
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-spinner div {
      transform-origin: 40px 40px;
      animation: lds-spinner 1.2s linear infinite;
    }
    .lds-spinner div:after {
      content: " ";
      display: block;
      position: absolute;
      top: 3px;
      left: 37px;
      width: 6px;
      height: 18px;
      border-radius: 20%;
      background: rgb(27, 25, 25);
    }
    .lds-spinner div:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: -1.1s;
    }
    .lds-spinner div:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: -1s;
    }
    .lds-spinner div:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: -0.9s;
    }
    .lds-spinner div:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: -0.8s;
    }
    .lds-spinner div:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: -0.7s;
    }
    .lds-spinner div:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: -0.6s;
    }
    .lds-spinner div:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: -0.5s;
    }
    .lds-spinner div:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: -0.4s;
    }
    .lds-spinner div:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: -0.3s;
    }
    .lds-spinner div:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: -0.2s;
    }
    .lds-spinner div:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: -0.1s;
    }
    .lds-spinner div:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
    }
    @keyframes lds-spinner {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    #loader {
      width: 500px;
      height: 500px;
      visibility: hidden;
      /* background-color: slategray; */
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* loader => end  */
    .dark-mode-search {
      background-color: rgb(36, 36, 36);
      border: none !important;
      color: white !important;
    }
    .dark-mode {
      background-color: rgb(9, 9, 9) !important;
    }
    .dark-mode-title {
      color: white !important;
    }
    .dark-mode-box {
      background-color: black !important;
      box-shadow: 0 0 5px rgb(17, 16, 16);
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
      .detailsContent{
        width: 95%;
    }
    .detailsContent__transactionInfo{
        >div{
          width:100%;
      }
    }
  
    .details__btns{
      width: 80%;
    }
    }
    
    @media print{
      .title,.details__btns {
        display: none;
      }
    
      .detailsContent{
        margin-top: 0px;
        width: 650px;
        min-height:70vh;
    }
    
    }
    </style>
    