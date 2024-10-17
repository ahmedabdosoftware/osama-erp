<template>
  <!-- 
    - #FOOTER
  -->
     <div  id="contact" class="footer">
      <div>
        <h2>{{ lannguage.contactUsText }}</h2>
        <img src="../../assets/images/GroupIcons.svg">
      </div>
      <div>
        <h2>{{ lannguage.contactUs }}</h2>
       <div>
          <img src="../../assets/images/email.svg">
          <p>{{ lannguage.contactUsEmail }}</p>
       </div>
       <div>
          <img src="../../assets/images/phone.svg">
          <p>{{ lannguage.contactUsPhone }}</p>
       </div>
      </div>
       <div>
          <h2>{{ lannguage.quickLinks }}</h2>
          <p>{{ lannguage.quickLinksHome }}</p>
          <p>{{ lannguage.quickLinksServices }}</p>
          <p>{{ lannguage.quickLinksAbout }}</p>
          <p>{{ lannguage.quickLinksBranches }}</p>
        </div>
        <div>
          <h2>{{ lannguage.location }}</h2>
          <p>{{ lannguage.locationMainCenter }}</p>
          <p>{{ lannguage.locationHours }}</p>
        </div>
        <div class="imageBranches fotterLocation">
            <iframe v-if="map=='Jeddah'" class="map" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3713.8118573908046!2d39.2026667!3d21.4366389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDI2JzExLjkiTiAzOcKwMTInMDkuNiJF!5e0!3m2!1sen!2seg!4v1713033605594!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='AlQunfudhah'" class="map" src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3769.537400087197!2d41.1164928!3d19.1279397!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2seg!4v1713033534253!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='Samtah'" class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d477.03618871726337!2d42.8484732!3d16.9603039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1607f5f744c372d7%3A0xa9ab8c9922020d1b!2z2KfZhNij2K3Zhdix2Yog2YTZhNi02K3Zhg!5e0!3m2!1sen!2seg!4v1713033374528!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='AhadAlMasarihah'" class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d477.03618871726337!2d42.8484732!3d16.9603039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1607f5f744c372d7%3A0xa9ab8c9922020d1b!2z2KfZhNij2K3Zhdix2Yog2YTZhNi02K3Zhg!5e0!3m2!1sen!2seg!4v1713033374528!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='BishaDarab'" class="map" src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1905.8369430847317!2d42.7489342!3d17.1860678!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2seg!4v1713033302386!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='Jizan'" class="map" src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d571.0741164058671!2d42.6332942!3d16.8792654!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDUyJzQ2LjkiTiA0MsKwMzgnMDAuOCJF!5e1!3m2!1sen!2seg!4v1713033159347!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='Sabya'" class="map" src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1905.8369430847317!2d42.7489342!3d17.1860678!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2seg!4v1713033091037!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='AbuArish'" class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d477.03618871726337!2d42.8484732!3d16.9603039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1607f5f744c372d7%3A0xa9ab8c9922020d1b!2z2KfZhNij2K3Zhdix2Yog2YTZhNi02K3Zhg!5e0!3m2!1sen!2seg!4v1713032989146!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe v-if="map=='SakakaArarDumatalJandal'" class="map" src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1034.193539539082!2d40.2142401!3d29.9488146!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU2JzU1LjMiTiA0MMKwMTInNDkuOCJF!5e1!3m2!1sen!2seg!4v1713032882533!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      <div>
      <p>{{ lannguage.copyright }}</p>
    </div>
  </div>

</template>
  <script>
  export default {
    name: "FooterStore",
    computed: {
      lannguage () {
        // console.log( this.$store.getters.isLogin)
        return this.$store.getters.catchLang
    },
    myLanguage () {
        return this.$store.getters.myLanguage
    },
    map () {
        // console.log( this.$store.getters.isLogin)
        return this.$store.state.mapbranche
    },
    
      
    },
      mounted() {
          setTimeout(() => {
            this.$store.commit('changeToarabicFormat');   
            }, 100); 
          },
   
     };
  </script>
  
  <style scoped lang="scss">
   
