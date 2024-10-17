<template>
    <div class="dropdown">
      <button class="dropbtn" @click="toggle">:</button>
      <div v-if="visible" class="dropdown-content">
        <a href="#" @click.prevent="generateRoute('TransactionDetails',transaction.id)">
        <span>تفاصيل</span> <font-awesome-icon class="icon" :icon="['fas', 'eye']" />
      </a>
        <a v-if="isAdmin"  href="#" @click.prevent="generateRoute('EditTransaction',transaction.id)">
        <span>تعديل</span> <font-awesome-icon class="icon" :icon="['fas', 'edit']" />
        </a>
        <a v-if="isAdmin"  href="#" @click.prevent="deletteFinancial(transaction)">
            <span>حذف</span> <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
        </a>
      </div>
    </div>
  </template>
    
<script>
import { mapActions, mapState } from 'pinia';
//store
import { useUserStore } from '@/store/auth/auth.js';
import { useTransactionsStore } from '@/store/transactions/transactions.js';
import { useOrdersStore } from '@/store/order/orders.js';

import sweetalert from "sweetalert";

export default {
  emits: ['closeOthers'],
  name: "DropdownMenu",
  props: {
    transaction: Object,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAdmin', 'isClint', 'isTechnical']),
  },
  methods: {
    ...mapActions(useTransactionsStore, ['deleteTransaction']),
    ...mapActions(useOrdersStore, ['updateOrder']),

    toggle() {
      this.visible = !this.visible;
      if (this.visible) {
        this.$emit('closeOthers');
      }
    },


    viewDetails() {},
    
    generateRoute(section,id) {

      const profileId = this.$route.params.profileId;
      const layout = this.$route.meta.layout;
      
      if (layout === 'profileInDashboardLayout') {
        this.$router.push( `/dashboard/profile/${profileId}/${section}/${id}`);
      } else if (layout === 'profileOutDashboardLayout') {
        this.$router.push( `/profile/${profileId}/${section}/${id}`);
      }
    },

    async deletteFinancial(transaction) {
      try {
        await this.deleteTransaction(transaction.id, this.$route.params.profileId);

        if (transaction.orderId) {
          const updatePayload = {
            id: transaction.orderId,
            ...(transaction.transactionType === 'فنى'
              ? { financialTechnicalTransactionId: null }
              : { financialClientTransactionId: null }),
          };

          await this.updateOrder(updatePayload);
        }

        sweetalert({
          text: "Transaction deleted successfully",
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
      min-width: 130px;
      min-height: 100px;
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
    