<template>
  <div class="dropdown">
    <button class="dropbtn" @click="toggle">:</button>
    <div v-if="visible" class="dropdown-content">
      <a href="#" @click.prevent="profile(user)">
        <span>بروفايل</span><font-awesome-icon  class="icon" icon="user" /> 
      </a>
      <a v-if="user.number" :href="'https://wa.me/2' + user.number" target="_blank">
        <span>واتس</span> <font-awesome-icon  class="icon" :icon="['fab', 'whatsapp']" />
      </a>
    </div>
  </div>
</template>
  
  <script>
  
    export default {
    emits: ['closeOthers'],
    name: "DropdownMenu",
    props: {
      user: Object,
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
  
  
   // ============ my actions => start =============================================
      // ============ my actions => end ==============================================
  
  
      toggle() {
        this.visible = !this.visible;
        if (this.visible) {
          this.$emit('closeOthers');
        }
      },
    
      profile(user) {
        this.$router.push({ name: 'AdminUserOrder', params: { profileId: user.id } });

     },
      nothing() {
        console.log("nothing");
      },
     
  
      closeDropdown() {
        this.visible = false;
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.closeDropdown();
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
  };
  </script>
  
  <style scoped lang="scss">
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropbtn {
    cursor: pointer;
    font-size: 20px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    &:hover {
      background-color: rgb(192, 190, 186);
    }
  }
  .dropdown-content {
    position: absolute;
    right: 20px;
    background-color: white;
    min-width: 130px;
    height: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 15px;
    z-index: 1;
    padding-bottom: 10px;
  }
  .dropdown-content a {
    height: calc(100% / 2);
    border-radius: 15px;
    color: rgb(31, 31, 48);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    line-height: 25px;

     .icon, span {
      margin-right: 10px; 
  }

    &:hover {
    background-color: #ddd;
  }
  
  }
  </style>
  