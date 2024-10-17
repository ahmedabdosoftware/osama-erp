<template>
    <div class="dropdown">
      <button class="dropbtn" @click="toggle">setting</button>
      <div v-if="visible" class="dropdown-content">
        <a v-if="isTechnical || isClint" href="#" @click.prevent="logOut()">
          <font-awesome-icon  class="icon" icon="user" /> <span>log out</span>
        </a>
        <a href="#">
          <font-awesome-icon  class="icon" icon="user" /> <span> photo</span>
        </a>
       
      </div>
    </div>
  </template>
    
<script>

//store
import { useUserStore } from '@/store/auth/auth.js';

// actions , states
import { mapActions,mapState } from 'pinia'
      export default {
      name: "DropdownMenu",
      data() {
        return {
          visible: false,
        };
      },
      computed:{
      ...mapState(useUserStore, ['isAdmin','isClint','isTechnical']),
      },
      methods: {
    
    
     // ============ my actions => start =============================================
     ...mapActions(useUserStore, ["logout"]),
        // ============ my actions => end ==============================================
    
    
        toggle() {
          this.visible = !this.visible; 
        },
      
     
        async logOut(){
        await this.logout()
        this.$router.push('/login');
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
      width: 25%;
    }
    .dropbtn {
      cursor: pointer;
      font-size: 17px;
      width: 100%;
      line-height: 40px;
      color:rgb(121, 120, 120);
      font-weight: 600;
      text-align: center;
      background-color: white;

      
    }
    .dropdown-content {
      position: absolute;
      right: 20px;
      background-color: white;
      min-width: 140px;
      height: 50px;
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
        margin-right: 6px; 
    }
  
      &:hover {
      background-color: #ddd;
    }
    
    }
    </style>
    