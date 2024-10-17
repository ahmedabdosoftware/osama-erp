<template>
  <div :class="{ 'dark-mode': getDarkMode }" id="profile-layout">
    <div v-if="userInfo" class="infoUser" id="infoUser">
      <div class="background">
        <div class="imge-profilee">
          <img class="imge-pro" :src="userInfo.profileImageURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05q_vg5Ux_rPqNDBBeYLc1BHrG-qjaw7_tA&usqp=CAU'" alt="Profile Image">
        </div>
      </div>
      <div class="shop">
        <button class="shop-btn"><a href="https://ahmedabdosoftware.github.io/websiteUpdated-DSD/">Show Shop</a></button>
      </div>
      <div class="ddetails">
        <p id="nameProfile">{{ userInfo.name }}</p>
        <p id="emailProfile">{{ userInfo.email }}</p>
        <div class="parent"> 
          <div class="spechial_cont">Phone Number: <span class="spechial">{{ userInfo.number }}</span></div>
          <div class="spechial_cont">Role: <span class="spechial">{{ userInfo.role }}</span></div>
        </div>
      </div>
      <div class="trans">
        <router-link 
          :to="generateRoute('')" exact>
          Orders
        </router-link>
        <router-link 
          :to="generateRoute('financial')">
          Financial
        </router-link>
        <router-link 
          :to="generateRoute('projects')">
          Projects
        </router-link>
          <DropdownMenuSetting  />
      </div>
    </div>
    <router-view class="profile-content" :class="{ 'dark-mode': getDarkMode }"/>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useGetUserStore } from '@/store/users/users.js';
import DropdownMenuSetting from "@/components/users/setting/DropdownMenuSetting.vue";

export default {
  name: "ProfileLayout",
  components: {
    DropdownMenuSetting,
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
  },
  methods: {
    ...mapActions(useGetUserStore, ['fetchSingleUser']),
    generateRoute(section) {
      const profileId = this.$route.params.profileId;
      const layout = this.$route.meta.layout;

      if (layout === 'DashboardLayout') {
        
        return `/dashboard/profile/${profileId}/${section}`;
      } else if (layout === 'profileInDashboardLayout') {
        return `/dashboard/profile/${profileId}/${section}`;
      } else if (layout === 'profileOutDashboardLayout') {
        return `/profile/${profileId}/${section}`;
      }
    }
  },
  data() {
    return {
      userInfo: null,
    };
  },
  async created() {
    try {
      const userId = this.$route.params.profileId;
      this.userInfo = await this.fetchSingleUser(userId);
      console.log("get param from profile layout:", this.$route.params.profileId);
      console.log("get userInfo from profile layout:", this.userInfo);
    } catch (error) {
      console.error(error.message);
    }
  },
};
</script>
  
  <style scoped>
  #profile-layout {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
     min-height: 100vh;
  }
  
  .profile-content {
    min-height: 100vh;
    width: 100%;
    background-color: #f9f7f7;

  }
  .infoUser{
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 100%;
    height: 300px;
    background-color: white;
    display: grid;
    grid-template-areas: 
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    "backgroundd backgroundd backgroundd backgroundd "
    ". . . setting"
    " ddetails  . . ."
    " ddetails  . . ."
    "trans trans trans trans "
}
.content{
    width: 100%;
    min-height: 300px;
    /* background-color: darkgreen; */

}
.background{
    position: relative;
    grid-area: backgroundd;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-image: url("file:///C:/Users/Black%20Horse/Downloads/Medical%20Travel%20International.jpg");
}
.ddetails{
    grid-area:ddetails ;
    padding-left:20px;
    text-transform: capitalize;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
}
.ddetails p:nth-child(2),.ddetails .parent >span{
    font-size: 13px;
    color: rgb(75, 75, 75);
}
.ddetails p:nth-child(1){
    margin-top: 20px;
}
.ddetails p:nth-child(2){
    padding-top:3px;
}
.parent{
    padding-top: 5px;
    width: 100%;
    height: 60px;
}
.spechial_cont{
    padding-bottom: 10px;
}
.spechial{
    font-size: 16px;
    color:black;
}
.shop{
    grid-area: setting;
    display: flex;
    align-items: flex-end;
}
.shop button{
    color: white;
    background-color:var(--popularCalar) ;
    width: 150px;
    height: 45px;
    border-radius: 15px;
    font-size: 18px;
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    /* border: 2px solid var(--buttons); */
}
.trans{
    /* background-color: firebrick; */
    grid-area: trans;
    display: flex;  
    /* justify-content: space-evenly; */
    
}
.trans a{
    text-align: center;
    width: 25%;
    /* background-color: red; */
    font-size: 17px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;
    padding: 10px;

}

.trans .router-link-active {
  color: var(--popularCalar);
  border-bottom: 3px solid var(--popularCalar);
}

.imge-profilee{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 100%;
    left: 20px;
    background-color: white;
    transform: translate(0,-50%);
    border-radius: 50%;
    border: 2px solid white;
}
.imge-profilee img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.shop-btn a{
  color: white;
}
  .dark-mode {
    background-color: rgb(19, 19, 19);
  }
  @media print{
      #infoUser{
        display: none !important;
      }
    
    
    }
  </style>
  