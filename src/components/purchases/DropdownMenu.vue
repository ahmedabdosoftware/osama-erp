<template>
    <div class="dropdown">
      <button class="dropbtn" @click="toggle">:</button>
      <div v-if="visible" class="dropdown-content">
        <a  href="#" @click.prevent="viewPurchase(purchase)">
          <span>التفاصيل</span> <font-awesome-icon class="icon" :icon="['fas', 'eye']" />
        </a>
        <a  href="#" @click.prevent="returnPurchase(purchase)">
          <span> اضف مرتجع</span> <font-awesome-icon class="icon" :icon="['fas', 'edit']" />
        </a>
        <a  href="#" @click.prevent="listReturnPurchase(purchase.id)">
          <span>ق. المرتجعات </span> <font-awesome-icon class="icon" :icon="['fas', 'undo']" />
        </a>
        <a  href="#" @click.prevent="delette(purchase)">
          <span>حذف</span> <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
        </a>
      </div>
    </div>
  </template>
  
  
  <script>
  
  
  // actions 
  import { mapActions } from 'pinia'

  //store
  import { usePurchasesStore } from '@/store/purchases/purchase.js';
    
  // sweetalert 
  import sweetalert from "sweetalert";
  
  export default {
    emits: ['closeOthers'],
    name: "DropdownMenu",
    props: {
        purchase: Object,
    },
    data() {
      return {
        visible: false,
      };
    },
    
    methods: {
  
   // ============ my actions => start =============================================
   ...mapActions(usePurchasesStore, [ 'deletePurchase']),
      // ============ my actions => end ==============================================
  
  
      toggle() {
        this.visible = !this.visible;
        if (this.visible) {
          this.$emit('closeOthers');
        }
      },
      
      viewPurchase(purchase) {
          console.log(purchase);
          this.$router.push({ name: 'DetailsPurchase', params: { purchasesId: purchase.id } });
        },
      returnPurchase(purchase) {
          console.log(purchase);
          this.$router.push({ name: 'PurchaseReturn', params: { purchasesId: purchase.id } });
     },
     listReturnPurchase(id) {
          console.log(id);
          this.$router.push({ name: 'ReturnsWithId', params: { purchaseId: id } });
     },
      
      async delette(purchase) {
        try {
          console.log(purchase.id);
          await this.deletePurchase(purchase.id);
          console.log("purchase deleted from database");
          sweetalert({
            text: "purchase deleted successfully",
            icon: "success",
          });
        } catch (error) {
          console.error("Deletion failed", error);
          sweetalert({
            text: `Error: ${error.message}`,
            icon: "error",
          });
        }
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
    min-width: 153px;
    min-height: 60px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 15px;
    z-index: 1;
    padding-bottom: 10px;
  }
  .dropdown-content a {
    height: 30px;
    border-radius: 15px;
    color: rgb(31, 31, 48);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    line-height: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .icon, span {
      margin-right: 10px; 
    }
    
    &:hover {
      background-color: #ddd;
    }
  }
  </style>
  