<template>
    <div class="addOrder">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">create order</p>
        </div>
        <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <FormImage></FormImage>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="creatNewOrder">

                <div class="formbold-input-flex">
              
                    <div>
                      <ValidationProvider name=" الشحن" rules="numeric|min_value:1" v-slot="{ errors }">
                      <label for="shipping" class="formbold-form-label">  الشحن </label>
                      <input
                          type="number"
                          id="shipping"
                          placeholder="الشحن "
                          class="formbold-form-input"
                          v-model="shipping"
                      />
                      <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div>
                        <label for="customer" class="formbold-form-label">اختر العميل</label>
                        <input list="customerList"  class="formbold-form-input"  placeholder="ابحث عن عميل" v-model="selectedCustomer" @input="updateCustomerId">
                        <datalist id="customerList">
                        <option v-for="customer in clientUsers" :key="customer.id" :value="customer.name" ></option>
                        </datalist>
                        <p v-if="unregisteredCustomerMessage" class="warning-message">{{ unregisteredCustomerMessage }}</p>
                    </div>

                </div>
              <div class="formbold-input-flex">

                    <div>     
                      <ValidationProvider name="حالة الطلب" rules="required" v-slot="{ errors }">
                        <label for="status" class="formbold-form-label">حالة الطلب  </label>
                        <select
                          id="status"
                          placeholder="حالة الطلب"
                          class="formbold-form-input"
                          v-model="status">
                          <option value="0">معلق</option>
                          <option value="1">مؤكد</option>
                          <option value="3">منتهى</option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div>
                      <label for="addedOrders" class="formbold-form-label">المنتجات المضافة الآن</label>
                      <select
                        class="formbold-form-input"
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
                      <ValidationProvider name="الكمية"  :rules="`${addedOrders.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="quantity" class="formbold-form-label">  الكمية </label>

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
                      <label for="product" class="formbold-form-label">  المنتج  </label>
                      <ValidationProvider name="المنتج"  :rules="`${addedOrders.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                        <input list="propList"  class="formbold-form-input"  placeholder=" ابحث فى المنتجات" v-model="selectedProduct" @input="updateProductId">
                        <datalist id="propList">
                          <option v-for="product in myAllProducts" :key="product.id" :value="product.name" ></option>
                        </datalist>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
                </div>

                <div class="formbold-input-flex">

                  <div class="display-options">
                      <label v-if="selectedProduct" >
                        سحب من المخزن  
                        <input type="checkbox" v-model="pullFromBranch" />
                      </label>
                  </div>   
                  <div>
                    <label for="priceOffer" class="formbold-form-label">  الخصم </label>
                    <input
                        type="number"
                        id="priceOffer"
                        placeholder="الخصم "
                        class="formbold-form-input"
                        v-model="price_offer"
                    />
                  </div>

                   
                </div>

                <div class="formbold-input-flex" v-if="pullFromBranch">
                    
                    <div>
                        <ValidationProvider name="الكمية المتاحة"   v-slot="{ errors }">
                          <label for="quantityInBranch" class="formbold-form-label">   الكمية المتاحة  </label>
                          <input
                              type="number"
                              id="quantityInBranch"
                              placeholder="الكمية"
                              class="formbold-form-input"
                              v-model="quantityInBranch"
                              readonly
                          />
                          <p v-if="aboutQuantityInBranchMessage" class="warning-message"> {{ aboutQuantityInBranchMessage }} </p>
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div>
                        <label for="branch" class="formbold-form-label">   الفروع المتوفر بها </label>
                        <ValidationProvider name="الفروع"   v-slot="{ errors }">
                          <input list="List"  class="formbold-form-input"  placeholder=" ابحث فى الفروع" v-model="selectedBranch" @input="getProductFromBranch">
                          <datalist id="List">
                            <option v-for="branch in getAllBranchesHasProduct" :key="branch.id" :value="branch.nameBranch" ></option>
                          </datalist>
                          <p v-if="getAllBranchesHasProduct.length == 0" class="warning-message"> غير متوفر فى اى فرع </p>
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                  </div>

                <div class="formbold-mb-3 cont_add_del_upda">
                  <button @click.prevent="addProduct" :disabled="!selectedProduct || !quantity" class="addProduct-btn">اضافة المنتج</button>
                  <button @click.prevent="updateProduct" :disabled="!selectedProduct || !quantity"  class="updateProduct-btn" > تعديل المنتج </button>
                  <button @click.prevent="deleteProduct" class="deleteProduct-btn"> حذف </button>
                  <button @click.prevent="cancelChange" class="cancelChangeProduct-btn"> الغاء </button>

                </div>
                <div class="formbold-input-flex">
                  
                    <div>
                      <ValidationProvider name="رقم بطلب" rules="numeric|min_value:1" v-slot="{ errors }">
                        <label for="numberOfOrders" class="formbold-form-label">  رقم الطلب  </label>
                        <input
                        type="number"
                        id="numberOfOrders"
                        placeholder="رقم الطلب"
                        class="formbold-form-input"
                        v-model="number"
                    
                       />
                        <p  class="info-message"> اتركه فارغا ليتم انشاء رقم الطلب اوتوماتيكلى</p>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div>
                      <label for="discount_valuee" class="formbold-form-label">  الخصم (قيمة ثابته) </label>
                      <input
                          type="number"
                          id="discount_valuee"
                          placeholder="الخصم "
                          class="formbold-form-input"
                          v-model="discount_value"
                      />
                     
                    </div> 


                  
                </div>
                    
                    <div class="formbold-mb-3">
                      <ValidationProvider name="تاريخ بدا العمل" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                        <label for="dob" class="formbold-form-label"> تاريخ بدا العمل  </label>
                        <input type="date" name="dob" id="dob" class="formbold-form-input"  v-model="date" />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    
                    <div class="formbold-mb-3">
                      <label for="address" class="formbold-form-label"> العنوان  </label>
                      <input
                      type="text"
                      id="address"
                      placeholder="العنوان"
                      class="formbold-form-input formbold-mb-3"
                      v-model="adress"
                      />
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

                <div class="formbold-form-file-flex">
                    <label for="upload" class="formbold-form-label">
                    Upload disign
                    </label>
                    <input
                    type="file"
                    id="upload"
                    class="formbold-form-file"
                    @change="handleFileUpload" 
                    />
                </div> 

                <button class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid"  >حفظ و إنشاء الفاتورة</button>
                <button @click.prevent="createAndCustomizeInvoice" class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid">حفظ وتخصيص فاتورة</button>

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
  message: '{_field_} يجب أن يكون رقمًا موجبا ' 
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
  import { useGetUserStore } from '@/store/users/users.js';
  import { useOrdersStore } from '@/store/order/orders.js';
  import { useBranchesStore } from '@/store/branches/branches.js';

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
          price_offer: '',
          quantity: '',
          //itemName:'',
          productInfo:'',

        // rest of order data    
          selectedCustomer:'',
          customerId:null,
          customerInfo:'',

          selectedTechnical:'',
          TechnicalId:null,
          TechnicaInfo:'',
          
          invoiceType: "توريد",
          date: '',
          adress: '',
          notes: '',
          status:'0', // حالة الطلب معلق 
          number:'',
          laborPrice:'',
          shipping:'',
          discount_value:0,

          // selectProductForUpdate
          selectProductForUpdateProp:'',

          // follow edit state
          isEditingProduct: false, 

          // message when there is no users with this name && about quantity in branch 
          unregisteredCustomerMessage: '', 
          unregisteredTechnicalMessage: '', 
          aboutQuantityInBranchMessage: '', 
        
          file: null, // for add picture

          pullFromBranch:false, // for show extra filds

          
          // for pull branch feature
          selectedBranch:"",
          BranchId:"",
          quantityInBranch:"",

          // loading 
          isLoading: false,
          customInvoice: false,


        };
    },
    watch: {

    quantity() {
      this.quantityMessage();
    }
  },
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
      
      getAllBranchesHasProduct() {
       
        return this.branches.filter(branch => {
         
          return branch.products.some(product => product.id === this.productId);
        });
      },

      
      ...mapState(useProductsStore, {
        myAllProducts: 'products',
    
    }),
      ...mapState(useCategoriesStore, ['categories']),
      ...mapState(useGetUserStore, ['technicalUsers','clientUsers']),
      ...mapState(useBranchesStore, ['branches']),

      
  
    },
    async created() {
      this.fetchCategories();
      this.fetchProducts()
      this.fetchUsers()
      this.fetchBranches()
  
    },
    methods: {
      // ============ my actions => start =============================================
  
      ...mapActions(useProductsStore, ['fetchProducts']),
      ...mapActions(useCategoriesStore, ['fetchCategories']),
      ...mapActions(useGetUserStore, ['fetchUsers']),
      ...mapActions(useOrdersStore, ['addOrder','uploadImage','generateOrderNumber']),
      ...mapActions(useBranchesStore, ['fetchBranches','updateBranch']),

  
      // ============ my actions => end ==============================================

      // ============ handel file  => start ==============================================
        handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      // ============ handel file => end ==============================================


      // custom invoice
      createAndCustomizeInvoice() {

       this.customInvoice= true
       this.creatNewOrder()
      },

     addProduct() {

    if (!this.isEditingProduct) {

    let newProduct = {
      id: this.productId,
      name: this.selectedProduct,
      price_offer: this.price_offer,
      quantity: this.quantity,
      productInfo:this.productInfo,
    };

    this.toPUllFromBranch(newProduct)

    this.addedOrders.push(newProduct);
    console.log(this.addedOrders)

    this.clearProductForm();
  }
},
    toPUllFromBranch(newProduct){

      if (this.pullFromBranch && Number(this.quantityInBranch) > 0) {
      let pullQuantityNeeded = Number(this.quantity); 
      let branchQuantity = Number(this.quantityInBranch); 

      let pullStatus = '';
      if (branchQuantity < pullQuantityNeeded) {
        pullStatus = 'less'; // الكمية أقل مما يريد
        newProduct.avilabelQuantityInBranch = branchQuantity
        
      } else {
        pullStatus = 'more'; // الكمية متاحة بالكامل
        newProduct.avilabelQuantityInBranch = ''
      }

      newProduct.branchId = this.BranchId;
      newProduct.selectedBranch = this.selectedBranch;
      newProduct.pullQuantityNeeded = pullQuantityNeeded;
      newProduct.pullStatus = pullStatus;
    }

  },
  cancelChange(){
        this.clearProductForm()
  },
     clearProductForm() {

      this.selectedProduct = '';
      this.productId = '';
      this.quantity = '';
      this.selectProductForUpdateProp = '';

      this.pullFromBranch=false
      this.BranchId=""
      this.selectedBranch=""
      this.quantityInBranch=""

      this.isEditingProduct = false; 
      this.toggleButtons(false);
    },

    selectProductForUpdate() {
      const selectedUpdatePro = this.addedOrders.find(product => product.id === this.selectProductForUpdateProp);
      if (selectedUpdatePro) {

        this.selectedProduct = selectedUpdatePro.name;
        this.productId = selectedUpdatePro.id;
        this.price_offer = selectedUpdatePro.price_offer;
        this.quantity = selectedUpdatePro.quantity;

        if(selectedUpdatePro.branchId){

          this.selectedBranch = selectedUpdatePro.selectedBranch;
          this.getProductFromBranch()
          this.pullFromBranch=true
          console.log("selected",this.BranchId)
        }else{
          this.pullFromBranch=false
          this.BranchId=""
          this.selectedBranch=""
          this.quantityInBranch=""
        }

        this.isEditingProduct = true;
        this.toggleButtons(true); 
      }
    },
    updateProduct() {

      const index = this.addedOrders.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.addedOrders[index].name = this.selectedProduct;
        this.addedOrders[index].price_offer = this.price_offer;
        this.addedOrders[index].quantity = this.quantity;


// update pull from branch (thats mean he alerdy pull) or do pull (mean its first time)
       if (this.pullFromBranch && Number(this.quantityInBranch) > 0) {
          let pullQuantityNeeded = Number(this.quantity); 
          let branchQuantity = Number(this.quantityInBranch); 

          let pullStatus = '';
          if (branchQuantity < pullQuantityNeeded) {
            pullStatus = 'less'; // الكمية أقل مما يريد
            this.addedOrders[index].avilabelQuantityInBranch = branchQuantity
            console.log(this.addedOrders)
          } else {
            pullStatus = 'more'; // الكمية متاحة بالكامل
            this.addedOrders[index].avilabelQuantityInBranch = ''

          }

          this.addedOrders[index].branchId = this.BranchId;
          this.addedOrders[index].selectedBranch = this.selectedBranch;
          this.addedOrders[index].pullQuantityNeeded = pullQuantityNeeded;
          this.addedOrders[index].pullStatus = pullStatus;
        }

// cancel the pull from branch
      if(this.BranchId && this.pullFromBranch== false){

        console.log('from inside the cancel the pull')
        delete this.addedOrders[index].branchId;
        delete this.addedOrders[index].selectedBranch;
        delete this.addedOrders[index].pullQuantityNeeded;
        delete this.addedOrders[index].pullStatus;

        //clear branch info
        this.BranchId=""
        this.selectedBranch=""
        this.quantityInBranch=""

      }

        console.log(this.addedOrders)

        this.clearProductForm();
      }
    },
    deleteProduct() {
      const index = this.addedOrders.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.addedOrders.splice(index, 1);
        this.clearProductForm();
      }
    },
    updateProductId() {

        this.pullFromBranch=false
        this.BranchId=""
        this.selectedBranch=""
        this.quantityInBranch=""

        this.isEditingProduct = false; 
        this.toggleButtons(false);

      const selectedProductObj = this.myAllProducts.find(product => product.name === this.selectedProduct);
      this.productId = selectedProductObj ? selectedProductObj.id : '';
      this.productInfo = selectedProductObj ? selectedProductObj : '';
      console.log(this.productId)

    },
    getProductFromBranch() {
      const getBranch = this.branches.find(branch => branch.nameBranch === this.selectedBranch);
      const product = getBranch.products.find(product => product.id === this.productId);

        if(product){

          this.quantityInBranch= product.quantity

          if(Number(this.quantityInBranch) >0){

            this.BranchId= getBranch.id
            this.quantityMessage()
              
            }else{
              
              this.aboutQuantityInBranchMessage = 'المخزن فارغ لن تتم عمليه السحب'; // الكمية متاحة بالكامل
          }
        }
    },
    quantityMessage() {
        if(this.BranchId){
          console.log("still there branchId",this.BranchId)
          if ( Number(this.quantityInBranch) < Number(this.quantity)) {
                  this.aboutQuantityInBranchMessage = 'سيتم سحب الكمية المتوفرة والباقى يمكنك شراءه'; // الكمية أقل مما يريد
              } else {
                  this.aboutQuantityInBranchMessage = ''; // الكمية متاحة بالكامل
                };
        }
      },
    updateCustomerId() {
      const selectedCustomerObj = this.clientUsers.find(customer => customer.name === this.selectedCustomer);
      if (selectedCustomerObj) {
        this.customerId = selectedCustomerObj.id;
        this.customerInfo = selectedCustomerObj;
        
        this.unregisteredCustomerMessage = ''; 
      } else {
        this.customerId = null;
        this.customerInfo = '';

        this.unregisteredCustomerMessage = 'هذا العميل غير مسجل في النظام. قد تفقد بعض المميزات.';
      }
    },
    updateTechnicalId() {
      const selectedTechnicalObj = this.technicalUsers.find(tech => tech.name === this.selectedTechnical);
      if (selectedTechnicalObj) {
        this.TechnicalId = selectedTechnicalObj.id;
        this.TechnicaInfo = selectedTechnicalObj;
        
        this.unregisteredTechnicalMessage = ''; 
      } else {
        this.TechnicalId = null;
        this.TechnicaInfo = '';

        this.unregisteredTechnicalMessage = 'هذا الفني غير مسجل في النظام. قد تفقد بعض المميزات.';
      }
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

    // ==================== عملية السحب من المخزن ====================
    async pullProductsFromDatabase(){

  for (const product of this.addedOrders) {
      if (product.pullStatus && product.pullQuantityNeeded > 0 && product.branchId) {
        const branchId = product.branchId;
        const pullQuantity = Number(product.pullQuantityNeeded);

        // البحث عن الفرع في البيانات
        const branch = this.branches.find(branch => branch.id === branchId);

        if (!branch) {
          sweetalert("خطأ", "الفرع المحدد غير موجود.", "error");
          continue;
        }

        const branchProduct = branch.products.find(p => p.id === product.id);
        
        if (!branchProduct) {
          sweetalert("خطأ", "المنتج غير موجود في الفرع المحدد.", "error");
          continue;
        }

        if (product.pullStatus === "less") {
          // الكمية أقل من المطلوب -> تفريغ المخزون بالكامل من المنتج
          branchProduct.quantity = 0; // أو القيمة المتاحة بالكامل
        } else if (product.pullStatus === "more") {
          // الكمية المتاحة كافية -> سحب الكمية المطلوبة فقط
          branchProduct.quantity -= pullQuantity;
        }

        // تحديث بيانات الفرع بعد التعديل
        await this.updateBranch(branch);


      // تعيين الخاصية isPulled لتكون true للإشارة إلى أن المنتج قد تم سحبه
      product.isPulled = true;
      console.log('to check isPulled',this.addedOrders)
      }
    }

    },
    // ============ creat New oredr => start =====================================

    async creatNewOrder() {
      this.isLoading = true;
      
      try {
        if (this.addedOrders.length === 0) {
        sweetalert("لا يمكن إنشاء الطلب بدون منتجات.", "يرجى إضافة منتجات قبل إنشاء الطلب.", "error");
        this.isLoading = false;
        return;
      }

      let imageUrl = '';

      if (this.file) {
        imageUrl = await this.uploadImage({ file: this.file });
      }
       if (!this.number) {
        this.number = await this.generateOrderNumber();
      }

    // ==================== عملية السحب من المخزن ====================
    await this.pullProductsFromDatabase()
    console.log("after pullProductsFromDatabase", this.addedOrders)

      const newOrder = {
        products: this.addedOrders,
        customerName: this.selectedCustomer,
        customerId: this.customerId,
        customerInfo: this.customerInfo,
        technicalName: this.selectedTechnical,
        technicalId: this.TechnicalId,
        TechnicaInfo:this.TechnicaInfo,
        invoiceType: this.invoiceType,
        adress: this.adress,
        date: this.date,
        status: this.status,
        notes: this.notes,
        numberOfOrder: this.number,
        laborPrice: this.laborPrice,
        shipping: this.shipping,
        discount_value: this.discount_value,
        imageUrl,
      };
      console.log('before send');
      console.log(this.shipping);

      const orderId = await this.addOrder(newOrder);

      console.log('after send');
      this.isLoading = false;

      if(this.customInvoice){
        sweetalert("تم إنشاء الطلب بنجاح!", "سيتم إعادة توجيهك إلى صفحة تخصيص فاتورة.", "success");
        this.$router.push({ name: 'CustomInvoice', params: { orderId: orderId , isCustom:"true" } });
      }else{
        sweetalert("تم إنشاء الطلب بنجاح!", "سيتم إعادة توجيهك إلى صفحة الفاتورة.", "success");
        this.$router.push({ name: 'Fatora', params: { orderId: orderId , isCustom:"false" } });
      }

    } catch (error) {
      console.error('Error creating order:', error);
      this.isLoading = false;
      sweetalert("خطأ في إنشاء الطلب", "يرجى المحاولة مرة أخرى.", "error");
    }
  },
    // ============ creat New oredr => end =======================================
    
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
  .display-options{
  //background-color: rgb(207, 83, 83);
  display: flex;
  justify-content: flex-end;
  align-items: end;
  padding-bottom: 10px;
}
 .formbold-form-file-flex {
  display: flex;
  align-items: center;
  gap: 20px;
}
.formbold-form-file-flex .formbold-form-label {
  margin-bottom: 0;
}
.formbold-form-file {
  font-size: 14px;
  line-height: 24px;
  color: #536387;
}
.formbold-form-file::-webkit-file-upload-button {
  display: none;
}
.formbold-form-file:before {
  content: 'Upload file';
  display: inline-block;
  background: #EEEEEE;
  border: 0.5px solid #FBFBFB;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 3px 12px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  color: #637381;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin-right: 10px;
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
  