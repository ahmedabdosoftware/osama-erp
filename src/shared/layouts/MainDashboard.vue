<template>
   <div :class="{ 'dark-mode': getDarkMode }" id="main-layout">
      <HeaderAdmin class="headerCom"/>
      <Sidebar :class="{ 'dark-moode': getDarkMode }"  />
      <router-view class="content-view" :class="{ 'dark-mode': getDarkMode }"/>
  </div>

  </template>
  
  <script>
  import HeaderAdmin from "@/components/global/HeaderAdmin.vue";
  import Sidebar from "@/components/global/Sidebar.vue";
  
  export default {
    name: "MainLayout",
    components: {
      HeaderAdmin,
      Sidebar,
    },
    data() {
      return {
      };
    },
    methods: {
    },
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  #main-layout {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    min-height: 800px;
  }
  
.content-view {
  min-height: 100vh;
  background-color: hsl(0, 100%, 98%);
// background-color: rgba(139, 69, 19, 0.05); // بني فاتح جدًا مع شفافية 5%
  margin-left: 20%;
  box-sizing: border-box;
  width: 80%;
}


.content-view,.headerCom {
  transition: margin-left 0.3s ease, width 0.3s ease;
}
.sidebar-collapsed ~ .content-view {
  margin-left: 5%;
  width: 95%;
}
.headerCom{
  width: 80%;
  margin-left: 20%; 
}
.sidebar-collapsed  .headerCom {
  margin-left: 5% ;
  width: 95% ;
}
.dark-mode {
    background-color: rgb(19, 19, 19);
  }
  @media (max-width: 821px) {
    .content-view {
      width: 100% !important;
      margin-left: 0px;
    }
    .sidebar-collapsed ~ .content-view{
      margin-left: -1% !important;
      width: 100% !important;
    }
    .headerCom{
      width: 100% !important;
      margin-left: 0% !important;
    }
    
  }
  </style>
  