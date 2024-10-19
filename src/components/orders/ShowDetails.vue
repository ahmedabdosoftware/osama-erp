<template> 
<div>
    <div class="detailsContent">
        <div class="detailsContent__title">
        <p>تفاصيل الطلب: (فاتورة رقم: {{ orderInfo.numberOfOrder }})</p>
        </div>
        <div class="detailsContent__Info">
        <div class="detailsContent__Info__date">
            <p>تاريخ الطلب: {{ orderInfo.date }}</p>
        </div>
        <div class="detailsContent__orderInfo__technichal">
            <p>اسم الفني: {{ orderInfo.TechnicaInfo.name }}</p>
            <p v-if="isAdmin">رقم التليفون: {{ orderInfo.TechnicaInfo.number }}</p>
        </div>
        <div class="detailsContent__orderInfo__clint">
            <p>اسم العميل: {{ orderInfo.customerName }}</p>
            <p>العنوان: {{ orderInfo.adress }}</p>
            <p>رقم التليفون: {{ orderInfo.customerInfo.number }}</p>
        </div>
        <div class="detailsContent__Info__general">
            <p>فاتورة رقم: {{ orderInfo.numberOfOrder }}</p>
            <p>نوع الفاتورة: {{ orderInfo.invoiceType }}</p>
            <p>الحالة: {{ getStatusText(orderInfo.status) }}</p>
        </div>
        </div>
        <div class="detailsContent__listProducts">
            <div>
                <p>:المنتجات</p>
            </div>
            <div>
                <table class="table">
                <thead>
                    <tr>
                    <th v-if="isAdmin">الاجمالى</th>
                    <th v-if="isAdmin">قيمة الخصم</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>كود الصنف</th>
                    <th>اسم الصنف</th>
                    </tr>
                </thead>
                <tbody v-if="orderInfo.products">
                    <tr v-for="(product, index) in orderInfo.products" :key="index">
                    <td v-if="isAdmin">{{ calculateTotalPrice(product) }}</td>
                    <td v-if="isAdmin">{{ calculateDiscount(product) }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.priceWithIncrease  ? product.priceWithIncrease :  product.productInfo.priceMaterial  }}</td>
                    <td>{{ product.productInfo.name }}</td>
                    <td>{{ categoryName(product) }}</td>
                    </tr>
                    <tr  v-if="orderInfo.shipping">
                      <td colspan="3">{{ orderInfo.shipping }}</td>
                      <td colspan="3">الشحن</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div class="detailsContent__imge">
            <div class="detailsContent__imge_title">
                <p>:التصميم</p>
            </div>
            <div class="detailsContent__imge_cont">
                <img v-if="orderInfo.imageUrl" :src="orderInfo.imageUrl" />
                <div v-else class="no-image">
                <font-awesome-icon icon="image" size="4x" />
                <p>لا يوجد صورة متاحة</p>
                </div>
            </div>
        </div>
        <div class="detailsContent__note">
            <div class="detailsContent__note_title">
                <p>:الملاحظات</p>
            </div>
            <div class="detailsContent__note_cont">
                <p v-if="orderInfo.notes">{{ orderInfo.notes }}</p>
                <div v-else class="no-notes">
                <font-awesome-icon icon="sticky-note" size="4x" />
                <p>لا توجد ملاحظات</p>
                </div>
            </div>
        </div>
    </div>
    <div class="details__btns">
       <!-- /* 
        hide it now becase there is more than one
       <button @click.prevent="Fatora">فاتورة</button>
        
        */ -->
        <button @click.prevent="goBack">اغلاق</button>
    </div>
