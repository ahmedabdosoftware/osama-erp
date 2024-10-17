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
              <form @submit.prevent="createNewReturn">
               
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
                          type="number"
                          id="shipping"
                          placeholder="الشحن "
                          class="formbold-form-input"
                          v-model="shippingReturn"
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
                        <label for="quantityReturn" class="formbold-form-label">  الكمية المرتجعه</label>

                        <input
                            type="number"
                            id="quantityReturn"
                            placeholder="الكمية"
                            class="formbold-form-input"
                            v-model="quantityReturn"
                        
                        />
                        <p  class="info-message"> <span class="bold"> {{ quantity ? quantity:0}}</span>  : الكميه  الاصليه  </p>

                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
                  <div>
                      <label for="product" class="formbold-form-label">   المنتج  </label>
                      <ValidationProvider name="المنتج"  :rules="`${addedPurchase.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                        <input

                         readonly
                         class="formbold-form-input readOnlyInput"  
                         placeholder=" اختر للعرض "
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
                  <button @click.prevent="cancelChange" class="cancelChangeProduct-btn"> الغاء </button>

                </div>
              

                <div class="formbold-mb-3">
                  <ValidationProvider name="تاريخ  المرتجع" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                    <label for="dob" class="formbold-form-label"> تاريخ المرتجع  </label>
                    <input type="date"  name="dob" id="dob" class="formbold-form-input"  v-model="dateReturn" />
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
                    class="formbold-form-input"
                    v-model="notes"

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
  import { useReturnsStore } from '@/store/purchaseReturns/returns';  

  // sweetalert 
  import sweetalert from "sweetalert";

  export default {
    name: "AddNewReturn",
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
          price_sell: 0,
          price_buy: 0,
          productInfo:'',
          
          // rest of order data    
          status:'0', // حالة الشراء مدفوع 
          
          // return puraches data
          dateReturn: '',
          quantityReturn: '',
          shippingReturn: '',
          notes: '',
          
          // puraches
          Id:'',

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
      ...mapState(useReturnsStore, ['returns']),  


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
      ...mapActions(usePurchasesStore, ['fetchPurchases']),
      ...mapActions(useReturnsStore, ['addReturn']),  

  
      // ============ my actions => end ==============================================

  // ============ show Purchase data  => start ==============================================
    async fetchPurchaseDetails() {
        const purchase = this.purchases.find(purchase => purchase.id === this.Id);
        if (purchase) {
        this.addedPurchase = purchase.products;
        this.status = purchase.status;
        this.BranchId = purchase.BranchId;
        this.selectedBranch = purchase.selectedBranch;
        console.log(this.BranchId)
       


      }
    },
      // ============ show Purchase data  => end ==============================================

   
  cancelChange(){
        this.clearProductForm()
  },
     clearProductForm() {

      this.selectedProduct = '';
      this.productId = '';
      this.quantity = '';
      this.quantityReturn = '';
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
        if(selectedUpdatePro.quantityReturn){
            this.quantityReturn = selectedUpdatePro.quantityReturn;
        }

        this.isEditingProduct = true;
        this.toggleButtons(true); 
      }
    },
    updateSingleProduct() {

      const index = this.addedPurchase.findIndex(product => product.id === this.productId);

      if (index !== -1) {
        this.addedPurchase[index].name = this.selectedProduct;
        this.addedPurchase[index].quantityReturn = this.quantityReturn;

        console.log(this.addedPurchase)

        this.clearProductForm();
      }
    },
    


    toggleButtons(isEditing) {
      const cancelButton = document.querySelector('.cancelChangeProduct-btn');


      if (isEditing) {
        cancelButton.classList.add('cancelChangeProduct-btn_show');

      } else {
        cancelButton.classList.remove('cancelChangeProduct-btn_show');

      }
    },

    

    // ============ creat New Return => start =====================================
    async createNewReturn() {
      this.isLoading = true;

      try {
        if (this.addedPurchase.length === 0) {
          sweetalert("لا يمكن إنشاء المرتجع بدون منتجات.", "يرجى إضافة منتجات قبل إنشاء المرتجع.", "error");
          this.isLoading = false;
          return;
        }
        console.log("BranchId",this.BranchId)
        // تجهيز بيانات المرتجع
        const newReturn = {
          products: this.addedPurchase,
          date: this.dateReturn,
          notes: this.notes,
          shipping: this.shippingReturn,
          selectedBranch: this.selectedBranch,
          BranchId: this.BranchId,
          purchaseId: this.Id,
        };
       
          

        console.log('قبل الإرسال',newReturn);

        // إنشاء المرتجع في قاعدة البيانات
        const returnId = await this.addReturn(newReturn.purchaseId, newReturn);

        console.log('بعد الإرسال', returnId);
        this.isLoading = false;

        sweetalert("تم إنشاء المرتجع بنجاح!", "سيتم إعادة توجيهك إلى صفحة التفاصيل.", "success");
        this.$router.push({ name: 'DetailsReturn', params: { returnId } });


      } catch (error) {

        console.error('Error creating return:', error);
        this.isLoading = false;
  
        const errorMessage = error.message || 'حدث خطأ غير متوقع. حاول مرة أخرى.';
        sweetalert("خطأ في عملية المرتجع", errorMessage, "error");
      }
    }
  
    // ============ creat New Return => end =======================================
    
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
  