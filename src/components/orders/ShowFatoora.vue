<template>
    <div>
      <div class="fatoora">
        <div  class="fatoora__header">
          <div>

           <!-- /*   <img class="invoiceLogo" :src="require('@/assets/images/invoice/logo.jpg')">        */ -->

          </div>
          <div>
            <button>فاتوره </button>
            <button class="numberOfOrder"> #{{ orderInfo.numberOfOrder }} </button>
            <!-- <span>  {{ orderInfo.numberOfOrder }}  :رقم</span> -->
          </div>
          <div>
            <!-- <p class="categories">  قطع غيار && جميع مستلزمات العربيات</p> -->
       
          </div>
        </div>
        <div  class="fatoora__title">
            <div>
                <p  v-if="orderInfo">  
                  {{ orderInfo.date }}  
                  : التاريخ  
                </p>
              
                <p v-if="orderInfo">
                  اسم العميل :    
                  {{ orderInfo.customerName || "غير محدد" }}
                </p>
            </div>
        </div>
        <div  class="fatoora__table" >
          <table class="table">
            <thead>
              <tr>
                <th>اجمالى </th>
                <th v-if="shouldDisplayDiscount">قيمة الخصم</th>
                <th>الكمية</th>
                <th>سعر الوحده</th>
                <th>كود المنتج</th>
                <th>اسم الصنف</th>
                <th>م</th> 
              </tr>
            </thead>
            <tbody v-if="orderInfo">
              <tr v-for="(product, index) in orderInfo.products" :key="index">
                <td>{{ calculateTotalPrice(product) }}</td>
                <td v-if="shouldDisplayDiscount" >{{ calculateDiscount(product) }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.priceWithIncrease && isCustomized ==="true" ? product.priceWithIncrease :  product.productInfo.priceMaterial  }}</td>
                <td>{{ product.productInfo.name }}</td>
                <td>{{ categoryName(product) }}</td>
                <td>{{ index + 1 }}</td> 
              </tr>
              <tr v-if="shouldDisplayInstallation">
                <td >{{ calculateTotalInstallation }}</td>
                <td v-if="shouldDisplayDiscount">0</td>
                <td >{{ calculateTotalQuantity }}</td>
                <td>{{ orderInfo.fixedInstallation>0 && isCustomized ==="true" ? orderInfo.fixedInstallation : "لا يوجد سعر موحد"  }}</td>
                <td colspan="2" >المصنعية</td>
              </tr>
              <tr  v-if="orderInfo.shipping">
                <td colspan="3">{{  orderInfo.customShipping && isCustomized ==="true" ?orderInfo.customShipping : orderInfo.shipping }}</td>
                <td colspan="4">الشحن</td>
              </tr>
              <tr  v-if="shouldDisplayDiscount">
                <td colspan="3">  {{  orderInfo.discount_value  }}  </td>
                <td colspan="4"> الحصم الكلى بالجنيه</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div  class="fatoora__sales">
          <table border="2" class="totalTable">
            <tbody>
              <tr v-if="shouldDisplayDiscount">  
                <td> {{ calculateTotalDiscount }}</td>
                <td class="total-bg">  :اجمالى الخصم</td>
              </tr>
              <tr v-if="shouldDisplayDiscount">  
                <td> {{ calculateGrandTotal }}</td>
                <td class="total-bg">    :اجمالى الفاتوره  </td>
              </tr>
           </tbody>
        </table>
          <!-- <p v-if="shouldDisplayDiscount">اجمالى الخصم: <span>{{ calculateTotalDiscount }}</span></p> -->
          <!-- <p>الاجمالى  : <span>{{ calculateGrandTotal }}</span></p> -->

        </div>
        <div  class="fatoora__notes">
        </div>
         
      </div>
      <div class="fatoora__btns">
          <button @click.prevent="goBack">عودة للطلبات</button>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCategoriesStore } from '@/store/categories/categories.js';

import QRCode from 'qrcode'; 


