<template>
    <div class="editOrder">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">edit order</p>
        </div>
        
        <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <FormImage></FormImage>
             <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="handelUpdateOrder">
                <div class="formbold-input-flex">
                    <div>
                        <label for="customer" class="formbold-form-label aline-end">اختر العميل</label>
                        <input list="customerList"  class="formbold-form-input aline-end"  placeholder="ابحث عن عميل" v-model="selectedCustomer" @input="updateCustomerId">
                        <datalist id="customerList">
                        <option v-for="customer in clientUsers" :key="customer.id" :value="customer.name" ></option>
                        </datalist>
                        <p v-if="unregisteredCustomerMessage" class="warning-message">{{ unregisteredCustomerMessage }}</p>
                      </div>
                    
                    <div>
                        <label for="technical" class="formbold-form-label aline-end"> :اختر الفنى </label>
                        <input list="technicalList"  class="formbold-form-input aline-end"   placeholder="ابحث عن فنى" v-model="selectedTechnical" @input="updateTechnicalId">
                        <datalist id="technicalList">
                        <option v-for="tech in technicalUsers" :key="tech.id" :value="tech.name" > </option>
                        </datalist>
                        <p v-if="unregisteredTechnicalMessage" class="warning-message"> {{ unregisteredTechnicalMessage }} </p>
                    </div>
                </div>

                <div class="formbold-input-flex">

                  <div>
                      <label for="shipping" class="formbold-form-label aline-end">  الشحن </label>
                      <input
                          type="number"
                          id="shipping"
                          placeholder="الشحن "
                          class="formbold-form-input aline-end"
                          v-model="shipping"
                      />
                    </div>
              

                    <div>
                      <ValidationProvider name="نوع الفاتورة" rules="required" v-slot="{ errors }">

                        <label class="formbold-form-label aline-end">نوع الفاتورة</label>
                        <select class="formbold-form-input" name="occupation" id="occupation" v-model="invoiceType">
                        <option value="تركيب">تركيب</option>
                        <option value="توريد"> توريد</option>
                        <option value="تركيب وتوريد">تركيب وتوريد </option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                </div>

                  
              <div class="formbold-input-flex">

                <div>     
                  <ValidationProvider name="حالة الطلب" rules="required" v-slot="{ errors }">
                    <label for="status" class="formbold-form-label aline-end">حالة الطلب  </label>
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
                  <label for="addedOrders" class="formbold-form-label aline-end">المنتجات المضافة الآن</label>
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
                    <label for="quantity" class="formbold-form-label aline-end">  الكمية </label>

                    <input
                        type="number"
                        id="quantity"
                        placeholder="الكمية"
                        class="formbold-form-input aline-end"
                        v-model="quantity"
                    
                    />
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div>
                  <label for="product" class="formbold-form-label aline-end">  المنتج  </label>
                  <ValidationProvider name="المنتج"  :rules="`${addedOrders.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                    <input list="propList"  class="formbold-form-input aline-end"  placeholder=" ابحث فى المنتجات" v-model="selectedProduct" @input="updateProductId">
                    <datalist id="propList">
                      <option v-for="product in myAllProducts" :key="product.id" :value="product.name" ></option>
                    </datalist>
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                </div>

                <div class="formbold-input-flex">

                <div  class="display-options">
                  <label v-if="selectedProduct">
                    سحب من المخزن  
                    <input type="checkbox" v-model="pullFromBranch" />
                  </label>
                </div>   
                <div>
                <label for="priceOffer" class="formbold-form-label aline-end">  الخصم </label>
                <input
                    type="number"
                    id="priceOffer"
                    placeholder="الخصم "
                    class="formbold-form-input aline-end"
                    v-model="price_offer"
                />
                </div>


                </div>
                <div class="formbold-input-flex" v-if="pullFromBranch">
                    
                    <div>
                        <ValidationProvider name="الكمية المتاحة"   v-slot="{ errors }">
                          <label for="quantityInBranch" class="formbold-form-label aline-end">  الكمية المتاحة  </label>
                          <input
                              type="number"
                              id="quantityInBranch"
                              placeholder="الكمية"
                              class="formbold-form-input aline-end"
                              v-model="quantityInBranch"
                              readonly
                          />
                          <p v-if="isEditingProduct" class="info-message"> بالاضافة لكمية السحب السابقة على نفس الفرع </p>
                          <p v-if="aboutQuantityInBranchMessage" class="warning-message"> {{ aboutQuantityInBranchMessage }} </p>
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div>
                        <label for="branch" class="formbold-form-label aline-end">   الفروع المتوفر بها </label>
                        <ValidationProvider name="الفروع"   v-slot="{ errors }">
                          <input list="List"  class="formbold-form-input aline-end"  placeholder=" ابحث فى الفروع" v-model="selectedBranch" @input="getProductFromBranch">
                          <datalist id="List">
                            <option v-for="branch in getAllBranchesHasProduct" :key="branch.id" :value="branch.nameBranch" ></option>
                          </datalist>
                          <p v-if="getAllBranchesHasProduct.length == 0" class="warning-message"> غير متوفر فى اى فرع </p>
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                  </div>
                  <!-- عرض معلومات السحب السابقة -->
                  <p  v-if="pullFromBranch  && hasPreviousPullOperation" class="aline-end m-btn">   :  آخرعملية سحب   </p>
                
                  <div class="formbold-input-flex" v-if="pullFromBranch && hasPreviousPullOperation">
                    
                  <div>
                  <label for="lastPulledQuantity" class="formbold-form-label aline-end">  كمية المسحوب </label>
                  <input
                      type="number"
                      id="lastPulledQuantity"
                      placeholder="كمية المسحوب "
                      class="formbold-form-input readOnlyInput aline-end"
                      v-model="lastPulledQuantity"
                      readonly
                  />
                  </div>
                    
                  <div>
                  <label for="lastPulledBranch" class="formbold-form-label aline-end">   الفرع المسحوب منه </label>
                  <input
                      type="text"
                      id="lastPulledBranch"
                      placeholder=" الفرع المسحوب منه "
                      class="formbold-form-input readOnlyInput aline-end"
                      v-model="lastPulledBranch"
                      readonly
                  />
                  </div>


                </div>


                <div class="formbold-mb-3 cont_add_del_upda">
                  <button  class="addProduct-btn" @click.prevent="addProduct" :disabled="!selectedProduct || !quantity">اضافة المنتج</button>
                  <button  class="updateProduct-btn" @click.prevent="updateProduct" :disabled="!selectedProduct || !quantity"   > تعديل المنتج </button>
                  <button @click.prevent="deleteProduct" class="deleteProduct-btn"> حذف </button>
                  <button @click.prevent="cancelChange" class="cancelChangeProduct-btn"> الغاء </button>
                </div>
                <div class="formbold-input-flex">
                    
                    <div>
                      <ValidationProvider name="رقم بطلب" rules="numeric|min_value:1" v-slot="{ errors }">
                        <label for="numberOfOrders" class="formbold-form-label aline-end">  رقم الطلب  </label>
                        <input
                        type="number"
                        id="numberOfOrders"
                        placeholder="رقم الطلب"
                        class="formbold-form-input aline-end"
                        v-model="number"
                    
                       />
                        <p  class="info-message"> اتركه فارغا ليتم انشاء رقم الطلب اوتوماتيكلى</p>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>


                    <div>
                      <label for="laborPrice" class="formbold-form-label aline-end">حدد المصنعية يدويا  </label>
                      <input
                        type="number"
                        id="laborPrice"
                        placeholder="حدد المصنعية يدويا "
                        class="formbold-form-input aline-end"
                        v-model="laborPrice"
                        
                        />
                        <p  class="info-message"> فى حالة لا يوجد منتج يتم حساب المصنعية من خلاله او اذا كنت تفضل حساب المصنعية يدويا</p>
                        
                      </div>
                    </div>
                    
                    <div class="formbold-mb-3">
                      <ValidationProvider name="تاريخ بدا العمل" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                        <label for="dob" class="formbold-form-label aline-end"> تاريخ بدا العمل  </label>
                        <input type="date" name="dob" id="dob" class="formbold-form-input aline-end"  v-model="date" />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    
                    <div class="formbold-mb-3">
                      <label for="address" class="formbold-form-label aline-end"> مكان التركيب </label>
                      <input
                      type="text"
                      id="address"
                      placeholder="العنوان"
                      class="formbold-form-input formbold-mb-3 aline-end"
                      v-model="adress"
                      />
                    </div>

                <div class="formbold-mb-3">
                    <label for="message" class="formbold-form-label aline-end">
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
         // itemName:'',
          productInfo:'',

        // rest of order data    
          selectedCustomer:'',
          customerId:null,
          customerInfo:'',

          selectedTechnical:'',
          TechnicalId:null,
          TechnicaInfo:'',
          
          invoiceType: "تركيب وتوريد",
          date: '',
          adress: '',
          notes: '',
          status:'0', // حالة الطلب معلق 
          number:'',
          laborPrice:'',
          shipping:'',


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

          // to show current pic if it exists
          currentImageUrl: '',

          Id:null,

          // for pull branch feature
          selectedBranch:"",
          BranchId:"",
          quantityInBranch:"",

          // last pull operation 
          hasPreviousPullOperation: false,
          lastPulledBranch: '',
          lastPulledQuantity: 0,

            // loading 
           isLoading: false,
           customInvoice: false,

        };
    },
    watch: {

    quantity() {
      //this.quantityMessage();
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
      ...mapState(useOrdersStore, ['orders']),
      ...mapState(useBranchesStore, ['branches']),

      
  
    },
    async created() {
      this.fetchCategories();
      this.fetchProducts()
      this.fetchUsers()
      this.fetchBranches()

      await this.fetchOrders()
      this.Id = this.$route.params.orderId;
      this.fetchOrderDetails();
  
    },
    methods: {
      // ============ my actions => start =============================================
  
      ...mapActions(useProductsStore, ['fetchProducts']),
      ...mapActions(useCategoriesStore, ['fetchCategories']),
      ...mapActions(useGetUserStore, ['fetchUsers']),
      ...mapActions(useOrdersStore, ['updateOrder','fetchOrders','uploadImage', 'deleteImageFromStorage','generateOrderNumber']),
      ...mapActions(useBranchesStore, ['fetchBranches','updateBranch']),

  
      // ============ my actions => end ==============================================
     
      // ============ show order data  => start ==============================================
      async fetchOrderDetails() {
        const order = this.orders.find(order => order.id === this.Id);
        if (order) {
        this.addedOrders = order.products;
        this.selectedCustomer = order.customerName;
        this.customerId = order.customerId;
        this.customerInfo = order.customerInfo;
        this.selectedTechnical = order.technicalName;
        this.TechnicalId = order.technicalId;
        this.TechnicaInfo = order.TechnicaInfo;
        this.invoiceType = order.invoiceType;
        this.date = order.date;
        this.adress = order.adress;
        this.notes = order.notes;
        this.status = order.status;
        this.number = order.numberOfOrder;
        this.laborPrice = order.laborPrice;
        this.shipping = order.shipping;
        this.currentImageUrl = order.imageUrl;
      }
    },
      // ============ show order data  => end ==============================================


      // ============ handel file  => start ==============================================
        handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      // ============ handel file => end ==============================================

  
      // custom invoice
      createAndCustomizeInvoice() {
        this.customInvoice= true
        this.handelUpdateOrder()

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
          newProduct.avilabelQuantityInBranch=''

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
        
        //update or cancel for pulled product => show last pull as info
        if((selectedUpdatePro.branchId && selectedUpdatePro.isPulled)||selectedUpdatePro.ancientBranchId){
          
          this.showLastPullOpertion(selectedUpdatePro)
          console.log("run show last pull")
        }else{
        this.hasPreviousPullOperation=false
       }

        this.isEditingProduct = true;
        this.toggleButtons(true); 
      }
    },
    showLastPullOpertion(selectedProduct) {
        let lastPulledBranch = '';
        let lastPulledQuantity = 0;

        // إذا كان ancientBranchId موجودًا، فهذا يعني أن هناك عملية سحب قديمة
        if (selectedProduct.ancientBranchId) {
          // استخدام ancientBranchId والفرع القديم
          lastPulledBranch = this.getBranchNameById(selectedProduct.ancientBranchId);
          lastPulledQuantity = selectedProduct.ancientQuantityNeeded;

        } else {
          lastPulledBranch = this.getBranchNameById(selectedProduct.branchId);

          // في حالة pullStatus هو "less"، استخدم availableQuantityInBranch
          if (selectedProduct.pullStatus === 'less') {
            lastPulledQuantity = selectedProduct.avilabelQuantityInBranch;
          } else {
            // في حالة pullStatus هو "more"، استخدم pullQuantityNeeded
            lastPulledQuantity = selectedProduct.pullQuantityNeeded;
          }
        }

        this.lastPulledBranch = lastPulledBranch;
        this.lastPulledQuantity = lastPulledQuantity;
        this.hasPreviousPullOperation = true; 
        // عرض الفرع والكمية المسحوبة في وحدة التحكم (أو في واجهة المستخدم حسب الحاجة)
        console.log(`Last Pulled Branch: ${lastPulledBranch}, Last Pulled Quantity: ${lastPulledQuantity}`);

      },

      // دالة لاسترجاع اسم الفرع بناءً على معرف الفرع
      getBranchNameById(branchId) {
        const branch = this.branches.find(branch => branch.id === branchId);
        return branch ? branch.nameBranch : 'Unknown Branch';
      }
      ,
    updateProduct() {

      console.log("enter the fun : update pro")

//    basic info 
      const index = this.addedOrders.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.addedOrders[index].name = this.selectedProduct;
        this.addedOrders[index].price_offer = this.price_offer;
        this.addedOrders[index].quantity = this.quantity;


// case 1
 //   "تحقق مما إذا كان المنتج قد تم سحبه مسبقًا
 //   "  منتج قديم وهتعدل على السحب مش لسه هتضيف

 if (this.pullFromBranch && this.addedOrders[index].isPulled) {

   console.log("enter old product need change pull")
    //     حفظ البيانات القديمة للسحب
        // maybe there already  "if u was about to update them then u diceded to change the update to another update "     
        if(this.addedOrders[index].ancientBranchId && this.addedOrders[index].ancientQuantityNeeded){
          console.log("do nothing u already catched them before")
        }else{
          // حفظ البيانات القديمة للسحب
          var ancientBranchId = this.addedOrders[index].branchId;
          var ancientQuantityNeeded = this.addedOrders[index].pullQuantityNeeded;

          if (this.addedOrders[index].pullStatus === "less"){
              ancientQuantityNeeded = Number(this.addedOrders[index].avilabelQuantityInBranch);
          }
          this.addedOrders[index].ancientBranchId = ancientBranchId;
          this.addedOrders[index].ancientQuantityNeeded = ancientQuantityNeeded;
        }

      // تحديث البيانات الجديدة للسحب
      let pullQuantityNeeded = Number(this.quantity); 
      let branchQuantity = Number(this.quantityInBranch);

      console.log("check BranchId",this.BranchId)
      
      if(this.BranchId){
        
        // إذا كان الفرع القديم هو نفس الفرع الجديد، أضف الكمية المعادة للمخزون
        if (this.addedOrders[index].ancientBranchId === this.BranchId) {
                branchQuantity += Number(this.addedOrders[index].ancientQuantityNeeded);
            }else {
            // إذا كان الفرع الجديد مختلفًا، تأكد من أن الكمية أكبر من الصفر
            if (branchQuantity <= 0) {
              console.log("Error: لا يمكن السحب من الفرع الجديد لأن الكمية المتاحة أقل من أو تساوي الصفر");
              sweetalert({
                text: " لا يمكن السحب من الفرع الجديد لأن الكمية المتاحة أقل من أو تساوي الصفر",
                icon: "error",
              });
              return;  
            }
          }
        }else{
          console.log("Error: اختر فرع اولا");
          sweetalert({
          text: " اختر فرع اولا",
          icon: "error",
        });
          return;  

      }

      let pullStatus = '';
      if (branchQuantity < pullQuantityNeeded) {
        pullStatus = 'less'; // الكمية أقل مما يريد
        this.addedOrders[index].avilabelQuantityInBranch = branchQuantity
      } else {
        pullStatus = 'more'; // الكمية متاحة بالكامل
        this.addedOrders[index].avilabelQuantityInBranch=''
      }

    
      this.addedOrders[index].branchId = this.BranchId;
      this.addedOrders[index].selectedBranch = this.selectedBranch;
      this.addedOrders[index].pullQuantityNeeded = pullQuantityNeeded;
      this.addedOrders[index].pullStatus = pullStatus;

      console.log(`Old branchId: ${ancientBranchId}, Old pullQuantityNeeded: ${ancientQuantityNeeded}`);
    }



// case 2
    //  إذا كان هذا السحب  لمنتج لسه مضاف من صفحة تعديل الطلب(isPulled = false) وتحقق شرط السحب
         // update pull from branch (thats mean he alerdy pull) or do pull (mean its first time)
      
 if (this.pullFromBranch && Number(this.quantityInBranch) > 0 && !('isPulled' in this.addedOrders[index]) ) {
      let pullQuantityNeeded = Number(this.quantity); 
      let branchQuantity = Number(this.quantityInBranch); 

      let pullStatus = '';
      if (branchQuantity < pullQuantityNeeded) {
        pullStatus = 'less'; // الكمية أقل مما يريد
        this.addedOrders[index].avilabelQuantityInBranch = branchQuantity
      } else {
        pullStatus = 'more'; // الكمية متاحة بالكامل
        this.addedOrders[index].avilabelQuantityInBranch=''

      }
      
      this.addedOrders[index].branchId = this.BranchId;
      this.addedOrders[index].selectedBranch = this.selectedBranch;
      this.addedOrders[index].pullQuantityNeeded = pullQuantityNeeded;
      this.addedOrders[index].pullStatus = pullStatus;
    }






// case 3
      // cancel the pull from branch
      if(this.BranchId && this.pullFromBranch== false && !('isPulled' in this.addedOrders[index])){
        
        console.log('from inside the cancel the pull')
        delete this.addedOrders[index].branchId;
        delete this.addedOrders[index].selectedBranch;
        delete this.addedOrders[index].pullQuantityNeeded;
        delete this.addedOrders[index].pullStatus;
        delete this.addedOrders[index].avilabelQuantityInBranch;

        //clear branch info
        this.BranchId=""
        this.selectedBranch=""
        this.quantityInBranch=""

      }



      // cancel the pull from branch
     console.log("before cancel", this.BranchId , this.pullFromBranch,this.addedOrders[index].isPulled)
     console.log("before cancel BranchId", this.BranchId )
     console.log("before cancel our product is ", this.addedOrders[index] )

 // case 4
      if(this.pullFromBranch== false && this.addedOrders[index].isPulled){
        
        console.log('from inside the cancel the pull')
      
        //     حفظ البيانات القديمة للسحب
        // maybe there already there "if u was about to update them then u diceded to cancel"     
        if(this.addedOrders[index].ancientBranchId && this.addedOrders[index].ancientQuantityNeeded){
          console.log("do nothing")
        }else{
          const ancientBranchId = this.addedOrders[index].branchId;
          var ancientQuantityNeededd = this.addedOrders[index].pullQuantityNeeded;

          if (this.addedOrders[index].pullStatus === "less"){
            ancientQuantityNeededd = Number(this.addedOrders[index].avilabelQuantityInBranch);
          }

          this.addedOrders[index].ancientBranchId = ancientBranchId;
          this.addedOrders[index].ancientQuantityNeeded = ancientQuantityNeededd;

        }
        
        delete this.addedOrders[index].branchId;
        delete this.addedOrders[index].selectedBranch;
        delete this.addedOrders[index].pullQuantityNeeded;
        delete this.addedOrders[index].pullStatus;
        delete this.addedOrders[index].avilabelQuantityInBranch;

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
      // Case 1: منتج بدون سحب
      if (!this.addedOrders[index].branchId && !this.addedOrders[index].ancientBranchId) {
        console.log("Product without pull operation, simply delete");
        this.addedOrders.splice(index, 1);
        this.clearProductForm();
        return;
      }
    
    // Case 2: منتج عليه سحب ولكنه أضيف الآن
    if (!this.addedOrders[index].isPulled && this.addedOrders[index].branchId) {
      console.log("Product has a pull operation but just added, simply delete");
      this.addedOrders.splice(index, 1);
      this.clearProductForm();
      return;
    }
    
    // Case 3: منتج عليه سحب وتم السحب بالفعل من قبل
    if (this.addedOrders[index].isPulled) {
      console.log("Product has a pull operation from before, adjusting quantities");

      // تحقق مما إذا كانت البيانات القديمة موجودة بالفعل
      if (!this.addedOrders[index].ancientBranchId || !this.addedOrders[index].ancientQuantityNeeded) {
        const ancientBranchId = this.addedOrders[index].branchId;
        var ancientQuantityNeeded = this.addedOrders[index].pullQuantityNeeded;

        if (this.addedOrders[index].pullStatus === "less") {
          ancientQuantityNeeded = Number(this.addedOrders[index].avilabelQuantityInBranch);
        }

        this.addedOrders[index].ancientBranchId = ancientBranchId;
        this.addedOrders[index].ancientQuantityNeeded = ancientQuantityNeeded;
      }
      
      this.addedOrders[index].isDeleted = true;
      // حذف معلومات السحب الحالية
      delete this.addedOrders[index].branchId;
      delete this.addedOrders[index].selectedBranch;
      delete this.addedOrders[index].pullQuantityNeeded;
      delete this.addedOrders[index].pullStatus;
      delete this.addedOrders[index].avilabelQuantityInBranch;

      // مسح معلومات الفرع الحالية
      this.BranchId = "";
      this.selectedBranch = "";
      this.quantityInBranch = "";

      this.clearProductForm();
      return;
    }

    // حذف المنتج في الحالات الأخرى (احتياطي)
    //this.addedOrders.splice(index, 1);
    //this.clearProductForm();
  }
},

    updateProductId() {

        this.pullFromBranch=false
        this.hasPreviousPullOperation=false
        this.BranchId=""
        this.selectedBranch=""
        this.quantityInBranch=""

        this.isEditingProduct = false; 
        this.toggleButtons(false);

      const selectedProductObj = this.myAllProducts.find(product => product.name === this.selectedProduct);
      this.productId = selectedProductObj ? selectedProductObj.id : '';
      this.productInfo = selectedProductObj ? selectedProductObj : '';

    },
    getProductFromBranch() {
      const getBranch = this.branches.find(branch => branch.nameBranch === this.selectedBranch);
      let product;
      if(getBranch){
       this.BranchId= getBranch.id
       product = getBranch.products.find(product => product.id === this.productId);
      }

        if(product){
          console.log("get quantity from product")
          this.quantityInBranch= product.quantity

          if(Number(this.quantityInBranch) >0){

            //this.quantityMessage()
              
            }else{
              
             // this.aboutQuantityInBranchMessage = 'المخزن فارغ لن تتم عمليه السحب'; // الكمية متاحة بالكامل
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
  async pullProductsFromDatabase() {
    
    console.log("just enter pull fun", this.addedOrders)
    for (const product of this.addedOrders) {
     
     // case 1

      // whene cancel or delete
      if (!product.branchId  && product.ancientBranchId){

      const ancientBranchId = product.ancientBranchId;
      const ancientQuantityNeeded = Number(product.ancientQuantityNeeded);

      // البحث عن الفرع القديم واسترجاع الكمية
        const oldBranch = this.branches.find(branch => branch.id === ancientBranchId);
      if (oldBranch) {
        const oldBranchProduct = oldBranch.products.find(p => p.id === product.id);
        if (oldBranchProduct) {
          // إرجاع الكمية إلى الفرع القديم
          console.log("before back stock",oldBranchProduct.quantity)
          oldBranchProduct.quantity += ancientQuantityNeeded;
          console.log("after back stock",oldBranchProduct.quantity)
          await this.updateBranch(oldBranch);
        }
      }

       // مسح خصائص `anchint`
       delete product.ancientBranchId;
       delete product.ancientQuantityNeeded;
       delete product.isPulled;

    // حذف المنتج من المصفوفة
       if (product.isDeleted) {
        console.log("Product marked for deletion, removing it after restoring quantity.");
        const index = this.addedOrders.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.addedOrders.splice(index, 1);  
        }
      } else {
        console.log("Product not marked for deletion, keeping it in the list.");
      }


      }

     // case 2

    //  : إذا لم يكن هناك `branchId` 'ancientBranchId، قم بتخطي المنتج.
    if (!product.branchId && !product.ancientBranchId) {
      console.log("skip case")
      continue;
    }
    
    console.log("print info", product.branchId, product.ancientBranchId)
  
     // case 3

    // حالة المنتج الذي تم تغييره: لديه `ancientBranchId`
    if (product.branchId && product.ancientBranchId) {
      console.log("just enter our case")

      const ancientBranchId = product.ancientBranchId;
      const branchId = product.branchId;
      const ancientQuantityNeeded = Number(product.ancientQuantityNeeded);
      const newPullQuantity = Number(product.pullQuantityNeeded);

      // البحث عن الفرع القديم واسترجاع الكمية
      const oldBranch = this.branches.find(branch => branch.id === ancientBranchId);
      if (oldBranch) {
        const oldBranchProduct = oldBranch.products.find(p => p.id === product.id);
        if (oldBranchProduct) {
          // إرجاع الكمية إلى الفرع القديم
          console.log("before back stock",oldBranchProduct.quantity)
          oldBranchProduct.quantity += Number(ancientQuantityNeeded);
          console.log("after back stock",oldBranchProduct.quantity)
          await this.updateBranch(oldBranch);
        }
      }

      // البحث عن الفرع الجديد وسحب الكمية
      const newBranch = this.branches.find(branch => branch.id === branchId);
      if (!newBranch) {
        sweetalert("خطأ", "الفرع المحدد غير موجود.", "error");
        continue;
      }

      const newBranchProduct = newBranch.products.find(p => p.id === product.id);
      if (!newBranchProduct) {
        sweetalert("خطأ", "المنتج غير موجود في الفرع المحدد.", "error");
        continue;
      }

      if (product.pullStatus === "less") {
        // الكمية أقل من المطلوب -> تفريغ المخزون بالكامل من المنتج
        newBranchProduct.quantity = 0;
      } else if (product.pullStatus === "more") {
        // الكمية المتاحة كافية -> سحب الكمية المطلوبة فقط
        newBranchProduct.quantity -= newPullQuantity;
      }
      console.log("before update Branch with new data ")

      // تحديث بيانات الفرع الجديد
      await this.updateBranch(newBranch);

      // مسح خصائص `anchint`
      delete product.ancientBranchId;
      delete product.ancientQuantityNeeded;
    }

    // case 4

    //  : يوجد `branchId` ولكن لا يوجد `anchintBranchId`
    else if (product.branchId && !product.ancientBranchId) {
      // إذا لم يكن `isPulled` موجودًا أو `false` (السحب لأول مرة في تعديل الطلب)
      if (!product.isPulled) {
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

        // سحب الكمية المطلوبة
        if (product.pullStatus === "less") {
          branchProduct.quantity = 0; // الكمية أقل -> تفريغ المخزون بالكامل
        } else if (product.pullStatus === "more") {
          branchProduct.quantity -= pullQuantity; // الكمية المتاحة كافية
        }

        // تحديث بيانات الفرع
        await this.updateBranch(branch);

        // تعيين الخاصية `isPulled` لتجنب السحب مرة أخرى
        product.isPulled = true;
      }
    }

    console.log('تم تحديث عملية السحب:', this.addedOrders);
  }
},

    // ============ update the oredr => start =====================================

    async handelUpdateOrder() {
        
      this.isLoading = true;

    try {
      if (this.addedOrders.length === 0) {
        sweetalert("لا يمكن إنشاء الطلب بدون منتجات.", "يرجى إضافة منتجات قبل إنشاء الطلب.", "error");
        this.isLoading = false;
        return;
      }

      //const totalPrice = this.addedOrders.reduce((total, product) => total + parseFloat(product.price_offer) * parseInt(product.quantity), 0);

      let imageUrl = '';

     
      if (this.file) {
          if (this.currentImageUrl) {
            await this.deleteImageFromStorage(this.currentImageUrl);
          }
          imageUrl = await this.uploadImage({ file: this.file });
        }

        if (!this.number) {
        this.number = await this.generateOrderNumber();
      }
      
    // ==================== عملية السحب من المخزن ====================
      await this.pullProductsFromDatabase()

      const updatedOrderData  = {
        id: this.Id,
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
        laborPrice: this.laborPrice,
        notes: this.notes,
        numberOfOrder: this.number,
        shipping: this.shipping,
        imageUrl,
      };
      console.log('before send');

      await this.updateOrder(updatedOrderData );

      console.log('after send');
      this.isLoading = false;

      if(this.customInvoice){
        sweetalert("تم تعديل الطلب بنجاح!", "سيتم إعادة توجيهك إلى صفحة تخصيص فاتورة.", "success");
        this.$router.push({ name: 'CustomInvoice', params: { orderId: this.Id , isCustom:"true" } });
      }else{
        sweetalert("تم تعديل الطلب بنجاح!", "سيتم إعادة توجيهك إلى صفحة الفاتورة.", "success");
        this.$router.push({ name: 'Fatora', params: { orderId: this.Id , isCustom:"false"} });
      }

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
  .editOrder {
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
  
  </style>
  