<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="show__table">
        <table class="table">
          <thead>
            <tr>
              <th>اسم المخزن  </th>
              <th> المنتج</th>
              <th> الكمية المتاحة</th>
              <th> التنبية</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(alert) in StockAlerts" :key="alert.id">
              <td>{{ alert.branchName }}</td>
              <td>{{ alert.productName }}</td>
              <td>{{ alert.productQuantity }}</td>
              <td>{{ alert.alertQuantity }}</td>
              <td>{{ getStatusText(alert.status) }}</td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "ListTable",
    components: {
    },
    props: ["StockAlerts"],
    data() {
    return {}; 
  },
    computed: {
      getDarkMode() {
        return this.$store.state.darkMode;
      },
    },
    methods: {
      getStatusText(status) {
        switch (status) {
          case "0":
            return 'خطير';
          case "3":
              return 'عادي';
          case "1":
              return 'متوسط';
          default:
            return 'غير معروف';
        }
      },
     
    },
  };
  </script>
  
  <style scoped lang="scss">
  
           // global style in path =>  src/scss/global/_globalStyle.scss

  </style>
  