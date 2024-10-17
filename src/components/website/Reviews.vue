<template>
     <div class="reviews">
      <div class="tittle" :data-lang="myLanguage">
        <span>{{lannguage.reviews}}</span>
      </div>
      <swiper
  

        :slidesPerView="'auto'"
        :spaceBetween="30"
        :pagination="{ clickable: true }"
        :modules="moduless"
        class="content revContent"
      >
        <swiper-slide :data-lang="myLanguage" class="componnent">
          <img src="../assets/images/collectionstars.svg">
          <p>{{ lannguage.review1 }}</p>
          <div>
            <img src="../assets/images/clinetA.png">
            <p>{{ lannguage.review1Author }}</p>
            <span>{{ lannguage.review1Role }}</span>
          </div>
        </swiper-slide>

        <swiper-slide :data-lang="myLanguage" class="componnent">
          <img src="../assets/images/collectionstars.svg">
          <p>{{ lannguage.review2 }}</p>
          <div>
            <img src="../assets/images/clinetB.png">
            <p>{{ lannguage.review2Author }}</p>
            <span>{{ lannguage.review2Role }}</span>
          </div>
        </swiper-slide>

        <swiper-slide :data-lang="myLanguage" class="componnent">
          <img src="../assets/images/collectionstars.svg">
          <p>{{ lannguage.review3 }}</p>
          <div>
            <img src="../assets/images/clinetC.png">
            <p>{{ lannguage.review3Author }}</p>
            <span>{{ lannguage.review3Role }}</span>
          </div>
        </swiper-slide>
        <swiper-slide :data-lang="myLanguage" class="componnent">
          <img src="../assets/images/collectionstars.svg">
          <p>{{ lannguage.review6 }}</p>
          <div>
            <img class="cli"  src="data:image/jpeg;base64,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">
            <p>{{ lannguage.review6Author }}</p>
            <span>{{ lannguage.review6Role }}</span>
          </div>
        </swiper-slide>
        <swiper-slide :data-lang="myLanguage" class="componnent">
          <img src="../assets/images/collectionstars.svg">
          <p>{{ lannguage.review4 }}</p>
          <div>
            <img class="cli"  src="data:image/jpeg;base64,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">
            <p>{{ lannguage.review4Author }}</p>
            <span>{{ lannguage.review4Role }}</span>
          </div>
        </swiper-slide>
        <swiper-slide :data-lang="myLanguage" class="componnent">
          <img src="../assets/images/collectionstars.svg">
          <p>{{ lannguage.review5 }}</p>
          <div>
            <img class="cli" src="data:image/jpeg;base64,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">
            <p>{{ lannguage.review5Author }}</p>
            <span>{{ lannguage.review5Role }}</span>
          </div>
        </swiper-slide>

      </swiper>
    </div>
    
</template>
  
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // import required modules
  import { Navigation, Pagination  } from 'swiper/modules';
  
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/grid';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  
  export default {
    name: 'BackgroundApp',
    props: {
    },
    data(){
      return{
        moduless: [Pagination,Navigation],
  
          }
        },
    components: { 
      Swiper,
      SwiperSlide,
    },
    computed: {
      lannguage () {
        // console.log( this.$store.getters.isLogin)
        return this.$store.getters.catchLang
    },
      myLanguage () {
        return this.$store.getters.myLanguage
    },
      
    },
  
  }
  </script>
  
  <style scoped lang="scss">
    
.reviews{
  width: 100%;
  height: 400px;
 // background-color: rgb(202, 184, 20);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;


}
//style for english

.tittle{
  width: 100%;
  height: 60px;
  text-align: start;
  line-height: 70px;
  font-size: 20px ;
  font-weight: 600;
  padding-left: 75px;
  text-transform: uppercase;
  //background-color: sandybrown;
  
}
//style for arabic
.tittle[data-lang="Ar"]{
  text-align: end;  
  padding-right: 80px;
}
.content{
    width: 90%;
    height: 320px !important;
    //background-color: #254178 !important;
    display: flex;
    flex-wrap: wrap;
  .componnent{
    width: 530px !important;
    height: 255px !important;
   // background-color: #3A3737;
    border-radius: 7px;
    margin-left: 6px;
    margin-top:20px;
  }

}
//style for english
//:data-lang="myLanguage"
.componnent[data-lang="En"]{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-left: 25px;
  box-shadow: 0px 2px 20px 0px #00000040;
  >img{
    width:30% !important;
    height:30px;
    //background-color: red;
  }
  >p{
    font-weight: 600;
    color:black;
    text-align: start;
    //background-color: salmon;
  }
  >div{
    width: 70%;
    height: 77px;
    //background-color: salmon;
    display: grid;
    grid-template-columns: repeat(3,60px);
    grid-template-rows: repeat(2,30px);
  }

}
//style for arabic
.componnent[data-lang="Ar"]{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 25px;
  box-shadow: 0px 2px 20px 0px #00000040;
  align-items: flex-end;
  >img{
    width:30% !important;
    height:30px;
    //background-color: red;
  }
  >p{
    font-weight: 600;
    color:black;
   // background-color: rgb(73, 4, 47);
    text-align: end;
    padding-right: 20px;
  }

 >div{

    width: 70%;
    height: 77px;
    //background-color: salmon;
    display: grid;
    grid-template-columns: repeat(3,60px);
    grid-template-rows: repeat(2,30px);
    align-content: center;
    justify-content: end;
    align-items: normal;
    justify-items: center;
 }

}

.cli{
  clip-path: circle();
}



.componnent >div >img{
  width: 80%;
  height: 80%;
  justify-self: center;
  align-self: center;
  grid-area:1/1/3/2 ;
  //background-color: #202224
}
.componnent >div >p{
  
  grid-area:1/2/2/4 ;
  //background-color: #1f5386 !important;
 align-self:end;
 text-align: start;
  font-weight: 600;
  color: black;
}
.componnent >div >span{
  
  grid-area:2/2/3/3 ;
  //background-color: #1f5386;
  text-align: start;
  align-self:start;
}
.special{
  box-shadow: 0px 2px 20px 0px #33333340;

}



/* media => phone ultra*/
@media(max-width:450px){


.content{
  .componnent[data-lang="En"]{
  //background-color: rgb(10, 175, 24) !important;
  width: 350px !important;
  
}
.componnent[data-lang="Ar"]{
 // background-color: rgb(22, 21, 87) !important;
  width: 340px !important;

}

}
.componnent{
  >img{
    margin-left: 0px;
  }
  }
  .reviews{
    margin-top:22px;
  }
}

   
  </style>
  