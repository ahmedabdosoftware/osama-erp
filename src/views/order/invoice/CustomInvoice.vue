<template>
    <div class="customInvoice">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">custom invoice</p>
        </div>
        <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <FormImage></FormImage>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="handelUpdateOrder">
                

                <div class="formbold-input-flex">
                  <div></div>
                  <div>
                      <label for="addedOrders" class="formbold-form-label aline-end">المنتجات المضافة الآن</label>
                      <select
                        class="formbold-form-input aline-end"
                        v-model="selectProductForUpdateProp"
                        id="addedOrders"
                        @change="selectProductForUpdate"
                          placeholder=" اختر من المضافة المنتجات "
                      >
                        <option v-for="product in addedOrders" :value="product.id" :key="product.id">
                          {{ product.name }}
                        </option>
                      </select>
                  </div>
                </div>

                <div class="formbold-input-flex">
                  
                  <div>
                    <label for="ampuntOfIncrease" class="formbold-form-label aline-end">   مقدار الزيادة او النقصان</label>
                    <input
                    type="number"
                    id="ampuntOfIncrease"
                    placeholder="ادخل قيمة الزيادة"
                    class="formbold-form-input aline-end"
                    v-model="amountOfIncrease"
                    />
                  </div>
                  <div>  
                    <label for="product" class="formbold-form-label aline-end">  المنتج  </label>
                    <ValidationProvider name="المنتج"  :rules="`${addedOrders.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                      <input list="propList"  class="formbold-form-input aline-end"  placeholder="المنتج" v-model="selectedProduct" >
                      
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  
                </div>
               
                <div class="formbold-mb-3 cont_add_del_upda">
                  <button 
                    @click.prevent="editProduct" 
                    :disabled="!selectedProduct || (editOfInstallation <= 0 && amountOfIncrease == 0)" 
                    class="addProduct-btn"
                  >
                    تعديل السعر
                  </button>
                </div>

                <div class="formbold-input-flex">
                  <div>
                      <label class="formbold-form-label aline-end"  for="readonlyInput">حدد كيف يعرض</label>
                      <input
                        type="text"
                        id="readonlyInput"
                        v-model="customShipping"
                        class="formbold-form-input"
                        placeholder="ex: 300+300+200"

                      />
                    </div>
                    <div>
                        <label class="formbold-form-label aline-end" for="readonlyInput">الشحن  </label>
                        <input
                          type="text"
                          id="readonlyInput"
                          v-model="shipping"
                          readonly
                          class="formbold-form-input aline-end"
                        />
                    </div>
              </div>
             
              <div class="display-options">
                <label >
                 اظهار الخصومات فى الفاتورة 
                  <input type="checkbox" v-model="displaySale" />
                </label>
              </div>              
              <div class="display-options">
                <label >
                 ارفاق الفاتورة العادية والمخصصة عند العملاء
                  <input type="checkbox" v-model="displayTowInvoice" />
                </label>
              </div>              
               
                 

                <button class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid"  >حفظ و إنشاء الفاتورة</button>
                   
               </form>
              </ValidationObserver>

            </div>
            </div>
      </div>
      <CircleLoader :show="isLoading" />

    </div>
  </template>

  
<script>
  
import { extend } from 'vee-validate';
import { required , double , min_value  } from 'vee-validate/dist/rules';

// Register rules with custom messages

extend('required', {
...required,
message: '{_field_} مطلوب'

});

extend('double', {
...double,
message: '{_field_} يجب أن يكون رقمًا'
});

extend('min_value', {
...min_value,
message: '{_field_} يجب أن يكون على الأقل {min}'
});

extend('date_format', {
validate(value) {
  const regex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
  return regex.test(value);
},
params: ['format'],
message: '{_field_} يجب أن يكون بالتنسيق الصحيح {format}'
});

// actions , states
import { mapActions , mapState } from 'pinia'

// FormImage
import FormImage from "@/shared/components/svgImage/FormImage.vue";
// CircleLoader
import CircleLoader from '@/shared/components/loading/CircleLoader.vue';

import { useOrdersStore } from '@/store/order/orders.js';

// sweetalert 
import sweetalert from "sweetalert";

