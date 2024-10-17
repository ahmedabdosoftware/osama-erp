<template>
    <div class="addFinancial">
        <div class="title">
            <p :class="{ 'dark-mode-title': getDarkMode }">create financial</p>
        </div>
        <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <FormImage></FormImage>                
              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="createTransaction">
                <div class="formbold-input-flex">
                  <div>
                    <label for="order" class="formbold-form-label">ربط بطلب</label>
                    <ValidationProvider name="ربط بطلب" rules="numeric|min_value:1" v-slot="{ errors }">
                      <input list="orderList" class="formbold-form-input" placeholder="ابحث عن طلب" v-model="selectedOrder" @input="updateOrderId">
                      <datalist id="orderList">
                        <option v-for="order in getUserOrders" :key="order.id" :value="order.numberOfOrder"></option>
                      </datalist>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                    
                  <div>
                    <ValidationProvider name="القيمة المستحقة" rules="numeric|min_value:1" v-slot="{ errors }">
                    <label for="amount" class="formbold-form-label">القيمة المستحقة</label>
                    <input type="number" class="formbold-form-input" placeholder="ادخل القيمة" v-model="amount">
                    <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                </div>

                <div class="formbold-input-flex">
                    <div>
                      <label for="addedPayments" class="formbold-form-label">المبالغ المضافة الآن</label>
                      <select class="formbold-form-input" v-model="selectedPaymentId" id="addedPayments" @change="selectPaymentForUpdate" placeholder="اختر من الدفعات المضافة">
                        <option v-for="payment in payments" :value="payment.id" :key="payment.id">
                          {{ payment.amount }} 
                        </option>
                      </select>
                    </div>

                    <div>
                      <label for="status" class="formbold-form-label">حالة المعاملة</label>
                      <ValidationProvider name="حالة المعاملة" rules="required" v-slot="{ errors }">
                        <select class="formbold-form-input" v-model="status">
                          <option value="مفتوح">مفتوح</option>
                          <option value="منتهي">منتهي</option>
                        </select>
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                </div>

                <div class="formbold-input-flex">
                    <div>
                      <label for="currentAmount" class="formbold-form-label">المبلغ</label>
                      <ValidationProvider name="المبلغ"   v-slot="{ errors }">
                        <input type="number" class="formbold-form-input" placeholder="ادخل القيمة" id="currentAmount" v-model="currentAmount">
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div>
                      <label for="currentTransactionDate" class="formbold-form-label">تاريخ استلام الدفعة</label>
                      <ValidationProvider name="تاريخ استلام الدفعة"  v-slot="{ errors }">
                        <input type="date" class="formbold-form-input" id="currentTransactionDate" v-model="currentTransactionDate">
                        <span class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                </div>


                <div class="formbold-mb-3 cont_add_del_upda">
                <button type="button"  class="addProduct-btn" @click="addPayment">إضافة الدفعة</button>
                <button type="button" class="updateProduct-btn" @click="updatePayment">تحديث الدفعة</button>
                <button class="deleteProduct-btn" type="button" @click="deletePayment">حذف الدفعة</button>

                </div>

                <div class="formbold-mb-3">
                  <label for="dob" class="formbold-form-label"><span>(فى حالة عدم ربطه بطلب )</span> حدد تاريخ للمعاملة</label>
                  <ValidationProvider name="تاريخ للمعاملة"    :rules="`${!selectedOrder ? 'required|date_format:YYYY-MM-DD' : ''}`"  v-slot="{ errors }">
                    <input type="date" name="dob" id="dob" class="formbold-form-input" v-model="date">
                    <span class="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="formbold-mb-3">
                  <label for="address" class="formbold-form-label"><span>(فى حالة عدم ربطه بطلب)</span> حدد مكان للمعاملة</label>
                  <ValidationProvider name="حدد مكان للمعاملة" :rules="`${!selectedOrder ? 'required' : ''}`"  v-slot="{ errors }">
                    <input type="text" id="address" placeholder="العنوان" class="formbold-form-input formbold-mb-3" v-model="adress">
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


                <button  class="formbold-btn" :class="{ 'disabled-btn': invalid }" :disabled="invalid">حفظ والاطلاع على التفاصيل</button>
                   
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
  import { required , numeric , min_value , required_if } from 'vee-validate/dist/rules';

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

  extend('required_if', {
  ...required_if,
  message: 'هذا الحقل مطلوب او حدد طلب  للاستخارج  منه.',
  });

  extend('date_format', {
  validate(value) {
    const regex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
    return regex.test(value);
  },
  params: ['format'],
  message: '{_field_} يجب أن يكون بالتنسيق الصحيح {format}'
  });


// FormImage
import FormImage from "@/shared/components/svgImage/FormImage.vue";
// CircleLoader
import CircleLoader from '@/shared/components/loading/CircleLoader.vue';

import { mapActions, mapState } from 'pinia';

// store
import { useTransactionsStore } from '@/store/transactions/transactions.js';
import { useOrdersStore } from '@/store/order/orders.js';
import { useGetUserStore } from '@/store/users/users.js';

