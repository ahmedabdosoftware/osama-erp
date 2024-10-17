<template>
  <div class="statistics">
      <div class="statistics_search">
          <select placeholder="filter"  class="filter" v-model="selectedFilter">
              <option value="all">منذ ان بدات </option>
              <option value="today">االيوم </option>
              <option value="yesterday" > امس</option>
              <option value="lastWeak"> اخر اسبوع</option>
              <option value="lastMonth">  الشهر الماضى</option>
              <option value="lastYear"> اخر سنة</option>
          </select>
      </div>
      <div class="statistics_ressults">
          <div class="statistics_result">
              <div>
                  <font-awesome-icon class="iconAwesome" icon="file-invoice-dollar" />
              </div>
              <div>
                  <p>مشتريات غير مدفوعة</p>
                  <span>20000</span>
              </div>
          </div>
          <div class="statistics_result">
              <div>
                  <font-awesome-icon class="iconAwesome" icon="shopping-cart" />
              </div>
              <div>
                  <p>اجمالى المشتريات</p>
                  <span>20000</span>
              </div>
          </div>
          <div class="statistics_result statistics_result--nonPaid">
              <div>
                  <font-awesome-icon class="iconAwesome" icon="clipboard-list" />
              </div>
              <div>
                  <p class="supResul supResul--title">طلبات غير مدفوعة (غير منتهى)</p>
                  <p class="supResult"> <span> خامات :</span> {{ calculateTotalSalesForUnfinishedOrders }} </p>
                  <p class="supResult supResul--installation"> <span> مصنعية :  </span> {{ calculateTotalInstallationForUnfinishedOrders }} </p>
              </div>
          </div>
          <div class="statistics_result">
              <div>
                  <font-awesome-icon class="iconAwesome" icon="dollar-sign" />
              </div>
              <div>
                  <p>الربح (مصنعية)</p>
                  <span>{{ calculateTotalInstallationForAllOrders }}</span>
              </div>
          </div>
          <div class="statistics_result">
              <div>
                  <font-awesome-icon class="iconAwesome" icon="box-open" />
              </div>
              <div>
                  <p>(الخامات) المبيعات</p>
                  <span>{{ calculateTotalSales }}</span>
              </div>
          </div>
          <div class="statistics_result">
              <div>
                  <font-awesome-icon class="iconAwesome" icon="cash-register" />
              </div>
              <div>
                  <p>صافى المبيعات</p>
                  <span>20000</span>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useOrdersStore } from '@/store/order/orders.js';
import moment from 'moment';