export default {
  name: "AddNewOrder",
  components: {
    FormImage,
    CircleLoader,
  },
  data() {
      return {
      // for all products added  
         addedOrders: [],

      // product data  
        selectedProduct:'',
        productId:'',
        productInfo:'',
        amountOfIncrease: 0,
        editOfInstallation: 0,
        fixedInstallation: 0,
      

        // selectProductForUpdate
        selectProductForUpdateProp:'',

        // follow edit state
        isEditingProduct: false, 

        
        

        
        Id:null,
        // rest of order data 
        shipping: '',
        customShipping: '',
                
        // loading 
        isLoading: false,

        displayTowInvoice:false,
        displaySale:true,
        displayInstallation:false,
      };
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },

       
    ...mapState(useOrdersStore, ['orders']),

  },

  async created() {
    await this.fetchOrders()
    this.Id = this.$route.params.orderId;
    this.fetchOrderDetails();
    
  },
  methods: {
      
    // ============ my actions => start =============================================
    ...mapActions(useOrdersStore, ['updateOrder','fetchOrders']),
    // ============ my actions => end ==============================================
   
    // ============ show order data  => start ==============================================
    async fetchOrderDetails() {
      const order = this.orders.find(order => order.id === this.Id);
      if (order) {
      this.addedOrders = order.products;
      this.shipping = order.shipping;
      this.displayTowInvoice = order.displayTowInvoice || false;
      this.displayInstallation = order.displayInstallation || false;
      this.fixedInstallation = order.fixedInstallation || 0;
      this.displaySale = order.displaySale || true;
      this.customShipping = order.customShipping || '';
      this.selectedProduct =this.addedOrders[0].name
      this.productId=this.addedOrders[0].id
      this.productInfo=this.addedOrders[0].productInfo
        }
    },
    // ============ show order data  => end ==============================================


 
   clearProductForm() {
    this.selectedProduct = '';
    this.productId = '';
    this.productInfo = '';
    this.selectProductForUpdateProp = '';
    this.editOfInstallation = 0;
    this.amountOfIncrease = 0;
    this.isEditingProduct = false; 
  },


  selectProductForUpdate() {
    const selectedUpdatePro = this.addedOrders.find(product => product.id === this.selectProductForUpdateProp);
    if (selectedUpdatePro) {
      this.selectedProduct = selectedUpdatePro.name;
      this.productId = selectedUpdatePro.id;
      this.productInfo =selectedUpdatePro.productInfo,
      this.amountOfIncrease =selectedUpdatePro.amountOfIncrease||0,
      this.editOfInstallation =selectedUpdatePro.editOfInstallation||0,
      this.isEditingProduct = true;
      console.log( this.productId,this.productInfo)
      console.log( selectedUpdatePro)
    }
  },

  editProduct() {
      const index = this.addedOrders.findIndex(product => product.id === this.productId);

      if (index !== -1) {

        if(Number(this.amountOfIncrease) !== 0 ){
          console.log("inside")
          var spichialPrice = this.productInfo.priceMaterial + parseFloat(this.amountOfIncrease);
          this.addedOrders[index].amountOfIncrease = this.amountOfIncrease;
          this.addedOrders[index].priceWithIncrease = spichialPrice;
        }
        if( Number(this.editOfInstallation) >0 ){

          this.addedOrders[index].editOfInstallation = this.editOfInstallation;
        }
        console.log('spichialPrice',spichialPrice,'this.productInfo.priceMaterial',this.productInfo.priceMaterial,'this.amountOfIncrease',this.amountOfIncrease, "editOfInstallation", this.editOfInstallation)
        this.clearProductForm();
        console.log(this.addedOrders)
      }
    },
  
 
 
 
  // ============ update New oredr => start =====================================

  async handelUpdateOrder() {
      
    this.isLoading = true;

  try {
    if (this.addedOrders.length === 0) {
      sweetalert("لا يمكن إنشاء الطلب بدون منتجات.", "يرجى إضافة منتجات قبل إنشاء الطلب.", "error");
      this.isLoading = false;
      return;
    }


   
   
    const updatedOrderData  = {

          id: this.Id,
      
          products: this.addedOrders,
          hasCustomInvoice: true,
          customShipping: this.customShipping,
          displaySale: this.displaySale,
          displayTowInvoice: this.displayTowInvoice,
          displayInstallation: this.displayInstallation,
          fixedInstallation: this.fixedInstallation
    
    };
    console.log('before send');

    await this.updateOrder(updatedOrderData );

    console.log('after send');
    this.isLoading = false;
    sweetalert("تم تعديل الطلب بنجاح!", "سيتم إعادة توجيهك إلى صفحة الفاتورة.", "success");

    this.$router.push({ name: 'Fatora', params: { orderId: this.Id , isCustom:"true"} });
  } catch (error) {
    console.error('Error creating order:', error);
    this.isLoading = false;
    sweetalert("خطأ في تعديل الطلب", "يرجى المحاولة مرة أخرى.", "error");
  }
},
  // ============ creat New oredr => end =======================================
  
}
};
</script>

  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  .customInvoice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 13px;
    //background-color: aqua;
  }
  .title {
    width: 250px;

    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    p {
      text-transform: capitalize;
      font-size: 22px;
      font-weight: 600;
    }
  }
  



.allContentt {
    width: 670px;
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    background-color: white;
    border-radius: 10px;
    border: solid 1px rgb(181, 179, 179);
  }
.display-options{
  //background-color: rgb(207, 83, 83);
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}
  // phone
  @media (max-width: 477px) {
    .title {
      p {
        margin-left: 60px;
      }
    }
    .allContentt {
      width: 370px !important;
    }
    
  }
  
  // phone
  @media (max-width: 370px){
    
    .allContentt {
      width: 340px !important;
    }
   }
  </style>
  