<template> 
    <div>
        <div class="detailsContent">

            <div class="detailsContent__Info">
                <div class="detailsContent__Info__date">
                    <p>تاريخ الارتجاع: {{ returnsInfo.date|| "غير محدد" }}</p>
                </div>
            
                <div class="detailsContent__Info__general">
                    <p>اسم الفرع: {{ returnsInfo.selectedBranch }}</p>

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
                        <th>الكميه المرتجعه</th>
                        <th>سعر الشراء</th>
                        <th>كود الصنف</th>
                        <th>اسم الصنف</th>
                        </tr>
                    </thead>
                    <tbody v-if="returnsInfo.products">
                        <tr v-for="(product, index) in returnsInfo.products" :key="index">
                            <td>{{ calculateTotalPrice(product) }}</td>
                            <td>{{ product.quantityReturn }}</td>
                            <td>{{ product.price_buy }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ categoryName(product) }}</td>
                        </tr>
                        <tr  v-if="returnsInfo.shipping">
                          <td colspan="3">{{ returnsInfo.shipping }}</td>
                          <td colspan="3">الشحن</td>
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
                    <p v-if="returnsInfo.notes">{{ returnsInfo.notes }}</p>
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
      
        
        
        export default {
          name: "ShowDetails",
          components: {},
          props: ["returnsInfo"],
    
          computed: {
            getDarkMode() {
              return this.$store.state.darkMode;
            },
            ...mapState(useCategoriesStore, ['categories']),
      
            
          },
          async created() {
      
            this.fetchCategories();
           
          },
          
          methods: {
            ...mapActions(useCategoriesStore, ['fetchCategories']),
      
      
        calculateTotalPrice(product) {
            if (!product || typeof product.price_buy === 'undefined' || typeof product.quantityReturn === 'undefined') {
                return 0; // إذا كانت الخاصية غير موجودة، أعد قيمة 0    
            }

            const productTotalPrice = product.price_buy * product.quantityReturn;
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
        