export default {
name: "statistics",
data() {
  return {
    selectedFilter: 'all',
  };
},
computed: {
  ...mapState(useOrdersStore, {
    orders: 'orders',
  }),


// anchint way "undynamic way"
filteredOrders() {
    const now = moment();

    return this.orders.filter(order => {
      const orderDate = moment(order.date);
      
      if (!orderDate.isValid()) {
        console.error('Invalid Date:', order.date);
        return false;
      }
      
      switch (this.selectedFilter) {
        case 'today':
          return orderDate.isSame(now, 'day');
        case 'yesterday':
          return orderDate.isSame(now.clone().subtract(1, 'days'), 'day');
        case 'lastWeak': {
          const startOfWeek = now.clone().subtract(7, 'days').startOf('day');
          const endOfWeek = now.clone().endOf('day');
          return orderDate.isBetween(startOfWeek, endOfWeek, 'day', '[]');
        }
        case 'lastMonth': {
          const startOfThisMonth = now.clone().startOf('month');
          const startOfLastMonth = now.clone().subtract(1, 'month').startOf('month');
          return orderDate.isBetween(startOfLastMonth, startOfThisMonth, null, '[]');
        }
        case 'lastYear':
          return orderDate.isBetween(now.clone().subtract(1, 'year'), now, null, '[]');
        case 'all':
        default:
          return true;
      }
    });
  },




  filteredOrders() {
    return this.filterDataByDate(this.orders, 'order.date'); 
  },
  filteredPurchases() {
    return this.filterDataByDate(this.purchases, 'purchaseDate'); 
  },
  calculateTotalInstallationForAllOrders() {
    console.log("calculateTotalInstallationForAllOrders",this.filteredOrders)
    const totalInstallation = this.filteredOrders.reduce((total, order) => {
      if (order.laborPrice) {
        return total + parseFloat(order.laborPrice);
      } else {
        const orderTotalInstallation = order.products.reduce((subTotal, product) => {
          if (product.productInfo.priceWithLabor) {
            return subTotal + product.productInfo.priceWithLabor * product.quantity;
          } else {
            return subTotal;
          }
        }, 0);
        return total + orderTotalInstallation;
      }
    }, 0);
  
    return totalInstallation.toFixed(2);
  },

  calculateTotalSales() {
    console.log("calculateTotalSales",this.filteredOrders)

    const totalSales = this.filteredOrders.reduce((total, order) => {
      const orderTotalSales = order.products.reduce((subTotal, product) => {
        const productTotalPrice = product.productInfo.priceMaterial * product.quantity;
        const discountAmount = productTotalPrice * (product.price_offer / 100);
        return subTotal + (productTotalPrice - discountAmount);
      }, 0);
      return total + orderTotalSales;
    }, 0);
  
    return totalSales.toFixed(2);
  },

  calculateTotalInstallationForUnfinishedOrders() {
    // Filter out unfinished orders and calculate installation cost
    const unfinishedOrders = this.filteredOrders.filter(order => order.status == '1' );
    return unfinishedOrders.reduce((total, order) => {
      if (order.laborPrice) {
        return total + parseFloat(order.laborPrice);
      } else {
        const orderTotalInstallation = order.products.reduce((subTotal, product) => {
          if (product.productInfo.priceWithLabor) {
            return subTotal + product.productInfo.priceWithLabor * product.quantity;
          } else {
            return subTotal;
          }
        }, 0);
        return total + orderTotalInstallation;
      }
    }, 0).toFixed(2);
  },

  calculateTotalSalesForUnfinishedOrders() {
    // Filter out unfinished orders and calculate sales
    const unfinishedOrders = this.filteredOrders.filter(order => order.status == '1' );
    return unfinishedOrders.reduce((total, order) => {
      const orderTotalSales = order.products.reduce((subTotal, product) => {
        const productTotalPrice = product.productInfo.priceMaterial * product.quantity;
        const discountAmount = productTotalPrice * (product.price_offer / 100);
        return subTotal + (productTotalPrice - discountAmount);
      }, 0);
      return total + orderTotalSales;
    }, 0).toFixed(2);
  },
},
methods: {
  ...mapActions(useOrdersStore, ['fetchOrders']),

  filterDataByDate(data, dateField) {
    const now = moment();
    return data.filter(item => {
      const itemDate = moment(item[dateField]);
      
      if (!itemDate.isValid()) {
        console.error('Invalid Date:', item[dateField]);
        return false;
      }
      
      switch (this.selectedFilter) {
        case 'today':
          return itemDate.isSame(now, 'day');
        case 'yesterday':
          return itemDate.isSame(now.clone().subtract(1, 'days'), 'day');
        case 'lastWeak': {
          const startOfWeek = now.clone().subtract(7, 'days').startOf('day');
          const endOfWeek = now.clone().endOf('day');
          return itemDate.isBetween(startOfWeek, endOfWeek, 'day', '[]');
        }
        case 'lastMonth': {
          const startOfThisMonth = now.clone().startOf('month');
          const startOfLastMonth = now.clone().subtract(1, 'month').startOf('month');
          return itemDate.isBetween(startOfLastMonth, startOfThisMonth, null, '[]');
        }
        case 'lastYear':
          return itemDate.isBetween(now.clone().subtract(1, 'year'), now, null, '[]');
        case 'all':
        default:
          return true;
      }
    });
  },
},
async created() {
  await this.fetchOrders();
},
};
</script>


<style scoped lang="scss">
%center{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.statistics{
width: 96%;
min-height: 300px;
margin-left: 4%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: flex-end;

}

.statistics_ressults{
  background-color: white;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
  align-items: center;
  align-content: space-evenly;
  //background-color: hotpink;
  
}
.statistics_result{
   width: 220px;
   min-height: 100px;
   background-color: rgb(240, 237, 237);
   
   border-radius: 8px;
   margin: 15px 0px;
   display: flex;

   >div:first-child{
      width: 60px;
      height: 100px;
     // background-color: red;
     @extend %center;
  }
  >div:nth-child(2){
      width: 160px;
      height: 100px;
     // background-color: blue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      p,span{
          font: {
              size: 19px;
              weight: 600;
          }
          color: rgb(49, 48, 48);
          padding-right: 5px;
      }
      p{
          color: rgb(109, 108, 108);
          margin-bottom: 10px;
          font-size: 14px;
      }
   }
   
}

