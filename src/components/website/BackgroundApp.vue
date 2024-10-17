<template>
  <div :data-lang="myLanguage" class="BackgroundApp">

    <div class="BackgroundApp_contContent">
      <p> {{lannguage.textBackground}}</p>
      <p>{{lannguage.textBackgroundDown}}</p>
     <div>
       <button> {{lannguage.lastestProjects}}</button>
       <button> {{lannguage.contact}}</button>
     </div>
  </div>
  <div class="BackgroundApp_contSwiper">
      <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay=" {
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination= "{
        clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
    >
       <swiper-slide class="swiper-slide first">
         <img src="https://image.slidesdocs.com/responsive-images/background/modern-living-room-decor-in-india-for-the-home-designer-powerpoint-background_3a96a0d151__960_540.jpg" />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <img src="../assets/images/ai1.png" />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <img src="../assets/images/ai2.png" />
     </swiper-slide>
      <swiper-slide class="swiper-slide">
        <img src="../assets/images/ai3.png" />
     </swiper-slide>
      
    </swiper>
  </div>
   

  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import required modules
import { Navigation, Pagination ,Autoplay } from 'swiper/modules';

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
      modules: [ Autoplay, Pagination,Navigation],

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

%flex {
  display: flex;
  flex-wrap: wrap;
}
%flex_center {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
$bg-dark: rgb(42, 42, 112);
.BackgroundApp{
  // fill his parent
  width: 100%;
  height: 100%;
  //background-color: rgb(97, 82, 82);
  background-image: url("../assets/images/hero-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  @extend %flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  
}


.BackgroundApp_contContent{
  @extend %flex;
  flex-direction: column;
  align-items: center;
  width:45%;
  height: 450px;
  color: white;
 // background-color: skyblue;
  >p{
    text-align: start;
  }
  >p::first-letter{
   text-transform: capitalize;
  }
  >p:first-child{
    font: {
      size:40px;
      weight:600 ;
      
      
    }
  }
  
  >p:nth-child(2){
    margin-top: 20px;
    //background-color: red;
    text-align: start;
    line-height: 40px;

    font: {
      size:24px;
      weight:600 ;
    }
  }
  >div{
    width: 100%;
    height: 120px;
    @extend %flex;
    justify-content: flex-start;
    align-items: flex-end;
    

    button{
      width: 180px;
      height: 70px;
      border-radius: 25px;
      cursor: pointer;
      border: white 3px solid;
      transition:transform 200ms ease-in-out ;
      &:hover {
       transform: translateY(-10px);
     }

      
      font: {
        size:20px;
        weight:600 ;
        text-transform: capitalize;   
      }
      
    }
    button:first-child{
      width: 320px;
      margin-right: 15px;
      background-color: white;
      color:$bg-dark;
    }
    button:nth-child(2){
      color: white;
      background-color: $bg-dark;
      &:hover {
        color: $bg-dark;
        background-color: white;

     }

    }
  }
}

.BackgroundApp_contSwiper{
  width:45%;
  height: 500px;
 // background-color: rgb(79, 101, 109);
  
}

.mySwiper{
  //background-color: rgb(79, 101, 109);
  // fill his parent
  width: 100%;
  height: 100%;
  
}
.swiper-slide{
  width: 100%;
  height: 90%;
  img{
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }
}


::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  color: white;
  background-color: $bg-dark;
  padding: 10px;
  width: 65px ;
  height: 65px ;
  border-radius: 50% ;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: white;
    color: $bg-dark;
  }
}



// arabic style

.BackgroundApp[data-lang="Ar"]{
  .BackgroundApp_contContent{

    order:2;
    //background-color: red;
    
    p{
      width: 100%;
      text-align: end;
     // background-color: rgb(145, 117, 117);
    }
    
    >div{
      justify-content: flex-end;
    }

  }


  .BackgroundApp_contSwiper{
    
    order:1;
  }

}




@media(max-width:429px){

  .BackgroundApp_contSwiper{
    width:400px;
    height: 600px;
  }
  
   
.BackgroundApp_contContent{ 
  width:440px;
  //background-color: red;

  >p{
    width: 90%;
  }
  
  p{
    font: {      
      size:30px;
    }
  }
  
  p:nth-child(2){
    font: {      
      size:17px;
    }
  }
  >div{
    //background-color: rgb(75, 67, 67);
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
    width: 90%;
    height: 215px;
    
    button:first-child{
      margin-right: 0px;
      margin-left: 20px; 
    }
    button:nth-child(2){
      margin-left: 80px; 
   }
  }
}

.BackgroundApp[data-lang="En"]{
  .BackgroundApp_contContent{
    height: 600px;
  }
  }
.BackgroundApp[data-lang="Ar"]{
  .BackgroundApp_contContent{
    p{
      padding-right:8px;
    }
    >div{
    
    button:nth-child(2){
      margin-top: 20px; 
   }
  }
  }
  }



}

//    :effect="'fade'"
 
 
</style>