/*-----------------------------------*\
  #FOOTER
\*-----------------------------------*/
//style for english
.footer{
  width: 100%;
  min-height: 300px;
  background-color: #00020D;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-evenly;
  //background-color: #ac660c;

}
.footer >div:first-child{
  width: 250px;
  height: 100px;
 // background-color: #0d4941;
  overflow: hidden;
  h2{
    margin-top: 15px ;
    color:white;
    text-transform: uppercase;
    font-size: 17px;
  }
  >img{
    margin-top: 15px ;
    width: 100%;
    height: 30px;
   // background-color: #1f5386;
    padding-right: 55px;
  }
  
  
}
.footer >div:nth-child(2){
  width: 250px;
  height: 120px;
  //background-color: #348f11;
  display: flex;
  flex-direction: column;
  h2{
    margin-top: 15px ;
    color:white;
    font-size: 17px;
    padding-right: 40px;
    //background-color: red;
  }
  h2:first-letter{
    text-transform: capitalize;
  }
  >div{
    display: flex;
    height: 20px;
    color:white;
   // background-color: rgb(23, 2, 58);
    margin-top: 10px;
    align-items: center;
    width: 80%;
    align-self: center;
    >img{
      margin-right: 6px;
      height: 13px;
      width:13px;
    }

  }

}
.footer >div:nth-child(3){
  width: 150px;
  height: 170px;
  //background-color:#1f5386;
  color:white;
  text-align: center;
  h2{
    margin-top: 15px ;
    color:white;
    font-size: 17px;
    text-align: center;
    //background-color: rgb(18, 155, 14);
  }
  h2:first-letter{
    text-transform: capitalize;
  }
  p{
    //background-color: red;
    font-size: 15px;
    margin-top: 10px;
    text-transform:uppercase ;
    width: 60%;
    text-align: start;
    margin-left: 30px ;
  }
}
.footer >div:nth-child(4){
  width: 200px;
  height: 150px;
  text-align: start;
  color:white;
  margin-left: 30px ;
  padding-left: 30px ;
  h2{
    //background-color:#1f5386;
    margin-top: 15px ;
    font-size: 17px;
  }
  p{
    font-size: 15px;
    margin-top: 10px ;
    //background-color: red;
  }
    p:first-letter{
    text-transform: capitalize;
  }
}
//div 5 
.fotterLocation{
  width: 250px;
  height: 250px;
  padding-left: 30px ;
  //background-color:#089743;
  iframe{
    width: 85%;
    height: 85%;

  }
}
.footer >div:nth-child(6){
  width: 100%;
  height: 50px;
 // background-color:#11b811;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:16px;
  color:white;

}

//style for arabic
.footerAr >div:nth-child(6){
  margin-right: 50px;
}

.footerAr >div:nth-child(4){
  
  h2{
    padding-right: 40px;
    text-align: end !important;
  }
  p{
    text-align: end;
    padding-right:35px ;
  }
   
}
.footerAr >div:nth-child(3){
  h2{
    padding-right: 0px;
    text-align: end !important;
    //background-color: red;
  }
  p{
    text-align: end;
    margin-left: 60px ;
  }
}
.footerAr >div:nth-child(2){
  h2{
    padding-right: 40px;
    text-align: end;
  }
  >div{
    justify-content: end;;
    margin-right: 25px;
  }

}
.footerAr >div:first-child{
  h2{  
    margin-left: 25px ;
    text-align: center;
  }
  >img{ 
   // background-color: red;
  }
  
  
}
@media(max-width:360px){
  .footerAr{
   padding-left: 90px !important;  
   
  }

}
@media(max-width:450px){
  

 // for arabic style
 .footerAr{
  padding-left: 150px;  
  
  }
  .footerAr >div:first-child{
        h2{  
          margin-left: 25px ;
          text-align: end;

        }
        >img{ 
          padding-left: 60px;
          margin-left:45px;
        }
    }
    .footerAr >div:nth-child(3){
        h2{
          padding-right: 40px;
        }
      }
   
  /* .footer section */
  .footer{
    flex-direction: column;
    align-items: flex-start;
    
  }
  .footer   >div:not(.footer >div:last-child){
    width: 250px  ;
    //background-color:#9e9513 ;
    margin-left: 10px ;
    }
    .footer >div:nth-child(3) h2{
      text-align: start;
      //background-color: red;
      padding-left: 30px;
    }
    .fotterLocation{
      padding-left: 0px ;
      iframe{
        width: 85%;
        height: 85%;
      }
    }
    .footer >div:first-child{
      h2{
       // background-color: #1f5386;
        padding-right:87px;
      }
      >img{
        padding-right: 85px;
      }
    }
    .footer >div:nth-child(2){
      h2{
         // background-color: #057e29;
          padding-right: 40px;
        }
      }
  }

  </style>
  