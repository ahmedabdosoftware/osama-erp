<template> 
    <div>
        <div class="detailsContent">
            <div class="detailsContent__title">
                <p>تفاصيل المخزن: (اسم المخزن: {{ branchInfo.nameBranch }})</p>
            </div>
            <div class="detailsContent__Info">
            <div class="detailsContent__Info__date">
                <p>تاريخ الانشاء: {{ branchInfo.date }}</p>
            </div>
           
            <div class="detailsContent__Info__general">
                <p> مكان المخزن: {{ branchInfo.location }}</p>
                <p>اسم المخزن : {{ branchInfo.nameBranch }}</p>
                <p>الحالة: {{ getStatusText(branchInfo.status) }}</p>
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
                        <th>الكمية</th>
                        <th> التنبيه</th>
                        <th>كود الصنف</th>
                        <th>اسم الصنف</th>
                        </tr>
                    </thead>
                    <tbody v-if="branchInfo.products">
                        <tr v-for="(product, index) in branchInfo.products" :key="index">
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.alert }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ categoryName(product) }}</td>
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
                    <p v-if="branchInfo.notes">{{ branchInfo.notes }}</p>
                    <div v-else class="no-notes">
                    <font-awesome-icon icon="sticky-note" size="4x" />
                    <p>لا توجد ملاحظات</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="details__btns">
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
          props: ["branchInfo"],
    
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
      
            categoryName(product){
            const categoryProductName = this.categories.find(category => category.id === product.productInfo.categoryId) 
            console.log(categoryProductName);
            if(categoryProductName){
              return categoryProductName.name
            }
          },
         
          goBack() {
              this.$router.push('/dashboard/Branches');
             
          },
          getStatusText(status) {

            switch (status) {
            case "0":
                return 'قديم';
            case "3":
                return 'مؤقت';
            case "1":
                return 'جديد';
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
        