export default {
  name: "ShowFatoora",
  components: {},
  props: {
    orderInfo: {
      type: Object,
      required: true,
    },
    isCustomized: {
      type: String,
      required: true,
    },
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
    ...mapState(useCategoriesStore, ['categories']),

    shouldDisplayDiscount() {
      // لو كان مخصصًا، تحقق من وجود displaySale في orderInfo
      if (this.isCustomized ==="true" && this.orderInfo.displaySale) {
        
        return true;
      }
      // إذا لم يكن مخصصًا، اعرض الخصم أيضًا
      if (this.isCustomized ==="false") {
        return true;
      }
      // في أي حالة أخرى، لا تعرض الخصم
      return false;
    },
    shouldDisplayInstallation() {
      // لو كان مخصصًا، تحقق من وجود displayInstallation في orderInfo
      if (this.isCustomized ==="true" && this.orderInfo.displayInstallation) {
        
        return true;
      }
      // إذا لم يكن مخصصًا، لا تعرض المصنعية فى الحدول
      if (this.isCustomized ==="false") {
        return false;
      }
      // في أي حالة أخرى، لا تعرض المصنعية فى الجدول
      return false;
    },
        // حساب إجمالي الخصومات
        calculateTotalDiscount() {
          const totalDiscount = this.orderInfo.products.reduce((total, product) => {

            const productPrice = product.priceWithIncrease && this.isCustomized === "true"
              ? product.priceWithIncrease
              : product.productInfo.priceMaterial;
            
            const productTotalPrice = productPrice * product.quantity;
            const discountAmount = productTotalPrice * (product.price_offer / 100);

            return total + discountAmount;
          }, 0);

          // أضف الخصم الكلي الثابت (orderInfo.discount_value)
          const totalDiscountWithFixed = totalDiscount + parseFloat(this.orderInfo.discount_value || 0);

          return totalDiscountWithFixed.toFixed(2);
        },

    // حساب الإجمالي الكلي بعد الخصومات
    calculateGrandTotal() {
      const grandTotal = this.orderInfo.products.reduce((total, product) => {

        const productPrice = product.priceWithIncrease && this.isCustomized ==="true" ? product.priceWithIncrease : product.productInfo.priceMaterial;
        const productTotalPrice = productPrice * product.quantity;

        const discountAmount = productTotalPrice * (product.price_offer / 100);
        return total + (productTotalPrice - discountAmount);
      }, 0);
      const shippingCost = Number(this.orderInfo.shipping) || 0;
      const totalDiscountValue = parseFloat(this.orderInfo.discount_value || 0);

      return (grandTotal+shippingCost-totalDiscountValue).toFixed(2);
    },
  // حساب إجمالي الكميات فقط
  calculateTotalQuantity() {
        const totalQuantity = this.orderInfo.products.reduce((total, product) => {

          if (product.productInfo.priceWithLabor){

            return total + Number(product.quantity);
          }else {
            
            return total ;
          }


        }, 0);
        
        return totalQuantity;
      }
      ,
    // حساب اجمالي التركيب
    calculateTotalInstallation() {

    if (this.orderInfo.laborPrice) {
      
      return this.orderInfo.laborPrice;
      
    }else{
      
      const totalInstallation = this.orderInfo.products.reduce((total, product) => {
        let productInstallationPrice;

         // إذا كان هناك تعديل مخصص لسعر المصنعية (editOfInstallation) والفاتورة مخصصة
      if (this.isCustomized === "true" && product.editOfInstallation && Number(product.editOfInstallation) > 0) {
        productInstallationPrice = product.editOfInstallation * product.quantity;
      } else if (product.productInfo.priceWithLabor) {
        // إذا لم يكن هناك تعديل مخصص، استخدم السعر الافتراضي للمصنعية
        productInstallationPrice = product.productInfo.priceWithLabor * product.quantity;
      } else {
        // في حال عدم وجود سعر للمصنعية، إرجاع الإجمالي بدون تغيير
        console.log('no labor for that:', product);
        return total;
      }

      return total + productInstallationPrice;
    }, 0);

    return totalInstallation.toFixed(2);
  }
  }
  },
  async created() {
    
      console.log('inside componnent:', this.isCustomized);
      console.log('inside componnent:', this.orderInfo);
      this.fetchCategories();
   // try {
      //await nextTick(); // انتظر حتى يتم تحميل الـ DOM
     //// this.generateQRCode();  
   // } catch (error) {
    //  console.error('Error fetching orders:', error);
    //}
  },
  
  methods: {
    ...mapActions(useCategoriesStore, ['fetchCategories']),

    calculateTotalPrice(product) {

        const productPrice = product.priceWithIncrease && this.isCustomized ==="true" ? product.priceWithIncrease : product.productInfo.priceMaterial;
        const productTotalPrice = productPrice * product.quantity;
        const discountAmount = productTotalPrice * (product.price_offer / 100);

      return (productTotalPrice - discountAmount).toFixed(2);
   },
   
    calculateDiscount(product) {

      const productPrice = product.priceWithIncrease && this.isCustomized ==="true" ? product.priceWithIncrease : product.productInfo.priceMaterial;
      const productTotalPrice = productPrice * product.quantity;
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
    async generateQRCode() {
      try {
        const qrCodeData = 'https://ahmedabdosoftware.github.io/websiteUpdated-DSD/'; 
        const qrCanvas = document.getElementById('qr-code');
        await QRCode.toCanvas(qrCanvas, qrCodeData);
      } catch (error) {
        console.error('Error generating QR code:', error);
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
  },
  data() {
    return {
    
    };
  },
};
</script>
<style  scoped lang="scss">

// **fatora section** => start

//varibles

$buttom_fatoora_background:#0a303f;
$buttom_font_fatoora: 22px;
$font_weight_fatoora: 700;
$border_fatoora:2px solid rgb(71, 71, 71);
$buttom_color_fattora: white;
$buttom_font: 19px;


//reset => normalize 
*{
  margin: 0px;
}


//extends

%btn-style{
  text-align: center;
  font-size: $buttom_font;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  background-color: $buttom_color_fattora;
  color: white;
  cursor: pointer;

}

%use_flex{
  display: flex;
  flex-wrap: wrap;
}
%center_flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
%btn-style_fatoora{
  text-align: center;
  font-size: $buttom_font_fatoora;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  background-color:$buttom_fatoora_background;
  color: block;
  cursor: pointer;

}

%font{
  font: {
      size:19px;
      weight:600;
    }
}

//start your style

 .fatoora{
    @extend %use_flex;
    justify-content:center;
    width: 66%;
    min-height:60vh;
  //  background-color: red;
    margin: auto;
    margin-top: 32px;
    border :6px double rgb(71, 71, 71);
    border-radius: 5px;
  
}

.fatoora__header{
  @extend %use_flex;
  justify-content: space-evenly;
  width: 100%;
  height:250px;
  //  background-color: rgb(153, 141, 141);
   
   >div{
     width: 30%;
     height: 100%;
    // background-color: antiquewhite;
    }
    >div:first-child{
      
      .invoiceLogo{
        width: 90px;
        height: 90px;
        margin-top: 20px;
        border-radius: 45px;
        
      }

    }
    >div:nth-child(3){
    @extend %use_flex;
    justify-content: end;
    align-content: space-evenly;
    .logoFatora{
      font-size: 40px;
      color: rgb(110, 108, 105);
      text-align: end;

      span{
        font-family: Arial, Helvetica, sans-serif;
        color: black;
      }
    }
    .categories{
      color: rgb(110, 108, 105);
      font-size: 30px;
      text-align: end;
    }

  }
  >div:nth-child(2){
    
    @extend %use_flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    button{
      
      @extend %btn-style_fatoora;
        font-size: 28px;
        width: 170px;
        height: 50px;
        margin-top: 15px;
        border: $border_fatoora;
        color: white;
      }
      button:first-child{
        text-decoration: underline;
      }
      button:nth-child(2){
        width: 130px;
        background-color: white;
        color:rgb(100, 98, 98);
        border:dashed 2px $buttom_fatoora_background;
      }
    

   }

  
 }

 .fatoora__title{
  width: 95%;
  height: 100px;
  // border: $border_fatoora;
  @extend %use_flex;
  justify-content: flex-end;
  align-items: center;
  // background-color: aliceblue;
  >div{
    min-width: 200px;
    height: 70px;
    // background-color: rgb(87, 114, 137);
    border: 2px solid black;

     p {
        //background-color: rgb(104, 149, 189);
        padding-right: 10px;
        margin-top: 7px;
        text-align: end;
        font-weight: $font_weight_fatoora;
        font-size: 18px;
        text-decoration: underline;
      }
    }
    
    
  }
  
  .fatoora__table{
    width: 95%;
    min-height: 70px;
    // background-color: rgb(172, 42, 42);
    .table{
      width: 100%;
      height: 100%;
      border-collapse: collapse;
   // background-color: salmon;
   tr{

     height: 30px;
     td,th{
       border: $border_fatoora;
       text-align: center;
       //background-color: sandybrown;
       
      }
      th{
       background-color: $buttom_fatoora_background;

     }

    }
  }
  
}
.fatoora__sales{
  
  width: 100%;
  display: flex;
  justify-content:flex-start;
  margin-top: 14px;
  // background-color: red;
  // padding-left: 20px;
  // margin-right: 180px;
  // p{
  //   //width: 280px;
  //   text-align: start;
  //   @extend %font;
  //   margin-top:16px ;
    
  //   span{
  //     border: 2px solid black;
  //     padding: 4px;
    // }
  // }
  table{
    margin-left: 50px;
    tr{
      td{
        width: 100px;
        height: 40px;
        text-align: center;
      }
      .total-bg{
        background-color: rgb(130, 151, 232);
      }
    }

  }

}

.fatoora__notes{
  width: 95%;
  height: 100px;
  margin-top: 14px;

  //background-color: rgb(33, 108, 170);
  
  @extend %font;

  >p:nth-child(2){
    background-color: bisque;
    padding: 4px;
    display: inline-block;
    
  }
  
  
}
.qrcode_cont{
  
  width: 100%;
  height: 120px;
  @extend %center_flex;
  margin: 15px 0px;
  
}

.fatoora__btns{
  @extend %center_flex;
  width: 100%;
  height: 120px;
  //background-color: rgb(173, 62, 173);
  
    button{
    margin-bottom: 15px;
    width: 60%;
    height: 50px;
    border: $border_fatoora;
    @extend %btn-style_fatoora;
    color: white;

    }

  
 
}
// ipad
@media (max-width: 821px){
  //fatoora
  .fatoora{
  width: 86%;
  
  }

}
// phone 450px
@media (max-width: 450px){


  //fatoora
  .fatoora{
  width: 97%;
  
 }

//fatoora__header
 .fatoora__header{
 
   >div:nth-child(2){
   
      button{
          width: 90%;
        }

   }

  
 }

  //fatoora__title
 .fatoora__title{
 
  >div:nth-child(2){
    width:60%;
  }


 }
.categories{
  font: {
    size:18px !important;
    weight: 500;
  }

}


}
// phone 366px
@media (max-width: 366px){
 
  .fatoora__header{
 
 >div:nth-child(3){

 .logoFatora{
   font-size: 20px;    
 }
 .categories{
   font-size: 17px;
 }

}

}

.fatoora__title{

>div{
  p {
     font-size:17px;
   }
 }
 
}

}
@media print{
  .fatoora{
    width: 550px;
  }
  .fatoora__btns{
    display: none;
  }
 
  
.fatoora__header{
 
    >div:nth-child(3){
   
    .logoFatora{
      font-size: 20px;    
    }
    .categories{
      font-size: 17px;
    }

  }
  
 }

 .fatoora__title{
 
  >div{
     p {
        font-size:17px;
      }
    }
    
  }
  
}
// **fatora section** => end


</style>