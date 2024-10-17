<template> 
    <div>
        <div v-if="returns" class="detailsContent">

            <div class="detailsContent__Info">
                <div class="detailsContent__Info__date">
                    <p>تاريخ الشراء: {{ purchaseInfo.date }}</p>
                </div>
            
                <div class="detailsContent__Info__general">
                    <p>اسم الفرع: {{ purchaseInfo.selectedBranch }}</p>
                    <p>العنوان/ اسم المورد: {{ purchaseInfo.adress }}</p>
                    <p>الحالة: {{ getStatusText(purchaseInfo.status) }}</p>

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
                        <th>الاجمالى</th>
                        <th>الكمية</th>
                        <th>سعر الشراء</th>
                        <th>كود الصنف</th>
                        <th>اسم الصنف</th>
                        </tr>
                    </thead>
                    <tbody v-if="purchaseInfo.products">
                        <tr v-for="(product, index) in purchaseInfo.products" :key="index">
                            <td>{{ calculateTotalPrice(product) }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.price_buy }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ categoryName(product) }}</td>
                        </tr>
                        <tr  v-if="purchaseInfo.shipping">
                          <td colspan="3">{{ purchaseInfo.shipping }}</td>
                          <td colspan="3">الشحن</td>
                        </tr>
                        <tr>
                          <td colspan="3">{{ calculateTotalPriceForAll }}</td>
                          <td colspan="3">اجمالى قبل الخصم</td>
                        </tr>
                        <tr>
                          <td colspan="3">{{ calculateDiscount }}</td>
                          <td colspan="3">اجمالى  الخصم</td>
                        </tr>
                        <tr>
                          <td colspan="3">{{ calculateGrandTotal }}</td>
                          <td colspan="3">الاجمالى  </td>
                        </tr>
                        <tr v-if="calculateTotalReturns>0">
                            <td colspan="3">{{ calculateTotalReturns }}</td>
                            <td colspan="3">اجمالي المرتجعات</td>
                        </tr>
                        <tr v-if="calculateNetTotal>0">
                            <td colspan="3">{{ calculateNetTotal }}</td>
                            <td colspan="3">قيمة المستحق</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <div class="detailsContent__note">
                <div class="detailsContent__note_title">
                    <p>:الملاحظات</p>
                </div>
                <div class="detailsContent__note_cont">
                    <p v-if="purchaseInfo.notes">{{ purchaseInfo.notes }}</p>
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
        import { useCategoriesStore } from '@/store/categories/categories.js';
        import { useReturnsStore } from '@/store/purchaseReturns/returns.js';

        
        
        export default {
          name: "ShowDetails",
          components: {},
          props: ["purchaseInfo"],
    
          computed: {
            getDarkMode() {
              return this.$store.state.darkMode;
            },
            ...mapState(useCategoriesStore, ['categories']),
            ...mapState(useReturnsStore, ['returns']),  
// New
            // حساب إجمالي المرتجعات مع الخصم
            calculateTotalReturns() {
                console.log(this.returns)
                if (!this.returns || this.returns.length === 0) {
                    return 0;
                }

                let totalReturns = 0;

                // حساب إجمالي المرتجعات بدون خصم
                totalReturns = this.returns.reduce((total, ret) => {
                    return total + ret.products.reduce((subTotal, product) => {
                        return subTotal + product.quantityReturn * product.price_buy;
                    }, 0);
                }, 0);
                console.log('totalReturns',totalReturns)

                // حساب إجمالي الخصم المطبق على المرتجعات
                const discountOnReturns = this.calculateDiscountOnReturns(totalReturns);

                return (totalReturns - discountOnReturns).toFixed(2); // إجمالي المرتجعات مع الخصم
            },


///////////////


            // حساب قيمة المستحق (إجمالي المشتريات ناقص إجمالي المرتجعات)

            calculateNetTotal() {
                const totalPurchases = this.calculateGrandTotal;
                const totalReturns = this.calculateTotalReturns;
                return (totalPurchases - totalReturns).toFixed(2);
                },


            // حساب إجمالي قبل الخصم
            calculateTotalPriceForAll() {
                const total = this.purchaseInfo.products.reduce((total, product) => {
                    // فحص أن البيانات متاحة وصحيحة قبل الحساب
                    if (product && typeof product.price_buy !== 'undefined' && typeof product.quantity !== 'undefined') {
                    const productTotalPrice = product.price_buy * product.quantity;
                    return total + productTotalPrice;
                    }
                    return total;
                }, 0);
                return total.toFixed(2);
                },

            // حساب إجمالي الخصومات
                calculateDiscount() {
                    const total = this.calculateTotalPriceForAll;
                    let discountAmount = 0;
                    
                    if (this.purchaseInfo.discount_type === 'percentage') {
                        discountAmount =Number(total) * (Number(this.purchaseInfo.discount_value) / 100);
                    } else if (this.purchaseInfo.discount_type === 'fixed') {
                        discountAmount = Number(this.purchaseInfo.discount_value);
                    }
                    
                    return discountAmount.toFixed(2);
                    },

            // حساب الإجمالي الكلي بعد الخصومات
            calculateGrandTotal() {
                const total = this.calculateTotalPriceForAll;
                const discount = this.calculateDiscount;
                const grandTotal = total - discount;
                const shippingCost = Number(this.purchaseInfo.shipping) || 0;
                return (grandTotal+shippingCost).toFixed(2);
                },
            
        
          },
          async created() {
      
            this.fetchCategories();
            this.fetchReturns()

          },
          
          methods: {
            ...mapActions(useCategoriesStore, ['fetchCategories']),
            ...mapActions(useReturnsStore, ['fetchReturnsByPurchaseId']), 

            async fetchReturns() {
                if (this.purchaseInfo.id) {
                    await this.fetchReturnsByPurchaseId(this.purchaseInfo.id);
                }
            },





// New

        // حساب إجمالي الخصم المطبق على المرتجعات
        calculateDiscountOnReturns(totalReturns) {
        let discountAmount = 0;
        
        if (this.purchaseInfo.discount_type === 'percentage') {
            discountAmount = Number(totalReturns) * (Number(this.purchaseInfo.discount_value) / 100);

            console.log('totalReturns',totalReturns)
            console.log('discount_value',this.purchaseInfo.discount_value)
            console.log(discountAmount)
        } else if (this.purchaseInfo.discount_type === 'fixed') {
            // توزيع الخصم الثابت بناءً على النسبة بين إجمالي المرتجعات وإجمالي المشتريات
            const totalPurchases = this.calculateTotalPriceForAll;
            discountAmount = (Number(this.purchaseInfo.discount_value) * totalReturns) / totalPurchases;

            console.log('calculateTotalPriceForAll',this.calculateTotalPriceForAll)
            console.log('totalReturns',totalReturns)
            console.log('discount_value',this.purchaseInfo.discount_value)
            console.log(discountAmount)
        }
        
        return discountAmount.toFixed(2);
        },

//////////////////////////


      
        calculateTotalPrice(product) {
            if (!product || typeof product.price_buy === 'undefined' || typeof product.quantity === 'undefined') {
                return 0; // إذا كانت الخاصية غير موجودة، أعد قيمة 0    
            }

            const productTotalPrice = product.price_buy * product.quantity;
            return productTotalPrice.toFixed(2);
            },
            


        
            categoryName(product){
            const categoryProductName = this.categories.find(category => category.id === product.productInfo.categoryId) 
            console.log(categoryProductName);
            if(categoryProductName){
              return categoryProductName.name
            }
          },
           
          goBack() {
            this.$router.push({ name: 'Purchases' });
 
          },
          getStatusText(status) {

                switch (status) {
                case '0':
                    return 'مدفوع';
                case '1':
                    return 'اجل';
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
        