<template>
  <header :class="{ 'dark-mode-header': getDarkMode }">
    <div :class="{ 'dark-mode': getDarkMode }">
      <div class="cont-threeLines">
        <img
          v-on:click="appearMenue()"
          class="threeLines"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDcuD37EZ7RcuSCK-xgiviaswyxNkGoXYggQ&usqp=CAU"
        />
      </div>
      <div :class="{ 'dark-mode-header-first': getDarkMode }">
        <img
          class="searchIcon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzOOcc8zmCDsFQDkDQKfSwt-zN9jKB0xYhjg&usqp=CAU&reload=on"
        />
        <input
          :class="{ 'dark-mode-header-first': getDarkMode }"
          placeholder="search"
          type="search"
        />
      </div>
    </div>
    <div>
      <div class="icon-noti">
        <a href="https://ahmedabdosoftware.github.io/websiteUpdated-DSD/">
          <font-awesome-icon icon="store"  class="icon"/>
        </a>
      </div>
      <div class="icon-noti">
        <img
          class="icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WwKlKFSsvyMhbxygrwac256XsnEe-aPtkQ&usqp=CAU"
        />
      </div>
      <div class="profile-cont">
        <img
          class="icon profile"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlo1-fGoWrSZLpqx-_GVEOJJRTi3xtkFdl6Q&usqp=CAU"
        />
      </div>
    </div>
  </header>
</template>
<script>
// import router from "./router";
export default {
  name: "HeaderAdmin",
  methods: {
    appearMenue() {
      document.getElementById("sidebar").style.cssText = "left:0%;";
    },
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
  },
};
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 63px;
  background-color: white;
  // background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 2;
  border-bottom: 2px solid rgb(215, 213, 213);
}

header > div:nth-child(1) {
  min-width: 28%;
  height: 40px;
  // background-color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  margin-left: 15px;
  > div:first-child {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 10px;
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    width: 70%;
    height: 100%;
    border-radius: 5px;
    margin-left: 20px;

    img {
      width: 20%;
      height: 30px;
      mix-blend-mode: multiply;
    }
    input {
      border-radius: 5px;
      width: 80%;
      height: 100%;
      padding-left: 10px;
      border: none;
    }
    input:focus {
      outline: none;
    }
  }
}
header > div:nth-child(2) {
  width: 170px;
  height: 100%;
  //   background-color: red;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.icon-noti {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
}
.icon {
  width: 20px;
  height: 20px;
}
.profile-cont {
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.profile {
  border-radius: 20px;
  width: 40px;
  height: 40px;
}
.threeLines {
  width: 20px;
  height: 20px;
  display: none;
}
.cont-threeLines{
  display: none;
}
.dark-mode-header {
  background-color: black;
  border-bottom: 2px solid rgb(26, 26, 26) !important;
}
.dark-mode {
  background-color: black;
}
.dark-mode-header-first {
  background-color: rgb(36, 36, 36) !important;
}

@media print {
  header {
    display: none ;
  }
  }

/* media => ipad */
@media (max-width: 821px) {
  header {
    width: 100%;
    right: 0%;
  }
  .threeLines {
    display: block;
  }
  .cont-threeLines{
    display: block;
  }
}
// phone
@media (max-width: 477px) {
  header{
    >div:first-child{
      // background-color: darkcyan;
      >div:nth-child(2){
        // background-color: red;
        width: 170px !important;
      }
      >div:nth-child(1){
        // background-color: aqua;
      }
    }
  }
}

</style>
