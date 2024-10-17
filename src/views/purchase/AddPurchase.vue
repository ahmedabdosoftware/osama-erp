<template>
    <div class="addOrder">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">create Purchases</p>
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
                        <select
                          id="status"
                          placeholder="حالة الشراء"
                          class="formbold-form-input"
                          v-model="status">
                          <option value="0">مدفوع</option>
                          <option value="1">اجل</option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>   

                    <div>
                        <label for="branch" class="formbold-form-label">   الفروع  </label>
                        <ValidationProvider name="الفروع"   v-slot="{ errors }">
                          <input list="List"  class="formbold-form-input"  placeholder=" ابحث فى الفروع" v-model="selectedBranch" @input="getProductsFromBranch">
                          <datalist id="List">
                            <option v-for="branch in branches" :key="branch.id" :value="branch.nameBranch" ></option>
                          </datalist>
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
                        <label for="quantity" class="formbold-form-label">  الكمية المطلوبة</label>

                        <input
                            type="number"
                            id="quantity"
                            placeholder="الكمية"
                            class="formbold-form-input"
                            v-model="quantity"
                        
                        />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
                  <div>
                      <label for="product" class="formbold-form-label">  اختر المنتج  </label>
                      <ValidationProvider name="المنتج"  :rules="`${addedPurchase.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                        <input list="propList"  class="formbold-form-input"  placeholder=" ابحث فى المنتجات" v-model="selectedProduct" @input="updateProductId">
                        <datalist id="propList">
                          <option v-for="product in ProductsInBranch" :key="product.id" :value="product.name" ></option>
                        </datalist>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
                </div>
                <div class="formbold-input-flex">
                    
                    <div>
                        <ValidationProvider name="سعر الشراء"  :rules="`${addedPurchase.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                          <label for="price_buy" class="formbold-form-label">   سعر الشراء  </label>
  
                          <input
                              type="number"
                              id="price_buy"
                              placeholder="سعر الشراء"
                              class="formbold-form-input"
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
                              type="number"
                              id="price_sell"
                              placeholder="سعر البيع"
                              class="formbold-form-input"
                              v-model="price_sell"
                          
                          />
                          <p  class="info-message">ان قمت بتغير سعر البيع سيتم تحديثه فى السيستم</p>
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </div>

                <div class="formbold-mb-3 cont_add_del_upda">
                  <button @click.prevent="addProduct" :disabled="!selectedProduct || !quantity" class="addProduct-btn">اضافة لسلة المشتريات</button>
                  <button @click.prevent="updateSingleProduct" :disabled="!selectedProduct || !quantity"  class="updateProduct-btn" > تعديل المنتج </button>
                  <button @click.prevent="deleteProduct" class="deleteProduct-btn"> حذف </button>
                  <button @click.prevent="cancelChange" class="cancelChangeProduct-btn"> الغاء </button>

                </div>

                <div class="formbold-input-flex">

                  <div>
                      <label for="discount_value" class="formbold-form-label">  الخصم </label>
                      <input
                          type="number"
                          id="discount_value"
                          placeholder="الخصم "
                          class="formbold-form-input"
                          v-model="discount_value"
                      />
                  </div> 
                  <div>     
                      <ValidationProvider name="نوع الخصم"  v-slot="{ errors }">
                        <label for="discount_type" class="formbold-form-label"> نوع الخصم  </label>
                        <select
                          id="discount_type"
                          placeholder=" نوع الخصم"
                          class="formbold-form-input"
                          v-model="discount_type">
                          <option value="percentage">نسبة</option>
                          <option value="fixed">ثابت</option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>   
                </div>

                <div class="formbold-mb-3">
                  <label for="address" class="formbold-form-label">  عنوان/ اسم المورد </label>
                  <input
                  type="text"
                  id="address"
                  placeholder="العنوان"
                  class="formbold-form-input formbold-mb-3"
                  v-model="adress"
                  />
                </div>

                <div class="formbold-mb-3">
                  <ValidationProvider name="تاريخ  الشراء" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                    <label for="dob" class="formbold-form-label"> تاريخ الشراء  </label>
                    <input type="date" name="dob" id="dob" class="formbold-form-input"  v-model="date" />
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
          price_sell: 0,
          price_buy: 0,
          //itemName:'',
          productInfo:'',
          
          // rest of order data    
          discount_type: 'percentage',
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

      
  
    },
    async created() {
      this.fetchCategories();
      this.fetchProducts()
      this.fetchBranches()
  
    },
    methods: {
      // ============ my actions => start =============================================
  
      ...mapActions(useProductsStore, ['fetchProducts','updateProduct']),
      ...mapActions(useCategoriesStore, ['fetchCategories']),
      ...mapActions(useBranchesStore, ['fetchBranches','updateBranch','fetchBranchById']),
      ...mapActions(usePurchasesStore, ['addPurchase']),

  
      // ============ my actions => end ==============================================

     addProduct() {

    if (!this.isEditingProduct) {

    let newProduct = {
      id: this.productId,
      name: this.selectedProduct,
      price_sell: this.price_sell,
      price_buy: this.price_buy,
      quantity: this.quantity,
      productInfo:this.productInfo,
    };

    this.addedPurchase.push(newProduct);
    console.log(this.addedPurchase)

    this.clearProductForm();
  }
},
   
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
      const updateButton = document.querySelector('.updateProduct-btn');
      const deleteButton = document.querySelector('.deleteProduct-btn');
      const cancelButton = document.querySelector('.cancelChangeProduct-btn');


      if (isEditing) {
        addButton.classList.add('addProduct-btn_hidde');
        updateButton.classList.add('updateProduct-btn_show');
        deleteButton.classList.add('deleteProduct-btn_show');
        cancelButton.classList.add('cancelChangeProduct-btn_show');

      } else {
        addButton.classList.remove('addProduct-btn_hidde');
        updateButton.classList.remove('updateProduct-btn_show');
        deleteButton.classList.remove('deleteProduct-btn_show');
        cancelButton.classList.remove('cancelChangeProduct-btn_show');

      }
    },

    // ==================== عملية  تعديل الاسعار طبقا لعمليه الشراء  ====================
        async changeProductsInSystem() {
          for (const product of this.addedPurchase) {
            const existingProduct = this.myAllProducts.find(p => p.id === product.id);
            
            if (existingProduct) {
              // تحديث السعر في النظام
              const updatedProduct = {
                id:existingProduct.id,
                priceMaterial:Number(product.price_sell) , 
                buyPrice: Number(product.price_buy), 
                
              };
              
              // تحديث المنتج في قاعدة البيانات
              await this.updateProduct(updatedProduct);
            }
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


     
    // ==================== عملية  تعديل الاسعار طبقا لعمليه الشراء  ====================
    await this.changeProductsInSystem()

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
  