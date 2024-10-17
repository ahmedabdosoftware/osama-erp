<template>
    <!-- home view -->
    <div :data-lang="myLanguage" id="home" class="home">
      
         <!-- backgroundApp component -->
         <div :data-lang="myLanguage" class="Background" >
             <backgroundApp></backgroundApp>
         </div> 
 
     <div id="service" class="service">
       <div>
         <h2 class="lanDir">{{lannguage.service}}</h2>
         <p  class="lanDir">{{lannguage.serviceUnder}}</p>
       </div>
       <div class="categoriesAndServiece">
        <CategoriesList> </CategoriesList >
       </div>
    </div>
    <div id="catalog" class="catalog">
       <div>
         <h2 class="lanDir">{{lannguage.catalog}}</h2>
         <p  class="lanDir">{{lannguage.catalogUnder}}</p>
       </div>
       <div class="catalogContent">
        <CatalogSec> </CatalogSec >
       </div>
    </div>
    <div id="about" class="about about_respo">
       <div>
           <input type="checkbox" id="chosse">
           <div>
               <h2 class="lanDir">
                 {{lannguage.about}}
               </h2>
               <p class="lanDir">{{lannguage.aboutContent}}</p>
           </div>
           <div>
               <h3 class="lanDir">
                 {{lannguage.message}}
               </h3>
               <p class="lanDir">
                   {{lannguage.ourMessageContent}}
               </p>
           </div>
           <div>
               <h3 class="lanDir">
               {{lannguage.through}}
               </h3>
               <p class="lanDir">
                 {{lannguage.throughContent}}
               </p>
           </div>
           <div class="counterOfReadMore">
                <div>
                   <h3 class="lanDir">
                     {{lannguage.Quality}}
                   </h3>
                   <p class="lanDir">
                     {{lannguage.QualityContent}}
                   </p>
               </div>
               <div>
                   <h3 class="lanDir">
                     {{lannguage.means}}
                   </h3>
                   <p class="lanDir">
                     {{lannguage.meansContent}}
                   </p>
               </div>
           <label  :data-lang="myLanguage" class="see"   for="chosse">{{lannguage.seeLess}}</label>
           </div>
           <label  :data-lang="myLanguage" class="see"  for="chosse">{{lannguage.seeMore}}</label>
       </div>
       <div>
         <img src="../assets/images/ai3.png" />
       </div>
       </div>
     <div class="about terms">
       <div>
         <input type="checkbox" id="forsee">
         <div>
             <h2 class="lanDir">
                 {{lannguage.Commitments}}
             </h2>
             <p class="lanDir">{{lannguage.CommitmentsContent}}</p>
         </div>
         <div>
             <h3 class="lanDir">
                 {{lannguage.tow}}
             </h3>
             <p class="lanDir">{{lannguage.towContent}}</p>
         </div>
         <div>
             <h3 class="lanDir">
                 {{lannguage.siven}}
             </h3>
             <p class="lanDir">{{lannguage.sivenContent}}</p>
         </div>
         <div>
             <h3 class="lanDir">
                 {{lannguage.five}}
             </h3>
             <p class="lanDir">{{lannguage.fiveContent}}</p>
         </div>
         
         <div class="counterOfReadMore">
           <div>
               <h3 class="lanDir">
                   {{lannguage.four}}
               </h3>
               <p class="lanDir">{{lannguage.fourContent}}</p>
           </div>
         
           <label  :data-lang="myLanguage" class="see"  for="forsee"> {{lannguage.seeLess}}</label>
         </div>
         <label  :data-lang="myLanguage" class="see"   for="forsee">{{lannguage.seeMore}}</label>
       </div>
       <div>
         <img src="../assets/images/ai4.png" />
       </div>
     </div>
     <div :data-lang="myLanguage"  class="howtOsEnd" >
       <div>
         <p>{{lannguage.howToSendYourOrder}}</p>
         <img class="limit" src="../assets/images/limit.svg">
       </div>
       <div>
         <div>
           <div><span>01</span></div>
           <div>
             <p>{{lannguage.placeOrder}}</p>
             <p>{{lannguage.orderDescription}}</p>
           </div>
         </div>
         <div>
           <div><span>02</span></div>
           <div>
             <p>{{lannguage.waitForArrival}}</p>
             <p>{{lannguage.arrivalDescription}}</p>
           </div>
         </div>
         <div>
           <div><span>03</span></div>
           <div>
             <p>{{lannguage.finishAndRate}}</p>
             <p>{{lannguage.finishAndRateDescription}}</p>
           </div>
         </div>
       </div>
     </div>
     <div :data-lang="myLanguage" id="branches" class="branches">
 
         <div class="textBranches textBranchesAr">
           <span>{{lannguage.branchesInfo}}</span>
           <select v-on:change="brancheChossed()" class="branches-change">
             <option value="Jeddah"> {{myLanguage==='En' ? 'Jeddah' : 'جدة'}}</option>
             <option value="AlQunfudhah"> {{myLanguage==='En' ? 'Al Qunfudhah' : 'القنفــــذة'}}</option>
             <option value="Samtah"> {{myLanguage==='En' ? 'Samtah' : 'صـــامــطة'}}</option>
             <option value="AhadAlMasarihah"> {{myLanguage==='En' ? 'Ahad Al-Masarihah' : "أحد المسارحة/الحصمة"}}</option>
             <option value="BishaDarab"> {{myLanguage==='En' ? 'Bisha/Darab' : "بيــش/الــدرب"}} </option>
             <option value="Jizan"> {{myLanguage==='En' ? 'Jizan' : 'جازان'}}</option>
             <option value="AbuArish">{{myLanguage==='En' ? 'Abu Arish' : "أبو عريـــش"}}</option>
             <option value="Sabya">{{myLanguage==='En' ? 'Sabya' : 'صبيــــا'}}</option>
             <option value="SakakaArarDumatalJandal">{{myLanguage==='En' ? 'Sakaka/Arar/Dumat al-Jandal' : "سكاكا/عرعر/دومة الجندل"}}</option>
           </select>
           <div>
             <img src="../assets/images/callicon.svg">
             <p >{{lannguage[map].phone}} /{{lannguage[map].phone1}}</p>
           </div>
           <div>
             <img src="../assets/images/location.svg">
             <p >{{lannguage[map].name}}</p>
           </div>
           <div>
             <img src="../assets/images/calendar.svg">
             <p >{{lannguage[map].schedule}}</p>
           </div>
         </div>
         <div class="imageBranches imageBranchesAr">
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
     </div>
     <div class="reviews">
      <Reviews></Reviews>
     </div>
     <div :data-lang="myLanguage"  id="contact" class="footer">
          <div>
           <h2>{{ lannguage.contactUsText }}</h2>
           <img src="../assets/images/GroupIcons.svg">
          </div>
          <div>
           <h2>{{ lannguage.contactUs }}</h2>
          <div>
             <img src="../assets/images/email.svg">
             <p>{{ lannguage.contactUsEmail }}</p>
          </div>
          <div>
             <img src="../assets/images/phone.svg">
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
           <div class="imageBranches  fotterLocation">
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
 
   </div>
  
 </template>
 
 <script>
 // componnents  Vue.js components
 import backgroundApp from "@/components/website/BackgroundApp.vue";
 import Reviews from "@/components/website/Reviews.vue";
 import CategoriesList from '@/components/website/CategoriesList.vue';
 import CatalogSec from "@/components/website/catalog/CatalogSec.vue";
 
 
 
 //import './style.css';
 // @ is an alias to /src
 //{{lannguage.textBackground}}
 export default {
   name: 'HomeView',
   data(){
     return{
     
 
         }
       },
   components: { 
   
     backgroundApp,
     Reviews,
     CategoriesList,
     CatalogSec,
   ///FooterStore,
   },
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
     methods:{
          // handel branches => start
       brancheChossed() {
         const selectedBranch= event.target.value;
         this.$store.commit('changeMapbranche', selectedBranch); 
          console.log(this.map )
          },  
          // handel branches => end
         
          },
 
         mounted() {
 
          // setTimeout(() => {
            // this.$store.commit('changeToarabicFormat');   
             //}, 100); 
           },
 
        }
 </script>
 <style lang="scss" scoped>
 
 .home{
   height: 1000px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
  
   
 }
   $main_color:white;
 
   .Background{
     //background-color: black;
     width: 100%;
     height: 100vh;
   }
 .ulForArabic{
   order: 1 !important ;
  // background-color: salmon !important;
 }
 .logocontulForArabic{
   order:3 !important;
  // background-color: salmon !important;
 }
 .lcontLangForArabic{
   order:2 !important;
   //background-color: salmon;
 }
 .home[data-lang="Ar"] .lanDir{
   text-align:end !important;
   padding-right: 15px ;
 }
 
 //all the about content
 .about{
   width: 100%;
   min-height: 600px;
   //background-color: red;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   margin-top: 20px;
    overflow: hidden;
   
 }
 .terms{
   //background-color: rgb(121, 165, 20);
   margin-top: 0px;
 
 }
 .about >div{
   width: 50%;
   min-height:600px;
   //background-color:blue;
 }
 
 //the about content "text"
 .about >div:first-child{
  // background-color:blue;
   display: flex;
   flex-wrap: wrap;
   position: relative;
   align-content: flex-start;
   padding-top:40px ;
   
   
 }
 // eddit just for terms
 .terms >div:first-child{
   //background-color:rgb(155, 161, 156);
   padding-top:0px ;
   align-content: flex-start;
   order: 2;
   }
 .about >div:first-child >div:not(.counterOfReadMore){
   width: 100%;
  // background-color: rgb(244, 96, 121);
   text-align: start;
   padding-left: 25px;
 }
 //the content will be in see more
 .counterOfReadMore{
   text-align: start;
   padding-left: 25px;
   //background-color: rgb(247, 70, 99);
   display: none;
 }
 .see{
   width: 110px;
   height: 30px;
   background-color: #254178;
   //background-color: #1b9417;
   color: white;
   text-align: center;
   line-height: 30px;
   position: relative;
   bottom: 0px;
   left: 25px;
   border-radius: 4px;
   display: inline-block;
   cursor: pointer;
   margin-top: 10px;
   
 }
 .see[data-lang="Ar"]{
   position: relative;
   left: 86%;
   //bottom:80px;
 }
 .seeLess{
   left: 5px;
 }
 //about
 #chosse:checked ~ .counterOfReadMore{
   display: block;
 }
 #chosse:checked ~ label{
   display: none;
 }
 //terms
 #forsee:checked ~ .counterOfReadMore{
  // background-color: #6c8f0e;
   display: block;
 }
 #forsee:checked ~ label{
   display: none;
   //background-color: #055a5a;
 }
 //terms and chosse
 #chosse,#forsee{
   display: none;
 }
 .about >div:first-child  >div h2,.about >div:first-child  >div h3{
   margin-bottom: 14px;
   font-size: 40px;
   //background-color: rgb(200, 244, 96);
   font-weight: 700;
   text-transform: capitalize; 
      
 }
 .about >div:first-child  >div h2{
   color: #254178;
 }
 .about >div:first-child  >div h3{
   font-size: 25px;
   margin-bottom: 0px;
   padding-top: 5px;
 }
 .about >div:first-child  >div p{
   font-size: 22px;
   //background-color: rgb(108, 244, 96);
   font-weight: 600;
   text-transform: capitalize;
   line-height: 40px;
   
       
 }
 
 //the about content "image"
 .about >div:nth-child(2){
  // background-color:rgb(9, 9, 206);
   display: flex;
   align-items: center;
   justify-content: flex-start;
   >img{
     width: 85%;
     height: 85%;
     margin-bottom: 30px;
     //mix-blend-mode: multiply;
     
   }
 }
 // eddit just for terms
 .terms >div:nth-child(2){
   align-items: flex-start;
  //background-color:rgb(107, 107, 146);
  order: 1;
  >img{
     margin-left: 30px;
 
   }
 }
 
 .service,.catalog{
   width: 100%;
   min-height: 420px;
   //background-color: rgb(20, 112, 112);
   display: flex;
   flex-wrap: wrap;
   margin-top: 25px;
   >div:first-child{
     width: 100%;
     height: 150px;
     //background-color: red ;
     h2,p{
       margin-top: 4px;
       font-size: 20px;
       text-align: start;
       padding-left: 20px;     
     }
     
     h2{
       color: #254178;
       font-size: 40px;
     }
   }
 }
 .categoriesAndServiece,.catalogContent{
   width: 100%;
   min-height: 280px;
   //background-color: rgb(44, 11, 190);
   
 }
 
 .catalogContent{
   display: flex;
   justify-content: center;
   //background-color: rgb(11, 190, 20);
 }
 //How To Send Your Order section start
 .howtOsEnd{
   width: 100%;
   min-height: 360px;
  background-color:#202224 ;
 }
 .howtOsEnd >div:first-child{
   width: 100%;
   height: 120px;
   //background-color: red;
   p{
     font-size: 35px;
     font-weight: 600;
     color: white;
     line-height: 90px;
     text-transform: capitalize;
   }
   img{
     width: 80%;
     height: 20px;
   }
 }
 .howtOsEnd >div:nth-child(2){
   min-height: 200px;
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   flex-wrap: wrap;
   //background-color: #254178;
 }
 .howtOsEnd >div:nth-child(2) >div{
   width: 300px;
   height: 190px;
   background-color: #3A3737;
  // background-color: #9e2e2e;
   //border-radius: 16px, 0px, 16px, 0px;
   border-top-left-radius: 16px;
   border-bottom-right-radius: 16px;
   display: flex;
   flex-wrap: wrap;
   align-content: flex-start;
   justify-content: center;
   
 }
 .howtOsEnd >div:nth-child(2) >div >div:first-child{
   width: 100%;
   height: 25%;
   //background-color: red;
   display: flex;
   align-items: center;
   justify-content: center;
   span{
     font-size: 25px;
     color: white;
   }
 }
 .howtOsEnd >div:nth-child(2) >div >div:nth-child(2){
   width: 80%;
   height: 65%;
   //background-color: sandybrown;
   p{
     color: white;
     text-align: start;
   }
   p:first-child{
     font-size: 22px;
     font-weight: 600;
   }
   p:nth-child(2){
     //font-size: 19px;
     font-weight: 400;
     line-height:35px ;
   }
 }
 
 //arabic style 
 
 .howtOsEnd[data-lang="Ar"] >div:nth-child(2) >div >div:nth-child(2) p{
   text-align: end !important;
 
 }
 .howtOsEnd[data-lang="Ar"] >div:nth-child(2) >div:first-child{
   order:3;
 }
 .howtOsEnd[data-lang="Ar"] >div:nth-child(2) >div:nth-child(2){
   order:2;
   
 }
 .howtOsEnd[data-lang="Ar"] >div:nth-child(2) div:nth-child(3){
   order:1;
 
 }
 // How To Send Your Order section end
 
 // branches section start
 .branches{
   width: 100%;
   min-height: 400px;
   //background-color: red;
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   justify-content: space-evenly; 
 }
 .branches >div{
   width: 48%;
   height:330px;
   //background-color: rgb(25, 105, 61);
   margin-bottom: 45px;
   
 }
 //style to english
 .imageBranches{
   display: flex;
   align-items: center;
   justify-content: flex-start; 
   //background-color: rgb(2, 23, 92)!important;
 }
 
 //style to arabic
 .branches[data-lang="Ar"] .imageBranchesAr{
     padding-left: 100px;
     order:1;
 }
 .map{
   width: 70%;
   height: 90%;
 }
 
 //for english
 
 .textBranches{
  // background-color: rgb(5, 78, 100)!important;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   padding-left: 65px;
   .branches-change{
     width: 340px;
     height: 50px;
     border: #828282;
     border-radius: 6px;
     font-size: 19px;
     padding-left: 10px;
     border: 2px solid #828282;
   }
   span{
     text-align: start;
     font-size: 20px ;
     font-weight: 600;
   }
   >div{
     height: 27px;
     //background-color: sandybrown;
     display: flex;
     align-items: center;
     p{
      font-weight: 600;
      font-size: 20px; 
      //background-color: red;
      margin-left: 6px;
     }
     img{
       width: 16px;
       height: 16px;
     }
   }
 }
 
 
 
 //for arabic
 .branches[data-lang="Ar"] .textBranchesAr{
   order:2;
   padding-right: 60px;
   .branches-change{
 
     align-self: flex-end;
     margin-right: 5px;
   }
   span{
     padding-right: 15px;
     text-align: end;
     //background-color: red;
   }
   >div{
 
     justify-content: flex-end;
     p{
    
      margin-right: 7px;
      order:1;
     }
     img{
      
       margin-right: 5px;
       order:2;
 
     }
   }
 }
 
 
 
 
 .reviews{
   width: 100%;
   height: 400px;
  
 }
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
 .footer[data-lang="Ar"] >div:nth-child(6){
   margin-right: 50px;
 }
 
 .footer[data-lang="Ar"]  >div:nth-child(4){
   
   h2{
     padding-right: 40px;
     text-align: end !important;
   }
   p{
     text-align: end;
     padding-right:35px ;
   }
    
 }
 .footer[data-lang="Ar"]  >div:nth-child(3){
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
 .footer[data-lang="Ar"] >div:nth-child(2){
   h2{
     padding-right: 40px;
     text-align: end;
   }
   >div{
     justify-content: end;;
     margin-right: 25px;
   }
 
 }
 .footer[data-lang="Ar"] .footerAr >div:first-child{
   h2{  
     margin-left: 25px ;
     text-align: center;
   }
   >img{ 
    // background-color: red;
   }
   
   
 }
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
   /* scrollUp => start */
   .scrollUp {
     width: 60px;
     height: 60px;
     //   background-color: blue;
     position: fixed;
     right: 20px;
     bottom: 40px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 30px;
     /* border: 2px solid white; */
     cursor: pointer;
     //   visibility: hidden;
     img {
       width: 100%;
       height: 100%;
     }
   }
   
   // .scrollUp::after {
   //   content: "^";
   //   width: 50%;
   //   height: 50%;
   // //   background-color: darkorange;
   //   position: absolute;
   //   top: 10%;
   //   font-weight: 500;
   //   font-size: 40px;
   //   text-align: center;
   //   color: white;
   // }
   // .scrollUp::before {
   //   content: "^";
   //   color: white;
   //   position: absolute;
   //   top: 35%;
   //   width: 50%;
   //   height: 50%;
   // //   background-color: darkorange;
   //   font-weight: 500;
   //   font-size: 40px;
   //   text-align: center;
   // }
   /* scrollUp => end */
   
   /* loader => end  */
 @media(max-width:360px){
   .footerAr{
    padding-left: 90px !important;  
    
   }
 
 }
 /* media => phone ultra*/
 @media(max-width:450px){
 
   .Background{
     width: 100%;
     height: 140vh;
   }
   //for arabic style
   .contInput[data-lang="Ar"] {
     margin-top:0px;
   }
   
 
 // service and catalog => start
 .service,.catalog{
  
 }
 .catalog{
  // background-color: sienna;
   // margin-top: 120px;
   
 }
 .catalogContent{
  // background-color: rgb(32, 15, 134);
 
 }
 // service and catalog => end
   .footerBckground{
   >div{
     height: 66%;
     width: 30%;
     >p{
     font-size: 10px;
   }
 
   }
 
 }
 
 
   .terms >div:nth-child(2){
     >img{
         margin-left: 0px;
       }
  }
  // for arabic style
  .footer[data-lang="Ar"] {
   padding-left: 150px;  
   
   }
   .footer[data-lang="Ar"]  >div:first-child{
         h2{  
           margin-left: 25px ;
           text-align: end;
 
         }
         >img{ 
           padding-left: 60px;
           margin-left:45px;
         }
     }
     .footer[data-lang="Ar"]  >div:nth-child(3){
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
   
 /* about section */
 .see[data-lang="Ar"]{
   position: relative;
   left: 70%;
   //bottom:80px;
 }
 .about{  
   justify-content: center;
   margin-top: 0px;
   
 }
 .about_respo{
  // margin-top: 280px;
 }
 .about >div{
   width: 100%;
   min-height:750px;
 }
 
 /* about section "image" */
 
 .about >div:nth-child(2){
   align-items: flex-start;
   justify-content: center;
   min-height:350px;
   order: 2;
   >img{
     margin-top: 30px;
     width: 90%;
     height: 90%;
   }
 }
 
 /* about section "content" */
 
 .about >div:first-child{
 }
 
 .about >div:first-child  >div h2,.about >div:first-child  >div h3{  
   font-size: 30px 
 }
 .about >div:first-child  >div h2{
 }
 .about >div:first-child  >div h3{
   font-size: 25px ;
   padding-top: 7px;
 }
 .about >div:first-child  >div p{
 }
 
 /* background section "textCont" */
 
 .textCont{
   width: 77%;
   padding-left: 0px;
   
   //background-color: #254178;
   p:first-child{
     font-size: 25px;
     padding-left: 15px;
 
     //background-color: aqua;
     
   }
   p:nth-child(2){
     font-size: 18px;
     padding-left: 15px;
 
     //background-color: aqua;
     
   }
   .contInput{
     width: 300px;
     margin-left: 0px;
     //background-color: aqua;
   }
 }
 .contInput input{ 
   margin-left: 20px;
   width: 60%;
 
 } 
 
 .contInput  button{
 } 
 
 /* how to send section "textCont" */
 
 .howtOsEnd >div:nth-child(2) >div{
   margin-bottom: 20px;
 }
 .howtOsEnd >div:first-child{
   p{
     font-size: 30px;
   }
 }
 
 /*branches "textCont" */
 
 .branches >div{
   width: 100%;
   margin-bottom: 0px;
 }
 
 .imageBranches{
   justify-content: center; 
 }
 .textBranches{
  
   >div{
     p{
       font-size: 16px; 
     }
   }
 }
 
 }
 @media(max-width:1025px){
 
 }
 @media(max-width:820px){
 
 }
 @media(max-width:799px){
 
 }
 
 </style>