.iconAwesome{
  width: 40px;
  height: 40px;
}
.statistics_search{
  width: 200px;
  height: 80px;
  //background-color: red;
  display: flex;
  justify-content:center;
  align-items: center;
  select {
      // margin-right: 400px;
      height: 40px;
      width: 135px;
      border-radius: 8px;
      height: 40px;
      width: 135px;
      text-transform: capitalize;
      color: white;
      background-color: var(--popularCalar);
      text-align: center;
      font: {
          size: 20px;
          weight:600;
      }
      cursor: pointer;
      border: none;
    }
  
  }

@media (max-width: 477px){
  .statistics_ressults{
     // background-color: #f9f7f7;
      background-color:hsl(0, 100%, 98%);
      
  }

  .statistics_result{
      margin: 15px;
      width: 250px;
      height: 100px;
      background-color: white;
  }
  .statistics_result--nonPaid{
    width: 250px;
  }
  .iconAwesome{
      width: 30px;
      height: 30px;
  }
}

</style>









// purchase



<template>
  <div class="addOrder">
      <div class="title">
          <p :class="{ 'dark-mode-title': getDarkMode }">Return Purchases</p>
      </div>
      <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
      <div class="formbold-main-wrapper">
          <div class="formbold-form-wrapper">
            <FormImage></FormImage>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="creatNewPurchase">
             
            <div class="formbold-input-flex">

                  <div>     
                    <ValidationProvider name="حالة الشراء" rules="required" v-slot="{ errors }">
                      <label for="status" class="formbold-form-label">حالة الشراء  </label>

                      <input
                        readonly
                        type="text"
                        id="status"
                        placeholder="الحالة "
                        class="formbold-form-input readOnlyInput"
                        v-model="getStatusText"
                    />
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>   

                  <div>
                      <label for="branch" class="formbold-form-label">   الفرع  </label>
                      <ValidationProvider name="الفرع"   v-slot="{ errors }">
                        <input 
                           readonly
                           class="formbold-form-input readOnlyInput" 
                           placeholder="الفرع" 
                           v-model="selectedBranch"
                           />
                       
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>       

            </div>

              <div class="formbold-input-flex">

                <div>
                    <label for="shipping" class="formbold-form-label"> تفاصيل الشحن </label>
                    <input
                        readonly
                        type="number"
                        id="shipping"
                        placeholder="الشحن "
                        class="formbold-form-input readOnlyInput"
                        v-model="shipping"
                    />
                  </div>
                  <div>
                    <label for="addedOrders" class="formbold-form-label"> سلة المشتريات</label>
                    <select
                      class="formbold-form-input"
                      v-model="selectProductForUpdateProp"
                      id="addedOrders"
                      @change="selectProductForUpdate"
                    >
                      <option v-for="product in addedPurchase" :value="product.id" :key="product.id">
                        {{ product.name }}
                      </option>
                    </select>

                </div>

              </div>
              <div class="formbold-input-flex">
                  
                <div>
                    <ValidationProvider name="الكمية"  :rules="`${addedPurchase.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                      <label for="quantity" class="formbold-form-label">  الكمية المرتجعه</label>

                      <input
                          type="number"
                          id="quantity"
                          placeholder="الكمية"
                          class="formbold-form-input"
                          v-model="quantityReturn"
                      
                      />
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div>
                    <label for="product" class="formbold-form-label">   المنتج  </label>
                    <ValidationProvider name="المنتج"  :rules="`${addedPurchase.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                      <input

                       readonly
                       class="formbold-form-input readOnlyInput"  
                       placeholder=" اختر من السلة للعرض "
                        v-model="selectedProduct" 
                        
                        />
                     
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
              </div>
              <div class="formbold-input-flex">
                  
                  <div>
                      <ValidationProvider name="سعر الشراء"  :rules="`${addedPurchase.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="price_buy" class="formbold-form-label">   سعر الشراء  </label>

                        <input
                            readonly
                            type="number"
                            id="price_buy"
                            placeholder="سعر الشراء"
                            class="formbold-form-input readOnlyInput"
                            v-model="price_buy"
                        
                        />
                        <p  class="info-message">ان قمت بتغير سعر الشراء سيتم تحديثه فى السيستم</p>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
                  <div>
                      <ValidationProvider name="سعر البيع"  :rules="`${addedPurchase.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="price_sell" class="formbold-form-label">  سعر البيع </label>

                        <input
                           readonly
                            type="number"
                            id="price_sell"
                            placeholder="سعر البيع"
                            class="formbold-form-input readOnlyInput"
                            v-model="price_sell"
                        
                        />
                        <p  class="info-message">ان قمت بتغير سعر البيع سيتم تحديثه فى السيستم</p>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
              </div>

              <div class="formbold-mb-3 cont_add_del_upda">
                <button @click.prevent="updateSingleProduct" :disabled="!selectedProduct || !quantity"  class="updateProduct-btn" > تعديل المنتج </button>
                <button @click.prevent="deleteProduct" class="deleteProduct-btn"> حذف </button>
                <button @click.prevent="cancelChange" class="cancelChangeProduct-btn"> الغاء </button>

              </div>

              <div class="formbold-input-flex">

                <div>
                    <label for="discount_value" class="formbold-form-label">  الخصم </label>
                    <input
                       readonly
                        type="number"
                        id="discount_value"
                        placeholder="الخصم "
                        class="formbold-form-input readOnlyInput"
                        v-model="discount_value"
                    />
                </div> 
                <div>     
                    <ValidationProvider name="نوع الخصم"  v-slot="{ errors }">
                      <label for="discount_type" class="formbold-form-label"> نوع الخصم  </label>
                      <input
                        readonly
                        type="number"
                        id="discount_type"
                        placeholder=" نوع الخصم"
                        class="formbold-form-input readOnlyInput"
                        v-model="getStatusTextDiscount"
                      />
                      
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>   
              </div>

              <div class="formbold-mb-3">
                <label for="address" class="formbold-form-label">  عنوان/ اسم المورد </label>
                <input
                
                readonly
                type="text"
                id="address"
                placeholder="العنوان"
                class="formbold-form-input formbold-mb-3 readOnlyInput"
                v-model="adress"
                />
              </div>

              <div class="formbold-mb-3">
                <ValidationProvider name="تاريخ  الشراء" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                  <label for="dob" class="formbold-form-label"> تاريخ الشراء  </label>
                  <input type="date" readonly name="dob" id="dob" class="formbold-form-input readOnlyInput"  v-model="date" />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="formbold-mb-3">
                  <label for="message" class="formbold-form-label">
                  ملاحظات
                  </label>
                  <textarea
                  rows="6"
                  id="message"
                  class="formbold-form-input readOnlyInput"
                  v-model="notes"
                  readonly
                  ></textarea>
              </div>

              <button class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid"  >حفظ و عرض التفاصيل</button>

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
import { required , numeric , min_value  } from 'vee-validate/dist/rules';

