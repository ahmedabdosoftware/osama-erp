<template>
  <div class="dropdown">
    <button class="dropbtn" @click="toggle">:</button>
    <div v-if="visible" class="dropdown-content">
      <a href="#" @click.prevent="viewDetails(order)">
        <span>تفاصيل</span> <font-awesome-icon class="icon" :icon="['fas', 'eye']" />
      </a>
      <a v-if="layout === 'DashboardLayout'" href="#" @click.prevent="editOrder(order)">
        <span>تعديل</span> <font-awesome-icon class="icon" :icon="['fas', 'edit']" />
      </a>
      <a v-if="layout === 'DashboardLayout'" href="#" @click.prevent="delette(order)">
        <span>حذف</span> <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
      </a>
      <a v-if="isAdmin || shouldDisplayDiscount" href="#" @click.prevent="Fatora(order.id, false)">
        <span>فاتورة</span> <font-awesome-icon class="icon" :icon="['fas', 'file-invoice']" />
      </a>
      <a v-if="order.hasCustomInvoice && (isAdmin || isClint)" href="#" @click.prevent="Fatora(order.id, true)">
        <span>  فاتورة (م)</span> <font-awesome-icon class="icon" :icon="['fas', 'file-invoice']" />
      </a>
      <a v-if="order.financialClientTransactionId && (isAdmin || isClint)" href="#" @click.prevent="financial('TransactionDetails',order.financialClientTransactionId)">
      <span>م.العميل </span> <font-awesome-icon class="icon" :icon="['fas', 'file-invoice']" />
      </a>
      <a v-if="order.financialTechnicalTransactionId && (isAdmin || isTechnical)" href="#" @click.prevent="financial('TransactionDetails',order.financialTechnicalTransactionId)">
        <span> م.الفنى</span> <font-awesome-icon class="icon" :icon="['fas', 'file-invoice']" />
      </a>
      <a v-if="order.customerInfo.number && isTechnical||isAdmin " :href="'https://wa.me/2' + order.customerInfo.number" target="_blank">
        <span>واتس</span> <font-awesome-icon class="icon" :icon="['fab', 'whatsapp']" />
      </a>
    </div>
  </div>
</template>


<script>


// actions , states
import { mapActions,mapState } from 'pinia'
//store
import { useOrdersStore } from '@/store/order/orders.js';
import { useUserStore } from '@/store/auth/auth.js';
  
// sweetalert 
import sweetalert from "sweetalert";

export default {
  emits: ['closeOthers'],
  name: "DropdownMenu",
  props: {
    order: Object,
  },
  data() {
    return {
      visible: false,
      layout:this.$route.meta.layout,
    };
  },
  
  computed:{
    ...mapState(useUserStore, ['isAdmin','isClint','isTechnical']),

    shouldDisplayDiscount() {
      if (this.isClint && this.order.hasCustomInvoice) {

        if(this.order.displayTowInvoice){
          return true;
          }else{
            return false
          }
        
      }else if(this.isClint &&(this.order.hasCustomInvoice==false || this.order.hasCustomInvoice==""||this.order.hasCustomInvoice==null)){
        return true;
      }
      return false;
    
    },

    
  },
  methods: {

 // ============ my actions => start =============================================
 ...mapActions(useOrdersStore, ['deleteOrder', 'deleteImageFromStorage']),
    // ============ my actions => end ==============================================


    toggle() {
      this.visible = !this.visible;
      if (this.visible) {
        this.$emit('closeOthers');
      }
    },
    financial(section, id){
      const profileId = this.$route.params.profileId;
      const layout = this.$route.meta.layout;
      console.log("financial layout:", layout);
      if (layout === 'DashboardLayout') {
        this.$router.push( `/dashboard/${section}/${id}`);
      } else if (layout === 'profileInDashboardLayout') {
        this.$router.push( `/dashboard/profile/${profileId}/${section}/${id}`);
      } else if (layout === 'profileOutDashboardLayout') {
        this.$router.push( `/profile/${profileId}/${section}/${id}`);
      }   
    },
    viewDetails(order) {
      console.log("View details of order:", order);
    
      const layout = this.$route.meta.layout;
        if (layout === 'DashboardLayout') {
        
          this.$router.push({ name: 'DetailsOrder', params: { orderId:order.id } });
        
        } else if (layout === 'profileInDashboardLayout') {
          
          const profileId = this.$route.params.profileId;
          this.$router.push(`/dashboard/profile/${profileId}/DetailsOrder/${order.id}`);
          
        }else if(layout === 'profileOutDashboardLayout'){
          
          const profileId = this.$route.params.profileId;
          this.$router.push(`/profile/${profileId}/DetailsOrder/${ order.id}`);
        
        }

      
    },
    editOrder(order) {
    this.$router.push({ name: 'EditOrder', params: { orderId: order.id } });
   },
   
  Fatora(orderId, isCustom) {
    const isCustomPath = isCustom ? 'true' : 'false';
    const layout = this.$route.meta.layout;
    if (layout === 'DashboardLayout') {
      this.$router.push(`/dashboard/Fatora/${orderId}/${isCustomPath}`);
    } else if (layout === 'profileInDashboardLayout') {
      const profileId = this.$route.params.profileId;
      this.$router.push(`/dashboard/profile/${profileId}/Fatora/${orderId}/${isCustomPath}`);
    } else if (layout === 'profileOutDashboardLayout') {
      const profileId = this.$route.params.profileId;
      this.$router.push(`/profile/${profileId}/Fatora/${orderId}/${isCustomPath}`);
    }
  },


    nothing() {
      console.log("nothing");
    },
    async delette(order) {
      try {
        console.log(order.id);
        await this.deleteOrder(order.id);
        console.log("order deleted from database");
        if(order.imageUrl){
          console.log("before : order image deleted from storage");
          // delete image from storage
          await this.deleteImageFromStorage(this.order.imageUrl);
        console.log("after :order image deleted from storage");
        }

        sweetalert({
          text: "Product deleted successfully",
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
