<template>
    <div id="sidebar" :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">    
      <div :class="{ 'dark-mode-content': getDarkMode }" class="content">
        <div :class="{ 'dark-mode-header': getDarkMode }" class="header">
          
          <img id="logoSystem" :src="require('@/assets/images/logo.svg')" />
         
          <img
            class="loggo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTUgxG9z03WuK9OPQ64aptvJjEyyPz2Cnhcw&usqp=CAU"
          />
          <span v-on:click="disappear()" class="x">x</span>
        </div>
        <div class="links">
          
          <!-- dashboard Section -->
          <div :class="{ 'dark-mode-content': getDarkMode }">
              <router-link to="/dashboard">
                <font-awesome-icon class="iconAwesome" icon="house" />
              </router-link>
              <router-link to="/dashboard" v-if="!isCollapsed" >
                <p class="link">dashboard</p>
              </router-link>
              <font-awesome-icon class="arrow" />
          </div>
          
          <!-- products Section -->
          <div @click="toggleSubMenu('products')" :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'product-sup']">
            <font-awesome-icon class="iconAwesome" icon="store" />
            <p class="link products_p">products</p>
            <font-awesome-icon v-if="!isCollapsed" class="arrow" :icon="isProductsOpen ? 'chevron-up' : 'chevron-down'" />

                <!--slot -->
                <DropDownMenuSidebar position="products" v-show="isCollapsed">
                  <router-link to="/dashboard/Product">
                     products
                  </router-link>
                  <router-link to="/dashboard/AddNewProduct">
                    add products
                  </router-link>
                  <router-link to="/dashboard/units">
                    units
                  </router-link>
                  <router-link to="/dashboard/notes">
                    ads poster
                  </router-link>
                  <router-link to="/dashboard/Category">
                    categories
                  </router-link>
                  <router-link to="/dashboard/addcatagory">
                    add category
                  </router-link>
                </DropDownMenuSidebar>

              </div>
              <div v-show="isProductsOpen && !isCollapsed"  :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                <router-link v-if="!isCollapsed" to="/dashboard/Product">
                  <p class="link">list of products</p>
                </router-link>
              </div>
              <div  v-show="isProductsOpen && !isCollapsed" :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                
                <router-link v-if="!isCollapsed" to="/dashboard/AddNewProduct">
                  <p class="link">add products</p>
                </router-link>
              </div>
              <div  v-show="isProductsOpen && !isCollapsed" :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                
                <router-link v-if="!isCollapsed" to="/dashboard/units">
                  <p class="link">units</p>
                </router-link>
              </div>
              <div  v-show="isProductsOpen && !isCollapsed" :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                
                <router-link v-if="!isCollapsed" to="/dashboard/notes">
                  <p class="link">ads poster</p>
                </router-link>
              </div>
              <div  v-show="isProductsOpen && !isCollapsed" :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />                
                <router-link v-if="!isCollapsed"  to="/dashboard/Category">
                  <p class="link">list of categories</p>
                </router-link>
              </div>
              <div  v-show="isProductsOpen && !isCollapsed" :class="[{'different-color': isProductsOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />                
                <router-link v-if="!isCollapsed" to="/dashboard/addcatagory">
                  <p class="link">add category</p>
                </router-link>
              </div>
          <div :class="{ 'dark-mode-content': getDarkMode }">
            <router-link  to="/dashboard/Order">
              <font-awesome-icon class="iconAwesome" icon="briefcase" />
            </router-link >
            <router-link v-if="!isCollapsed" to="/dashboard/Order">
              <p class="link">orders</p>
            </router-link>
          </div>
          <div :class="{ 'dark-mode-content': getDarkMode }">
            <router-link to="/dashboard/users/technicalPages/Technical">
              <font-awesome-icon class="iconAwesome" icon="tools" />
            </router-link>
            <router-link v-if="!isCollapsed" to="/dashboard/users/technicalPages/Technical">
              <p class="link">technicals</p>
            </router-link>
          </div>
          <div :class="{ 'dark-mode-content': getDarkMode }">
            <router-link  to="/dashboard/users/clintPages/Clint">
              <font-awesome-icon class="iconAwesome" icon="user-tie" />
            </router-link>
            <router-link v-if="!isCollapsed" to="/dashboard/users/clintPages/Clint">
              <p class="link">clients</p>
            </router-link>
          </div>
          <div :class="{ 'dark-mode-content': getDarkMode }" class="projects">
            <router-link to="/dashboard/Projects">
              <font-awesome-icon class="iconAwesome" icon="project-diagram" />
            </router-link>
            <router-link v-if="!isCollapsed" to="/dashboard/Projects">
              <p class="link">projects</p>
            </router-link>
          </div>
       
           <!-- Storage Section -->
           <div @click="toggleSubMenu('storage')" :class="[{'different-color': isStorageOpen, 'dark-mode-content': getDarkMode}, 'storage-sup']">
            <font-awesome-icon class="iconAwesome" icon="boxes" />
            <p class="link storage_p">storage</p>
            <font-awesome-icon v-if="!isCollapsed" class="arrow" :icon="isStorageOpen ? 'chevron-up' : 'chevron-down'" />

            <DropDownMenuSidebar position="storage" v-show="isCollapsed" :getDarkMode="getDarkMode">
              <router-link to="/dashboard/Branches">
                storage 
              </router-link>
              <router-link to="/dashboard/AddNewBranch">
                add storage 
              </router-link>
              <router-link to="/dashboard/StockAlerts">
                alert stock 
              </router-link>
              <router-link to="/dashboard/Transfer">
                transfer  
              </router-link>
              <router-link to="/dashboard/AddTransfer">
                add  transfer
              </router-link>
            
            </DropDownMenuSidebar>
          </div>
          <div v-show="isStorageOpen && !isCollapsed"  :class="[{'different-color': isStorageOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
            <font-awesome-icon class="iconAwesome" icon="chevron-right" />
            <router-link v-if="!isCollapsed"  to="/dashboard/Branches">
              <p class="link">list of storage</p>
            </router-link>
          </div>
          <div v-show="isStorageOpen && !isCollapsed"  :class="[{'different-color': isStorageOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
            <font-awesome-icon class="iconAwesome" icon="chevron-right" />
            <router-link v-if="!isCollapsed"  to="/dashboard/AddNewBranch">
              <p class="link"> add storage</p>
            </router-link>
          </div>
          <div v-show="isStorageOpen && !isCollapsed"  :class="[{'different-color': isStorageOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
            <font-awesome-icon class="iconAwesome" icon="chevron-right" />
            <router-link v-if="!isCollapsed"  to="/dashboard/StockAlerts">
              <p class="link"> alert stock </p>
            </router-link>
          </div>
          <div v-show="isStorageOpen && !isCollapsed"  :class="[{'different-color': isStorageOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
            <font-awesome-icon class="iconAwesome" icon="chevron-right" />
            <router-link v-if="!isCollapsed"  to="/dashboard/Transfer">
              <p class="link"> Inventory transfer</p>
            </router-link>
          </div>
          <div v-show="isStorageOpen && !isCollapsed"  :class="[{'different-color': isStorageOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
            <font-awesome-icon class="iconAwesome" icon="chevron-right" />
            <router-link v-if="!isCollapsed"  to="/dashboard/AddTransfer">
              <p class="link"> add  transfer</p>
            </router-link>
          </div>


          
        <!-- Purchases Section -->
        <div @click="toggleSubMenu('Purchases')" :class="[{'different-color': isPurchasesOpen, 'dark-mode-content': getDarkMode}, 'purchase-sup']">
            <font-awesome-icon class="iconAwesome" icon="shopping-cart" />
            <p class="link purchases_p">Purchases</p>
            <font-awesome-icon v-if="!isCollapsed" class="arrow" :icon="isPurchasesOpen ? 'chevron-up' : 'chevron-down'" />

                <!--slot -->
                <DropDownMenuSidebar position="purchases" v-show="isCollapsed">
                  <router-link to="/dashboard/Purchases">
                    Purchases
                  </router-link>
                  <router-link to="/dashboard/AddPurchase">
                    add purchase
                  </router-link>
                  <router-link to="/dashboard/Returns">
                    returns
                  </router-link>
                 
                 
                </DropDownMenuSidebar>

              </div>

              <div v-show="isPurchasesOpen && !isCollapsed"  :class="[{'different-color': isPurchasesOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                <router-link v-if="!isCollapsed" to="/dashboard/Purchases">
                  <p class="link">list of purchases</p>
                </router-link>
              </div>
              <div v-show="isPurchasesOpen && !isCollapsed"  :class="[{'different-color': isPurchasesOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                <router-link v-if="!isCollapsed" to="/dashboard/AddPurchase">
                  <p class="link">add purchase</p>
                </router-link>
              </div>
              <div v-show="isPurchasesOpen && !isCollapsed"  :class="[{'different-color': isPurchasesOpen, 'dark-mode-content': getDarkMode}, 'supMenue']">
                <font-awesome-icon class="iconAwesome" icon="chevron-right" />
                <router-link v-if="!isCollapsed" to="/dashboard/Returns">
                  <p class="link">returns</p>
                </router-link>
              </div>

              

        <!-- catalog Section -->
        <div :class="{ 'dark-mode-content': getDarkMode }">
          <router-link  to="/dashboard/catalog">
            <font-awesome-icon class="iconAwesome" icon="file-pdf"  />
          </router-link>
          <router-link v-if="!isCollapsed" to="/dashboard/catalog">
            <p class="link">Catalog PDF</p>
          </router-link>
        </div>
        
        <!-- reviews Section -->
        <div :class="{ 'dark-mode-content': getDarkMode }" class="reviews">
            <router-link to="/dashboard/Reviews">
              <font-awesome-icon class="iconAwesome" icon="comments" />
            </router-link>
            <router-link v-if="!isCollapsed" to="/dashboard/Reviews">
              <p class="link">reviews</p>
            </router-link>
          </div>
          <div :class="{ 'dark-mode-content': getDarkMode }" class="themeCont">
              <font-awesome-icon @click="theme()" class="iconAwesome" icon="adjust" />
              <div v-if="!isCollapsed" class="theme" :class="{ 'dark-mode-content': getDarkMode }">
                <p @click="theme()" class="link theme">theme</p>
                  <font-awesome-icon  class="iconAwesome" :icon="getDarkMode ? 'moon' : 'sun'" />
              </div>
              <font-awesome-icon class="arrow"  />
          </div>
          <div :class="{ 'dark-mode-content': getDarkMode }" class="log-out" @click="logOut">
            <div
              :class="{ 'dark-mode-content': getDarkMode }"
              class="profile-cont"
            >
              <div class="contImge">
                <font-awesome-icon class="profile" icon="user-circle" />
              </div>
            </div>
            <div v-if="!isCollapsed"
              class="log-out-word"
              :class="{ 'dark-mode-content': getDarkMode }"
            >
              <p class="link">log out</p>
            </div>
            <font-awesome-icon v-if="!isCollapsed" class="log" icon="sign-out-alt" />
          </div>
        </div>
        <div class="toggle-button" @click="toggleSidebar">
          <font-awesome-icon :icon="isCollapsed ? 'chevron-right' : 'chevron-left'" />
        </div>
      </div>
    </div>
  </template>
  <script>
  import { useUserStore } from '@/store/auth/auth.js';
  import { mapActions } from "pinia";
  // Skeleton DropDownMenuSidebar 
  import DropDownMenuSidebar from '@/components/global/DropDownMenuSidebar.vue';
 
  
  export default {
    data() {
      return {
        // discPage: "this is sidbar",
        isCollapsed: false,
        isProductsOpen: false, // للتحكم في قائمة المنتجات الفرعية
        isStorageOpen: false,  // للتحكم في قائمة المخزن الفرعية
        isPurchasesOpen: false,  // للتحكم في قائمة المشتريات الفرعية
    };
    },
    components: {
      DropDownMenuSidebar,
  },
    name: "Sidebar",
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
      mood() {
        return this.$store.state.mood;
      },
    },
    methods: {
      ...mapActions(useUserStore, ["logout"]),
  
     async logOut(){
       await this.logout()
       this.$router.push('/login');
      }
      ,
      theme() {
        this.$store.commit("toggleDarkMode");
      },
      disappear() {
        document.getElementById("sidebar").style.cssText = "left:-100%;";
      },
      toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      document.querySelector('#main-layout').classList.toggle('sidebar-collapsed', this.isCollapsed);
      document.querySelector('#logoSystem').classList.toggle('logoSystem', this.isCollapsed);
    },
     toggleSubMenu(menu) {
      if (menu === 'products') {
        this.isProductsOpen = !this.isProductsOpen;
      } else if (menu === 'storage') {
        this.isStorageOpen = !this.isStorageOpen;
      } else if((menu === 'Purchases')){
        this.isPurchasesOpen = !this.isPurchasesOpen;
      }
    }
    },
  };
  </script>
  
  <style lang="scss">
  .sidebar {
    width: 20%;
    height: 100vh;
    background-color: white;
    position: fixed;
    left: 0px;
    top: 0px;
    transition: all 0.3s ease;
    overflow-y: auto;
    //overflow-x: visible;

    &::-webkit-scrollbar {
    width: 8px; 
    height: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4); 
  }


    &.sidebar-collapsed {
      width: 5% !important;
    }
  }
  .sidebar > div {
    width: 100%;
    height: 80%;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    // background-color: rgb(205, 133, 133);
  }
  .header {
    width: 100%;
    height: 63px;
    //background-color: firebrick;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgb(215, 213, 213);
    div {
      width: 30%;
      height: 100%;
      // background-color: rebeccapurple;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      p:first-child {
        color: blue;
        text-transform: capitalize;
        font-size: 18px;
        font-weight: 600;
        font-family: Arial, Helvetica, sans-serif;
      }
      p:nth-child(2) {
        font-size: 10px;
        color: rgb(121, 120, 120);
      }
    }
    img {
      width: 40px;
      height: 100%;
    }
    img:first-child {
      width: 80px;
      margin-left: 25px;
      //background-color: aquamarine;
    }
    img:nth-child(2) {
      margin-left: 60px;
    }
  }
  .logoSystem{
    width: 40px !important;
    margin-left: 5px !important;
    transition: all 0.3s ease;

  }
  .links {
    width: 100%;
    height: 90%;
    // background-color: skyblue;
    transition: height 0.3s ease;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    div:hover {
      background-color: rgb(220, 220, 245);
    }
    div:hover > div {
      background-color: rgb(220, 220, 245);
    }
     div {
      position: relative;
      border-radius: 5px;
      width: 100%;
      height: 45px;
      margin-bottom: 2px;
      background-color: white;
      display: flex;
      align-items: center;
      color:rgb(121, 120, 120);
      cursor: pointer;
        a,p{
          font-size: 14px;
        }      
       .iconAwesome {
        width: 20px;
        height: 20px;
        margin-left: 20px;
        margin-right: 6px;
        
      }
      img:nth-of-type(1) {
        width: 20px;
        height: 20px;
        margin-left: 30px;
      }
      .profile-cont {
        width: 70px;
        height: 50px;
        // background-color: salmon;
        .contImge {
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background-color: white;
          margin-left: 20px;
          margin-top: 6px;
          .profile {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            margin-left: 0px;
  
          }
        }
      }
      div {
        p {
          font-size: 17px;
          text-transform: capitalize;
          //padding-left: 6px;
          font-weight: 600;
          cursor: pointer;
          // color:rgb(121, 120, 120);
        }
      }
    }
  }
  .arrow {
    position: absolute;
    right: 10px;
    width: 15px !important;
    height: 15px !important;
  }
  .themeCont {
    margin-top: 20px;
    position: relative;
    //background-color: rgb(49, 49, 194)!important;
  }
  .themeCont::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 0px;
    width: 100%;
    height: 1px;
    background-color: rgb(181, 181, 182);
  }
  .log {
    width: 20px;
    height: 20px;
    margin-right: 50px;
  }
  
  .log-out-word {
    p{
      margin-left: 10px;
      font-size: 15px;
    }
   
  }
  // collapse=> start
  .toggle-button {
    position: absolute;
    top: 65px;
    right: -4px;
    cursor: pointer;
    border: 2px solid #ccc;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  
    
  }
  
  .sidebar-collapsed .links div .link,
  .sidebar-collapsed .header div,
  .sidebar-collapsed .header img:nth-of-type(2) ,
  .sidebar-collapsed .log-out-word {
    display: none !important;
  }
  .sidebar-collapsed .toggle-button{
    right: 0px;
  }
  // toggle-collapse => end

  // supMenue