</div>   
</template>
    <script>
    import { mapState, mapActions } from 'pinia'

    // store
    import { useCategoriesStore } from '@/store/categories/categories.js';
    import { useUserStore } from '@/store/auth/auth.js';

    
    
    export default {
      name: "ShowDetails",
      components: {},
      props: ["orderInfo"],

      computed: {
        getDarkMode() {
          return this.$store.state.darkMode;
        },
        ...mapState(useCategoriesStore, ['categories']),
        ...mapState(useUserStore, ['isAdmin']),

  
            // حساب إجمالي الخصومات
        calculateTotalDiscount() {
            const totalDiscount = this.orderInfo.products.reduce((total, product) => {
            const productTotalPrice = product.productInfo.priceMaterial * product.quantity;
            const discountAmount = productTotalPrice * (product.price_offer / 100);
            return total + discountAmount;
          }, 0);
          return totalDiscount.toFixed(2)
        },
        // حساب الإجمالي الكلي بعد الخصومات
        calculateGrandTotal() {
          const grandTotal = this.orderInfo.products.reduce((total, product) => {
            const productTotalPrice = product.productInfo.priceMaterial * product.quantity;
            const discountAmount = productTotalPrice * (product.price_offer / 100);
            return total + (productTotalPrice - discountAmount);
          }, 0);
          const shippingCost = Number(this.orderInfo.shipping) || 0;
          return (grandTotal+shippingCost).toFixed(2);
        },
       
      // حساب اجمالي التركيب
      calculateTotalInstallation() {
  
        if (this.orderInfo.laborPrice) {
          
          return this.orderInfo.laborPrice;
          
        }else{
          
          const totalInstallation =this.orderInfo.products.reduce((total, product) => {
            if(product.productInfo.priceWithLabor){
              const productInstallationPrice = product.productInfo.priceWithLabor * product.quantity;
              return total + productInstallationPrice;
            }else{
              console.log('no labor for that :', product)
              console.log('total until now :', total)
              return total 
            }
          }, 0);
          
          return totalInstallation.toFixed(2);
  
        }
        },
      },
      async created() {
  
        this.fetchCategories();
       
      },
      
      methods: {
        ...mapActions(useCategoriesStore, ['fetchCategories']),
  
  
         calculateTotalPrice(product) {
          const productTotalPrice = product.productInfo.priceMaterial * product.quantity;
          const discountAmount = productTotalPrice * (product.price_offer / 100);
          return (productTotalPrice - discountAmount).toFixed(2);
       },
        calculateDiscount(product) {
          const productTotalPrice = product.productInfo.priceMaterial * product.quantity;
          const discountAmount = productTotalPrice * (product.price_offer / 100);
          return  discountAmount.toFixed(2);
        },
        categoryName(product){
        const categoryProductName = this.categories.find(category => category.id === product.productInfo.categoryId) 
        console.log(categoryProductName);
        if(categoryProductName){
          return categoryProductName.name
        }
      },
       Fatora() {
  
          const layout = this.$route.meta.layout;
          const orderId =this.orderInfo.id
          if (layout === 'DashboardLayout') {
          
            this.$router.push({ name: 'Fatora', params: { orderId: orderId } });
          
          } else if (layout === 'profileInDashboardLayout') {
            
            const profileId = this.$route.params.profileId;
            this.$router.push(`/dashboard/profile/${profileId}/Fatora/${orderId}`);
            
          }else if(layout === 'profileOutDashboardLayout'){
            
            const profileId = this.$route.params.profileId;
            this.$router.push(`/profile/${profileId}/Fatora/${orderId}`);
          
          }
      },
      goBack() {
          const layout = this.$route.meta.layout;
          if (layout === 'DashboardLayout') {
              this.$router.push('/dashboard/Order');
          } else if (layout === 'profileInDashboardLayout') {
              const profileId = this.$route.params.profileId;
              this.$router.push(`/dashboard/profile/${profileId}`);
          } else if (layout === 'profileOutDashboardLayout') {
              const profileId = this.$route.params.profileId;
              this.$router.push(`/profile/${profileId}`);
          }
      },
      getStatusText(status) {
        switch (status) {
          case '0':
            return 'معلق';
          case '3':
              return 'منتهى';
          case '1':
              return 'مؤكد';
          default:
            return 'غير معروف';
        }
      },
  
      
      },
      data() {
        return {
        };
      },
    };
    </script>
    <style scoped lang="scss">

          // global style in path =>  src/scss/global/_globalStyle.scss
          
    </style>
    