<template>
    <div :style="dropdownStyle" class="dropdown">
      <div class="dropdown-content">
        <slot></slot> 
        
      </div>
    </div>
  </template>
  
  
  <script>
  
  
  export default {
    name: "DropDownMenuSidebar", 
    props: ["position"],
    computed: {
    // بناءً على الـ prop "position" يتم تحديد الموقع
    dropdownStyle() {
      if (this.position === "products") {
        return {
          left: '65px',
          top: '170px',
        };
      } else if (this.position === "storage") {
        return {
          left: '65px',  
          top: '400px',
        };
      } else if (this.position === "purchases") {
        return {
          left: '65px',  
          top: '450px',
        };
      }
      return {}; 
    },
  },

   
  };
  </script>
  
  <style scoped lang="scss">
  .dropdown {
    position: fixed;
    display: none;
    width: 110px;
    z-index: 1000; 
    height: 180px;
    background-color: white !important;

  }
  .dropdown-content {
    position: absolute;
    left: 0px;
    background-color: white;
    width: 110px;
    height: 180px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 15px;
    z-index: 777;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;  
    align-items: flex-start;
  }
  .dropdown-content a {
    height: 15px;
    border-radius: 15px;
    color: rgb(31, 31, 48);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    line-height: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    margin-top: 5px;
    font: {
        size: 12px;
        weight:500;
    }
    
    &:hover {
      background-color: #ddd;
    }
  }
  .dropdown-content a:last-child{
    margin-bottom: 10px ;
  }
  </style>
  