// to make id for payment : use in (1) for-loop to show them (2) select to update
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
      FormImage,
      CircleLoader,
    },
  data() {
    return {
      // get info from order if chossed
      selectedOrder: '',
      
      // info for transaction
      adress: '',
      date: '',
      orderId: null,
      numberOfOrder: null,

      amount: null,
      status: 'مفتوح',
      notes: '',

      // for add transaction
      payments: [],
      currentAmount: '',
      currentTransactionDate: '',

      // need for handeling
      isEditing: false,
      selectedPaymentId: null,
      unregisteredOrderMessage: '',
      userInfo: null,
      // loading 
      isLoading: false
    };
  },
  computed: {
    ...mapState(useOrdersStore, ['orders']),
     getDarkMode() {
      return this.$store.state.darkMode;
    },
    getUserOrders() {
          let filteredOrders = this.orders.filter(order => order.status !== '0');
          if (this.$route.params.profileId ) {
              filteredOrders = filteredOrders.filter(order => 
              order.customerId ===this.$route.params.profileId || order.technicalId === this.$route.params.profileId
            );
          } 
     return filteredOrders;

    } 
  },
  created() {      
    this.fetchOrders();

    const userId = this.$route.params.profileId;
    this.userInfo = this.fetchSingleUser(userId);
    console.log('Fetched user info:', this.userInfo); 
    

  },
  methods: {
    ...mapActions(useOrdersStore, ['fetchOrders','updateOrder']),
    ...mapActions(useTransactionsStore, ['addTransaction']),
    ...mapActions(useGetUserStore, ['fetchSingleUser']),


    updateOrderId() {
      const selectedOrderObj = this.orders.find(order => order.numberOfOrder == this.selectedOrder);
      if (selectedOrderObj) {
        this.orderId = selectedOrderObj.id;
        this.adress = selectedOrderObj.adress;
        this.date = selectedOrderObj.date;
        this.numberOfOrder = selectedOrderObj.numberOfOrder;
        this.unregisteredOrderMessage = '';
      } else {
        this.orderId = null;
        this.unregisteredOrderMessage = 'هذا الطلب غير مسجل في النظام.';
      }
    },

    addPayment() {
      console.log("before payment",this.currentAmount , this.currentTransactionDate)
      console.log(" all payment",this.payments )
      if (this.currentAmount && this.currentTransactionDate) {
        this.payments.push({
          id: uuidv4(),
          amount: this.currentAmount,
          transactionDate: this.currentTransactionDate,
        });
        this.clearPaymentForm();
        console.log("added payment")
      }
      console.log("after payment",this.currentAmount , this.currentTransactionDate)
      console.log(" all payment",this.payments )
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

    selectPaymentForUpdate() {
      const selectedPayment = this.payments.find(payment => payment.id === this.selectedPaymentId);
      if (selectedPayment) {
        this.currentAmount = selectedPayment.amount;
        this.currentTransactionDate = selectedPayment.transactionDate;
        this.isEditing = true;
        this.toggleButtons(true); 
      }
    },

    updatePayment() {
      const index = this.payments.findIndex(payment => payment.id === this.selectedPaymentId);
      if (index !== -1) {
        this.payments[index].amount = this.currentAmount;
        this.payments[index].transactionDate = this.currentTransactionDate;
        this.clearPaymentForm();
        
      }
    },

    deletePayment() {
      const index = this.payments.findIndex(payment => payment.id === this.selectedPaymentId);
      if (index !== -1) {
        this.payments.splice(index, 1);
        this.clearPaymentForm();
      }
    },

    clearPaymentForm() {
      this.currentAmount = '';
      this.currentTransactionDate = '';
      this.selectedPaymentId = null;
      this.isEditing = false;
      this.toggleButtons(false);
    },

    async createTransaction() {
      
        const userId = this.$route.params.profileId;
        this.userInfo = await this.fetchSingleUser(userId);

      if (!this.userInfo || !this.userInfo.id) {
        console.error('Error: userInfo غير متوفر أو لا يحتوي على حقل id');
        return;
      }


      try {
        this.isLoading = true;

      const transactionId = uuidv4(); 
      const newTransaction = {
      id: transactionId, //  add transactionId "will use to bind with order" u can make firebase make it 
      orderId: this.orderId,
      numberOfOrder: this.numberOfOrder,
      status: this.status,
      adress: this.adress,
      date: this.date,
      amount: this.amount,
      notes: this.notes,
      payments: this.payments,
      userId: this.userInfo.id, // bind with user
      transactionType: this.userInfo.role === 'technical' ? 'فنى' : 'عميل',
    };
    
    console.log('New transaction before saving:', newTransaction);

       await this.addTransaction(newTransaction);

        console.log('after creating transaction:');
        
        
        console.log('before updating order:');
        
        if (this.orderId) {
        const updatePayload = {
        id: this.orderId,
        ...(this.userInfo.role === 'technical'
          ? { financialTechnicalTransactionId: transactionId }
          : { financialClientTransactionId: transactionId }),
      };

          await this.updateOrder(updatePayload);

        console.log('before updating order:');

        }

        this.isLoading = false;

        this.$router.push({ name: 'AdminTransactionDetails', params: { transactionId } });
      } catch (error) {
        console.error('Error creating transaction:', error);
        this.isLoading = false;

      }
    }
  },
};

</script>


<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  .addFinancial {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 13px;
   // background-color: aqua;
  }
  .title {
    width: 470px;
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
  
  </style>
  