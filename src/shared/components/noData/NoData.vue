<template>
  <div class="no-data">
    <font-awesome-icon class="icon" :icon="icon" size="4x" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["context"],
  name: "NoData",
  computed: {
    icon() {
      switch (this.context) {
        case 'orders':
          return 'sticky-note'
        case 'todayOrders':
          return 'sticky-note'
        case 'products':
          return 'box-open'
        case 'categories':
          return 'tags'
        case 'users':
          return 'user-slash'
        case 'transactions':
          return 'file-invoice'
        case 'units':
          return 'balance-scale'
        case 'storage':
          return 'warehouse'
        case 'purchases':
          return 'shopping-cart' 
        case 'returns':
          return 'undo' 
        case 'unpaidPurchases':
          return 'shopping-cart' 
        case 'transfers': 
        return 'exchange-alt'; 
        case 'stock-alerts': 
        return 'bell'
        default:
          return 'exclamation-circle'
      }
    },
    message() {
      switch (this.context) {
        case 'orders':
          return 'لا توجد طلبات'
        case 'todayOrders':
          return 'لا توجد طلبات اليوم'
        case 'products':
          return 'لا توجد منتجات'
        case 'categories':
          return 'لا توجد تصنيفات'
        case 'users':
          return 'لا يوجد مستخدمون'
        case 'transactions':
          return 'لا توجد معاملات' 
        case 'units': 
          return 'لا توجد وحدات'
        case 'storage':
          return 'لا توجد مخازن'
        case 'purchases':
          return 'لا توجد مشتريات'
        case 'unpaidPurchases':
          return 'لا توجد مشتريات غير مدفوعه (اجل)'
        case 'transfers': 
        return 'لا توجد تحويلات';
        case 'returns': 
        return 'لا توجد مرتجعات';
        case 'stock-alerts': 
          return 'لا توجد تنبيهات مخزون'
        default:
          return 'لا توجد بيانات'
      }
    }
  },
  created() {
    console.log('prop', this.context);
  },
}
</script>

<style scoped lang="scss">
.no-data {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;
  p {
    margin-top: 10px;
    font-size: 25px;
  }
  .icon {
    width: 50%;
    height: 50%;
  }
}
</style>