// Register rules with custom messages

extend('required', {
...required,
message: '{_field_} مطلوب'

});

extend('numeric', {
...numeric,
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

// components  

// FormImage
import FormImage from "@/shared/components/svgImage/FormImage.vue";

// CircleLoader
import CircleLoader from '@/shared/components/loading/CircleLoader.vue';

//store
import { useProductsStore } from '@/store/products/products.js'
import { useCategoriesStore } from '@/store/categories/categories.js';
import { useBranchesStore } from '@/store/branches/branches.js';
import { usePurchasesStore } from '@/store/purchases/purchase.js';

// sweetalert 
import sweetalert from "sweetalert";

export default {
  name: "AddNewPurchase",
  components: {
    FormImage,
    CircleLoader,
  },
  data() {
      return {
      // for all products added  
        addedPurchase: [],

      // product data  
        selectedProduct:'',
        productId:'',
        quantity: '',
        quantityReturn: '',
        price_sell: 0,
        price_buy: 0,
        //itemName:'',
        productInfo:'',
        
        // rest of order data    
        discount_type: '',
        discount_value: 0,
        status:'0', // حالة الشراء مدفوع 
        date: '',
        notes: '',
        shipping:'',
        adress: '',

        
        

        // selectProductForUpdate
        selectProductForUpdateProp:'',

        // follow edit state
        isEditingProduct: false, 

      
        // Products In selectedBranch
        ProductsInBranch:[],

        // branch data
        selectedBranch:"",
        BranchId:"",

        // loading 
        isLoading: false,


      };
  },
 
  computed: {

    getDarkMode() {
      return this.$store.state.darkMode;
    },
    
    
    ...mapState(useProductsStore, {
      myAllProducts: 'products',
  
  }),
    ...mapState(useCategoriesStore, ['categories']),
    ...mapState(useBranchesStore, ['branches']),
    ...mapState(usePurchasesStore, ['purchases']),

    getStatusText() {
      switch (this.status) {
      case '0':
          return 'مدفوع';
      case '1':
          return 'اجل';
      default:
          return 'غير معروف';
      }
      },
    getStatusTextDiscount() {
      switch (this.discount_type) {
      case 'fixed':
          return 'ثابت';
      case 'percentage':
          return 'نسبة';
      default:
          return 'غير معروف';
      }
      },

  },
  async created() {
    this.fetchCategories();
    this.fetchProducts()
    this.fetchBranches()


    await this.fetchPurchases()
    this.Id = this.$route.params.purchasesId;
    this.fetchPurchaseDetails();
  },
  methods: {
    // ============ my actions => start =============================================

    ...mapActions(useProductsStore, ['fetchProducts','updateProduct']),
    ...mapActions(useCategoriesStore, ['fetchCategories']),
    ...mapActions(useBranchesStore, ['fetchBranches','updateBranch','fetchBranchById']),
    ...mapActions(usePurchasesStore, ['addPurchase','fetchPurchases']),


    // ============ my actions => end ==============================================

// ============ show order data  => start ==============================================
  async fetchPurchaseDetails() {
      const purchase = this.purchases.find(purchase => purchase.id === this.Id);
      if (purchase) {
      this.addedPurchase = purchase.products;
      this.discount_value = purchase.discount_value;
      this.discount_type = purchase.discount_type;
      this.status = purchase.status;
      this.date = purchase.date;
      this.notes = purchase.notes;
      this.shipping = purchase.shipping;
      this.adress = purchase.adress;
      this.BranchId = purchase.BranchId;
      this.selectedBranch = purchase.selectedBranch;
     


    }
    console.log( "نوع الخصم" ,this.discount_type)
  },
    // ============ show order data  => end ==============================================

 
cancelChange(){
      this.clearProductForm()
},
   clearProductForm() {

    this.selectedProduct = '';
    this.productId = '';
    this.quantity = '';
    this.price_buy=''
    this.price_sell=''
    this.productInfo = '';
    this.selectProductForUpdateProp = '';


    this.isEditingProduct = false; 
    this.toggleButtons(false);
  },

  selectProductForUpdate() {
    const selectedUpdatePro = this.addedPurchase.find(product => product.id === this.selectProductForUpdateProp);
    if (selectedUpdatePro) {

      this.selectedProduct = selectedUpdatePro.name;
      this.productId = selectedUpdatePro.id;
      this.price_buy = selectedUpdatePro.price_buy;
      this.price_sell = selectedUpdatePro.price_sell;
      this.quantity = selectedUpdatePro.quantity;

      this.isEditingProduct = true;
      this.toggleButtons(true); 
    }
  },
  updateSingleProduct() {

    const index = this.addedPurchase.findIndex(product => product.id === this.productId);

    if (index !== -1) {
      this.addedPurchase[index].name = this.selectedProduct;
      this.addedPurchase[index].price_buy = this.price_buy;
      this.addedPurchase[index].price_sell = this.price_sell;
      this.addedPurchase[index].quantity = this.quantity;

      console.log(this.addedPurchase)

      this.clearProductForm();
    }
  },
  deleteProduct() {
    const index = this.addedPurchase.findIndex(product => product.id === this.productId);
    if (index !== -1) {
      this.addedPurchase.splice(index, 1);
      this.clearProductForm();
    }
  },
  updateProductId() {


    this.isEditingProduct = false; 
    this.toggleButtons(false);

    const selectedProductObj = this.myAllProducts.find(product => product.name === this.selectedProduct);
    this.productId = selectedProductObj ? selectedProductObj.id : '';
    this.productInfo = selectedProductObj ? selectedProductObj : '';
    this.price_sell = selectedProductObj ? selectedProductObj.priceMaterial : '';
    this.price_buy = selectedProductObj ? selectedProductObj.buyPrice : '';
    console.log(this.productId)
    console.log('our product',selectedProductObj)

  },
  getProductsFromBranch() {
    const getBranch = this.branches.find(branch => branch.nameBranch === this.selectedBranch);

    this.BranchId = getBranch.id

    if(getBranch){
      this.ProductsInBranch = getBranch.products
    }
    console.log("our products",getBranch,getBranch.products)

      
  },


  toggleButtons(isEditing) {
    const addButton = document.querySelector('.addProduct-btn');
    const deleteButton = document.querySelector('.deleteProduct-btn');
    const cancelButton = document.querySelector('.cancelChangeProduct-btn');


    if (isEditing) {
      addButton.classList.add('addProduct-btn_hidde');
      deleteButton.classList.add('deleteProduct-btn_show');
      cancelButton.classList.add('cancelChangeProduct-btn_show');

    } else {
      addButton.classList.remove('addProduct-btn_hidde');
      deleteButton.classList.remove('deleteProduct-btn_show');
      cancelButton.classList.remove('cancelChangeProduct-btn_show');

    }
  },

  

  // ==================== عملية ارسال المشتريات / تسميع للمخزن ====================
  async addProductsToBranches() {
    
    const branchId = this.BranchId; 

    try {

        const branchData = await this.fetchBranchById(branchId);

        for (const product of this.addedPurchase) {
          
          const existingProduct = branchData.products.find(item => item.id === product.id);

            if (existingProduct) {
              const newQuantity = Number(existingProduct.quantity) + Number(product.quantity)
                existingProduct.quantity = newQuantity; // تحديث الكمية

            } else {
                  // "إذا لم يكن موجودًا، أضف المنتج الجديد "حاليا لا
                //branchData.products.push({
                  // id: product.id,
                  // name: product.name,
                  // quantity: product.quantity,
                  // productInfo: product // إضافة معلومات المنتج حسب الحاجة
              // });
            }
        }

        // تحديث الفرع في قاعدة البيانات
        await this.updateBranch({ products: branchData.products,id:branchData.id })
        console.log('Products updated successfully!');
    } catch (error) {
        console.error('Error fetching branch data:', error);
    }
},

  // ============ creat New Purchase => start =====================================

  async creatNewPurchase() {
    this.isLoading = true;
    
    try {
      if (this.addedPurchase.length === 0) {
      sweetalert("لا يمكن إنشاء الطلب بدون منتجات.", "يرجى إضافة منتجات قبل إنشاء الطلب.", "error");
      this.isLoading = false;
      return;
    }



  // ==================== عملية ارسال المشتريات / تسميع للمخزن ====================
  await this.addProductsToBranches()

    const newPurchase = {
      products: this.addedPurchase,
      adress: this.adress,
      date: this.date,
      status: this.status,
      notes: this.notes,
      shipping: this.shipping,
      discount_type:this.discount_type,
      discount_value:this.discount_value,
      selectedBranch:this.selectedBranch,
      BranchId:this.BranchId,
    
    
    };
    console.log('before send');

    const PurchaseId = await this.addPurchase(newPurchase);

    console.log('after send',PurchaseId);
    this.isLoading = false;

  
      sweetalert("تم إنشاء الطلب بنجاح!", "سيتم إعادة توجيهك إلى صفحة التفاصيل.", "success");
      this.$router.push({ name: 'DetailsPurchase', params: { purchasesId: PurchaseId } });
    

  } catch (error) {
    console.error('Error creating order:', error);
    this.isLoading = false;
    sweetalert("خطأ في عملية الشراء ", "يرجى المحاولة مرة أخرى.", "error");
  }
},
  // ============ creat New Purchase => end =======================================
  
}
};
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.addOrder {
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

.updateProduct-btn{
  display: block;
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
