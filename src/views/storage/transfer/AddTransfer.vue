<template>
    <div class="addBranch">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">create transfer</p>
        </div>
        <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <FormImage></FormImage>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="creatNewTransferBranch">
                
               
             
              <div class="formbold-input-flex">
                  <div>

                    <ValidationProvider name=" الفرع" rules="required" v-slot="{ errors }">

                    <label for="selectedBranchTo" class="formbold-form-label">   *الفرع *الى</label>
                      <select
                        class="formbold-form-input"
                        v-model="selectedBranchTo"
                        id="selectedBranchTo"
                          placeholder=" اختر من الفروع "
                      >
                        <option v-for="branch in branches" :value="branch.id" :key="branch.id">
                          {{ branch.nameBranch }}
                        </option>
                      </select>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>

                  </div>
                  <div>
                    <ValidationProvider name=" الفرع" rules="required" v-slot="{ errors }">

                    <label for="selectedBranchFrom" class="formbold-form-label">   *الفرع *من</label>
                      <select
                        class="formbold-form-input"
                        v-model="selectedBranchFrom"
                        id="selectedBranchFrom"
                          placeholder=" اختر من الفروع "
                      >
                        <option v-for="branch in branches" :value="branch.id" :key="branch.id">
                          {{ branch.nameBranch }}
                        </option>
                      </select>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>


                  </div>
          

              </div>
              <div class="formbold-input-flex">
                  <div>
                      <label for="addedInBranch" class="formbold-form-label">المنتجات المحوله     </label>
                      <select
                        class="formbold-form-input"
                        v-model="selectProductForUpdateProp"
                        id="addedInBranch"
                        @change="selectProductForUpdate"
                          placeholder="  ابحث فى المنتجات "
                      >
                        <option v-for="product in transferdInBranch" :value="product.id" :key="product.id">
                          {{ product.name }}
                        </option>
                      </select>

                  </div>
                  <div>
                      <label for="addedInBranch" class="formbold-form-label">ابحث فى منتجات الفرع   </label>
                      <select
                        class="formbold-form-input"
                        v-model="selectProductForShowDataProp"
                        id="addedInBranch"
                        @change="selectProductForshowData"
                          placeholder="  ابحث فى المنتجات "
                      >
                        <option v-for="product in branchTransferFrom.products" :value="product.id" :key="product.id">
                          {{ product.name }}
                        </option>
                      </select>

                  </div>
          

              </div>

              <div class="formbold-input-flex">
                    <div>
                      <ValidationProvider name="الكمية"  :rules="`${transferdInBranch.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="quantity" class="formbold-form-label">  (المتاحة) الكمية </label>
      
                        <input
                            type="number"
                            id="quantity"
                            placeholder="الكمية"
                            class="formbold-form-input"
                            v-model="quantity"
                            readonly
                        
                        />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div>  
                      <label for="product" class="formbold-form-label">  المنتج  </label>
                      <ValidationProvider name="المنتج"  :rules="`${transferdInBranch.length == 0 ? 'required' : ''}`"  v-slot="{ errors }">
                        <input list="propList" readonly class="formbold-form-input"  placeholder=" المنتج " v-model="selectedProductName">
                     
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                 
                </div>
              

              <div class="formbold-input-flex">
                <div></div>
                    <div>
                      <ValidationProvider name="الكمية"  :rules="`${transferdInBranch.length == 0 ? 'required|numeric|min_value:1' : ''}`"  v-slot="{ errors }">
                        <label for="quantity" class="formbold-form-label">  (المحوله) الكمية </label>
      
                        <input
                            type="number"
                            id="quantity"
                            placeholder="الكمية"
                            class="formbold-form-input"
                            v-model="transferedQuantity"
                        
                        />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  
                 
                </div>
              

                

                <div class="formbold-mb-3 cont_add_del_upda">
                  <button @click.prevent="addProduct" :disabled="!selectedProductName || !quantity" class="addProduct-btn">اضافة المنتج</button>
                  <button @click.prevent="updateProduct" :disabled="!selectedProductName || !quantity"  class="updateProduct-btn" > تعديل المنتج </button>
                  <button @click.prevent="deleteProduct" class="deleteProduct-btn"> حذف </button>
                </div>
               
                    
                    <div class="formbold-mb-3">
                      <ValidationProvider name="تاريخ بدا العمل" rules="date_format:YYYY-MM-DD" v-slot="{ errors }">
                        <label for="dob" class="formbold-form-label"> التاريخ    </label>
                        <input type="date" name="dob" id="dob" class="formbold-form-input"  v-model="date" />
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    
                    <div>
                      
                      <ValidationProvider name="حالة المخزن" rules="required" v-slot="{ errors }">
                        <label for="status" class="formbold-form-label">الحالة   </label>
                        <select
                          id="status"
                          placeholder="الحالة "
                          class="formbold-form-input"
                          v-model="status">
                          <option value="0">فى الانتظار</option>
                          <option value="1">اثناء النقل</option>
                          <option value="3">منجز</option>
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

                

                <button class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid"  >حفظ  التحويل  </button>

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
  import { useBranchesStore } from '@/store/branches/branches.js';
  import { useBranchTransferStore } from '@/store/branches/transfer.js';

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
          
          transferdInBranch: [],
          
          // product info 
          productId: '',
          quantity: null,
          productInfo:'',
          selectedProductName: '',

          transferedQuantity: 0,
          

          // loading 
          isLoading: false,

          // rest of branch data
          notes: '',
          selectedBranchTo: '',
          selectedBranchFrom: '',
          date: '',
          status: 0,
          
         // data used in handling
         selectProductForUpdateProp: '',
         selectProductForShowDataProp: '',


        };
    },
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
      ...mapState(useBranchesStore, ['branches']),
      branchTransferFrom(){
        const branch = this.branches.find(branch => branch.id === this.selectedBranchFrom);
        if(branch){
          console.log("from",branch)
          return branch
        }
        return ""
      },
      branchTransferTo(){
        const branch = this.branches.find(branch => branch.id === this.selectedBranchTo);
        if(branch){
          console.log("to",branch)
          return branch
        }
        return ""
      }
  
    },
    async created() {
      this.fetchBranches()
  
    },
    methods: {
      // ============ my actions => start =============================================
  
      ...mapActions(useBranchesStore, ['fetchBranches','updateBranch']),
      ...mapActions(useBranchTransferStore, ['addTransfer']),

  
      // ============ my actions => end ==============================================

     


    
      addProduct() {
      if (!this.isEditingProduct) {
        this.transferdInBranch.push({
          id: this.productId,
          name: this.selectedProductName,
          transferedQuantity: this.transferedQuantity,
          quantity : this.quantity
        });
        this.clearProductForm();
      }
     },
     clearProductForm() {
      this.selectedProductName = '';
      this.productId = '';
      this.quantity = '';
      this.transferedQuantity = '';
      this.selectProductForUpdateProp = '';
      this.isEditingProduct = false; 
      this.toggleButtons(false);
    },
    selectProductForshowData() {
      const selectedUpdatePro = this.branchTransferFrom.products.find(product => product.id === this.selectProductForShowDataProp);
      if (selectedUpdatePro) {
        this.selectedProductName = selectedUpdatePro.name;
        this.productId = selectedUpdatePro.id;
        this.quantity = selectedUpdatePro.quantity;
        
      }
    },
    selectProductForUpdate() {
      const selectedUpdatePro = this.transferdInBranch.find(product => product.id === this.selectProductForShowDataProp);
      if (selectedUpdatePro) {
        this.selectedProductName = selectedUpdatePro.name;
        this.quantity = selectedUpdatePro.quantity;
        this.transferedQuantity = selectedUpdatePro.transferedQuantity;
        this.productId = selectedUpdatePro.id;

      }
      this.isEditingProduct = true; 
      this.toggleButtons(true);
    },
    updateProduct() {
      const index = this.transferdInBranch.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.transferdInBranch[index].name = this.selectedProductName;
        this.transferdInBranch[index].transferedQuantity = this.transferedQuantity;
        this.clearProductForm();
      }
    },
    deleteProduct() {
      const index = this.transferdInBranch.findIndex(product => product.id === this.productId);
      if (index !== -1) {
        this.transferdInBranch.splice(index, 1);
        this.clearProductForm();
      }
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

    async creatNewTransferBranch() {
  this.isLoading = true;

  try {
    if (this.transferdInBranch.length === 0 ) {
      sweetalert("لا يمكن تحويل المخزون بدون منتجات", "يرجى إضافة منتجات قبل التحويل .", "error");
      this.isLoading = false;
      return;
    }else if ( this.branchTransferFrom == this.branchTransferTo) {
      sweetalert("لا يمكن التحويل لنفس الفرع", "يرجى تحديد فرعين مختلفين  قبل التحويل .", "error");
      this.isLoading = false;
      return;
    }
    
  // my algorithm in arabic comments
    // 1. تحديث المخزن المحول منه (تنقيص الكمية لكل منتج)
    this.transferdInBranch.forEach(product => {
      const productInBranchFrom = this.branchTransferFrom.products.find(p => p.id === product.id);
      if (productInBranchFrom) {
        productInBranchFrom.quantity -= product.transferedQuantity;
      }
    });

    // 2. تحديث المخزن المحول إليه (إضافة/زيادة الكمية لكل منتج)
    this.transferdInBranch.forEach(product => {
      const productInBranchTo = this.branchTransferTo.products.find(p => p.id === product.id);
      if (productInBranchTo) {
        productInBranchTo.quantity = Number(productInBranchTo.quantity) + Number(product.transferedQuantity);
      } else {
        // إذا كان المنتج غير موجود، أضفه
        this.branchTransferTo.products.push({
          id: product.id,
          name: product.name,
          quantity: product.transferedQuantity
        });
      }
    });
    
    await this.updateBranch(this.branchTransferFrom); 
    await this.updateBranch(this.branchTransferTo);

    const newTransferBranch = {
      date: this.date,
      notes: this.notes,
      status: this.status,
      selectedBranchTo: this.branchTransferTo.nameBranch,
      selectedBranchFrom: this.branchTransferFrom.nameBranch,
      products: this.transferdInBranch,
    };

    console.log('before send');
    await this.addTransfer(newTransferBranch);
    console.log('after send');
    
    this.isLoading = false;
    sweetalert({
      text: "تم تحويل المخزون بنجاح!",
      icon: "success",
    });

  } catch (error) {
    console.error('Error creating branch:', error);
    this.isLoading = false;
    sweetalert("خطأ في تحويل المخزون", "يرجى المحاولة مرة أخرى.", "error");
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
  