<template>
    <div class="contPro" >
      <div>
        <div>
          <img :src="oneProduct.imageUrl" />
        </div>
        <div>
          <span> {{ oneProduct.name  }}</span>
          <p class="descrption">{{ oneProduct.description  }}</p>  
          <div class="cont-price">
            <span  v-if="oneProduct.offerPrice" class="inSaleBefore">{{ oneProduct.priceMaterial }} : سعرال{{ oneProduct.unitName.name }}</span>
            <span  v-if="oneProduct.offerPrice" class="inSaleAfter">{{ oneProduct.offerPrice }} : سعرال{{ oneProduct.unitName.name }}</span>
            <span  v-if="!oneProduct.offerPrice" class="outSale">{{ oneProduct.priceMaterial }} : سعرال{{ oneProduct.unitName.name }}</span>
            <span  v-if="oneProduct.priceWithLabor && oneProduct.showLaborPrice">{{ oneProduct.priceWithLabor }} $ مصنعية</span>
          </div>
         
        </div>
      </div>

      <div class="askForOrder">
        <button @click="DetailsPage(oneProduct.id)" class="ask"> {{lannguage.detailsProduct}}</button>
        <button class="ask ask_whats"> 
          <p>{{lannguage.askByWats}}</p>
          <img src="../../assets/images/whatsapp.png">
        </button>
      </div>
      <div v-if="oneProduct.offerPrice" class="sale_cont">
        <img src="../../assets/images/salePro.png">
      </div>
    </div>
  </template>
  
  <script>
  
    
  export default {
    name: "BoxProduct",
    props: ["oneProduct"],
    computed: {
      lannguage () {
        // console.log( this.$store.getters.isLogin)
        return this.$store.getters.catchLang
      },
      myLanguage () {
          return this.$store.getters.myLanguage
      },
     
    },
    methods: {
      DetailsPage(ProductId){
        this.$router.push({ name: 'ProductDatials', params: { ProductId:ProductId } });

      }
     },
    
  };
  </script>
  
  
  <style scoped lang="scss">
  $main_color: #254178;
  * {
    padding: 0%;
    margin: 0px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
  .contPro {
    width: 300px;
    height: 470px;
    display: flex;
    /* background-color: red; */
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  /* cont one product */
  .contPro > div:first-child {
    width: 100%;
    height:77%;
    background-color: white;
    box-shadow: 0 0 5px rgb(210, 205, 205);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    /* background-color: red; */
    //background-color: red; 
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    span{
      font: {
        size: 18px;
        weight:600;
      }
    }
  }
  
  /* cont img => product */
  .contPro > div:first-child > div:first-child {
    width: 90%;
    height: 59%;
    background-color: rgb(194, 191, 191);
    //background-color:rgb(141, 28, 28); 
    border-radius: 15px;
    position: relative;
  }
  /*img => product */
  .contPro > div:first-child > div:first-child img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
  
  /* cont all descrption, name ....etc */
  .contPro > div:first-child > div:nth-child(2) {
    width: 100%;
    height: 41%;
    // background-color:rgb(210, 49, 49) ; 
    padding: 0px 20px 0px 0px ;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    position: relative;
      
    span{
      display: block;
      width: 100%;    
    }
  }


  /* details */
  /* price and  short descrption */

.cont-price{
    width: 100%;
    height: 60px;
   // background-color: sienna;
    display: flex;
    justify-content: space-evenly;
    span{
      text-transform: capitalize;
      color:  $main_color;
      font-size: 18px;
    }
  
  }
  
  
  p,span{
    margin-top: 10px;
    text-align: end;

  }
  
  .descrption {
    font-size: 14px;
    width: 100%;
    text-align: end;
  }
  

.askForOrder{
  width: 100%;
  height:19%;
  //background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
}
/*no use until now 
u can use it in buy buttom */

.ask {
    border: solid 2px rgb(233, 230, 230);
    width: 80%;
    height: 40px;
    background-color: $main_color;
    cursor: pointer;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    text-transform: capitalize;
    color: white;

    &:hover {
        color: $main_color;
        background-color: white;

     }
    }
    .ask::first-letter {
    font-weight: 500;
    font-size: 19px;
  }
  .ask_whats{
    background-color: green;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    p{
      padding-bottom: 5px;
    }
    img{
      width: 30px;
      height: 30px;
    }

  }
  .sale_cont{
    position: absolute;
    left:50%;
    transform:translate(-50%);
    top:5px;
    width: 60px;
    height: 60px;
   // border-radius: 50%;
    
    //    background-color: green;
    img{
   // border-radius: 50%;
      width: 60px;
      height: 60px;   
    }

  }
  .inSaleBefore{
    text-decoration: line-through;
  }
  </style>
  