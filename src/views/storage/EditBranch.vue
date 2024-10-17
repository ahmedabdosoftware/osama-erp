<template>
    <div class="addBranch">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">Edit branch</p>
        </div>
        <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <FormImage></FormImage>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="handelUpdatBranch">
                
                <div class="formbold-input-flex">

                    <div>
                      <label for="location" class="formbold-form-label">  مكان المخزن </label>
                      <input
                          type="text"
                          id="location"
                          placeholder="المكان "
                          class="formbold-form-input"
                          v-model="location"
                      />
                    </div>
                    <div>
                      <label for="nameBranch" class="formbold-form-label">  اسم المخزن </label>
                      <input
                          type="text"
                          id="nameBranch"
                          placeholder="اسم المخزن "
                          class="formbold-form-input"
                          v-model="nameBranch"
                      />
                    </div>

                   
                </div>
              <div class="formbold-input-flex">
                  <div></div>
                  <div>
                      <label for="addedInBranch" class="formbold-form-label">المنتجات المضافة الآن</label>
                      <select
                        class="formbold-form-input"
                        v-model="selectProductForUpdateProp"
                        id="addedInBranch"
                        @change="selectProductForUpdate"
                          placeholder=" اختر من المضافة المنتجات "
                      >
                        <option v-for="product in addedInBranch" :value="product.id" :key="product.id">
                          {{ product.name }}
                        </option>
                      </select>

                  </div>
          

              </div>
              <div class="formbold-input-flex">
                    <div>
                      <ValidationProvider name="الكمية"  :rules="`${addedInBranch.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="quantity" class="formbold-form-label">  (افتتاحية) الكمية </label>
      
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
                      <ValidationProvider name="المنتج"  :rules="`${addedInBranch.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                        <input list="propList"  class="formbold-form-input"  placeholder=" ابحث فى المنتجات" v-model="selectedProduct" @input="catchProduct">
                        <datalist id="propList">
                          <option v-for="product in myAllProducts" :key="product.id" :value="product.name" ></option>
                        </datalist>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                 
                </div>
              <div class="formbold-input-flex">
                <div>
                    
                </div>
                <div>
                      <ValidationProvider name="التنبيه"  :rules="`${addedInBranch.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="alert" class="formbold-form-label"> التنبيه</label>
      
                        <input
                            type="number"
                            id="alert"
                            placeholder="التنبيه"
                            class="formbold-form-input"
                            v-model="alert"
                        
                        />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                 
               
                 
                </div>

                

                <div class="formbold-mb-3 cont_add_del_upda">
                  <button @click.prevent="addProduct" :disabled="!selectedProduct || !quantity" class="addProduct-btn">اضافة المنتج</button>
                  <button @click.prevent="updateProduct" :disabled="!selectedProduct || !quantity"  class="updateProduct-btn" > تعديل المنتج </button>
                  <button @click.prevent="deleteProduct" class="deleteProduct-btn"> حذف </button>
                </div>
               
                    
                    <div class="formbold-mb-3">
                      <ValidationProvider name="تاريخ بدا العمل" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                        <label for="dob" class="formbold-form-label"> تاريخ  الانشاء  </label>
                        <input type="date" name="dob" id="dob" class="formbold-form-input"  v-model="date" />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    
                    <div>
                      
                      <ValidationProvider name="حالة المخزن" rules="required" v-slot="{ errors }">
                        <label for="status" class="formbold-form-label">حالة المخزن  </label>
                        <select
                          id="status"
                          placeholder="حالة المخزن"
                          class="formbold-form-input"
                          v-model="status">
                          <option value="0">قديم</option>
                          <option value="1">جديد</option>
                          <option value="3">مؤقت</option>
                        </select>
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

                

                <button class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid"  >حفظ و إنشاء المخزن</button>

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
  import { useBranchesStore } from '@/store/branches/branches.js';

  // sweetalert 
  import sweetalert from "sweetalert";

  export default {
    name: "AddNewBranch",
    components: {
      FormImage,
      CircleLoader,
    },
    data() {
        return {
          addedInBranch: [],

          // product info 
          
          productId: '',
          quantity: 0,
          alert: 0,
          selectedProduct: '',
          
          // loading 
          isLoading: false,

          // rest of branch data
          notes: '',
          nameBranch: '',
          date: '',
          location: '',
          status: "0",
          Id:null,
          
         // data used in handling
          selectProductForUpdateProp: '',


        };
    },
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
      
      ...mapState(useBranchesStore, ['branches']),
      ...mapState(useProductsStore, {
        myAllProducts: 'products',
    
    }),
  
      
  
    },
    async created() {
      this.fetchProducts()
      await this.fetchBranches()
      
      this.Id = this.$route.params.branchId;
      this.fetchBranchDetails();
  
    },
    methods: {
      // ============ my actions => start =============================================
  
      ...mapActions(useProductsStore, ['fetchProducts']),
      ...mapActions(useBranchesStore, ['updateBranch','fetchBranches']),

  
      // ============ my actions => end ==============================================

       // ============ show order data  => start ==============================================
       async fetchBranchDetails() {
        
        const branch = this.branches.find(branch => branch.id === this.Id);
        if (branch) {
        this.addedInBranch = branch.products;
        this.notes = branch.notes;
        this.nameBranch = branch.nameBranch;
        this.date = branch.date;
        this.location = branch.location;
        this.status = branch.status;
       
      }
    },
      // ============ show order data  => end ==============================================



    
      addProduct() {
      if (!this.isEditingProduct) {
        this.addedInBranch.push({
          id: this.productId,
          name: this.selectedProduct,
          alert: this.alert,
          quantity: this.quantity,
        });
        this.clearProductForm();
      }
     },
     clearProductForm() {
      this.selectedProduct = '';
      this.productId = '';
      this.quantity = '';
      this.alert = '';
      this.selectProductForUpdateProp = '';
      this.isEditingProduct = false; 
      this.toggleButtons(false);
    },
    selectProductForUpdate() {
      const selectedUpdatePro = this.addedInBranch.find(product => product.id === this.selectProductForUpdateProp);
      if (selectedUpdatePro) {
        this.selectedProduct = selectedUpdatePro.name;
        this.productId = selectedUpdatePro.id;
        this.quantity = selectedUpdatePro.quantity;
        this.alert = selectedUpdatePro.alert;
        //this.itemName = selectedUpdatePro.nameCategory;
        this.isEditingProduct = true;
        this.toggleButtons(true); 
      }
    },
    updateProduct() {
      const index = this.addedInBranch.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.addedInBranch[index].name = this.selectedProduct;
        this.addedInBranch[index].quantity = this.quantity;
       // this.addedOrders[index].nameCategory = this.itemName;
        this.clearProductForm();
      }
    },
    deleteProduct() {
      const index = this.addedInBranch.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.addedInBranch.splice(index, 1);
        this.clearProductForm();
      }
    },
    catchProduct() {
      const selectedProductObj = this.myAllProducts.find(product => product.name === this.selectedProduct);
      this.productId = selectedProductObj ? selectedProductObj.id : '';

    },
   
    toggleButtons(isEditing) {
      const addButton = document.querySelector('.addProduct-btn');
      const updateButton = document.querySelector('.updateProduct-btn');
      const deleteButton = document.querySelector('.deleteProduct-btn');

      if (isEditing) {
        addButton.classList.add('addProduct-btn_hidde');
        updateButton.classList.add('updateProduct-btn_show');
        deleteButton.classList.add('deleteProduct-btn_show');
      } else {
        addButton.classList.remove('addProduct-btn_hidde');
        updateButton.classList.remove('updateProduct-btn_show');
        deleteButton.classList.remove('deleteProduct-btn_show');
      }
    },
    
    // ============ creat New oredr => start =====================================

    async handelUpdatBranch() {
      this.isLoading = true;
      
      try {
        if (this.addedInBranch.length === 0) {
          sweetalert("لا يمكن إنشاء الفرع بدون منتجات.", "يرجى إضافة منتجات قبل إنشاء الفرع.", "error");
          this.isLoading = false;
          return;
        }
        
        //const totalPrice = this.addedOrders.reduce((total, product) => total + parseFloat(product.price_offer) * parseInt(product.quantity), 0);
        
        
        
        const updateSingleBranch = {
          id:this.Id,
          products: this.addedInBranch,
          notes: this.notes,
          nameBranch: this.nameBranch,
          date: this.date,
          location: this.location,
          status: this.status,
          
        };
        console.log('before send');
        console.log(updateSingleBranch)

       await this.updateBranch(updateSingleBranch);

      console.log('after send');
      this.isLoading = false;
      sweetalert({
            text: "تم إنشاء المخزن بنجاح!",
            icon: "success",
          });
      

    } catch (error) {
      console.error('Error creating branch:', error);
      this.isLoading = false;
      sweetalert("خطأ في إنشاء الفرع", "يرجى المحاولة مرة أخرى.", "error");
    }
  },
    // ============ creat New oredr => end =======================================
    
  }
  };
  </script>
  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  .addBranch {
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

 .formbold-form-file-flex {
  display: flex;
  align-items: center;
  gap: 20px;
}
.formbold-form-file-flex .formbold-form-label {
  margin-bottom: 0;
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
  