.products_p,.storage_p,.purchases_p{
 
  color:rgb(121, 120, 120);
  font-size: 18px;
  font-weight: bold;
      
     
}
//.different-color{
  //background-color:rgb(121, 120, 120) !important;
//}
.product-sup:hover,.storage-sup:hover,.purchase-sup:hover{
  .dropdown{
    display: block;
  }
}
  .supMenue{
    
    transition: all 0.3s ease;
    padding-left: 20px;
    p{
      font-size: 15px !important;
    }
    .iconAwesome{
      width: 15px !important;
      height: 15px !important;
    }

  }

  .router-link-exact-active {
    p {
      color: blue !important;
    }
  }

  .links-div {
    background-color: black !important;
  }
 
  .x {
    width: 35px;
    height: 35px;
    display: none;
    background-color: rgb(200, 199, 199);
    margin-left: 70px;
    text-align: center;
    line-height: 35px;
    font-size: 22px;
    text-transform: capitalize;
    border-radius: 17.5px;
  }
  /* media => ipad */
  @media (max-width: 821px) {
    .sidebar {
      left: -100%;
      transition: 0.5s;
      z-index: 4;
      width: 40vw;
      top: 0px;
      &.sidebar-collapsed {
      width: 80px !important; 
    }
    }
    .x {
      display: block;
    }
    .loggo {
      display: none;
    }
   
  }
  // phone
  @media (max-width: 477px) {
   
  .sidebar {
    width: 60vw !important;
    
    &.sidebar-collapsed {
      width: 20% !important; 
    }
  }
 
  
  .sidebar-collapsed .links div .link,
  .sidebar-collapsed .header div,
  .sidebar-collapsed .header img:nth-of-type(2) ,
  .sidebar-collapsed .log-out-word {
    display: none;
  }
  .sidebar-collapsed .toggle-button{
    margin-left: 5px;
  }
  .sidebar-collapsed .x{
    margin-left: 5px;
  
  }
  }
  
  // phone
  @media (max-width: 367px){
    .x {
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    font-size: 14px;
    line-height: 25px;



  }
  
}
@media print{
  #sidebar{
   display: none;
  }

 
  

}
  </style>
  