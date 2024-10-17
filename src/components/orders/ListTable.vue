<template>
  <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
    <div class="show__table">
      <table class="table">
        <thead>
          <tr>
            <th>تاريخ</th>
            <th>رقم الطلب </th>
            <th> العميل</th>
            <th>نوع الفاتورة</th>
            <th>الحالة</th>
            <th>الخيارات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <td>{{ order.date }}</td>
            <td>{{ order.numberOfOrder }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{order.invoiceType}}</td>
            <td>{{ getStatusText(order.status) }}</td>
            <td class="actions">
              <DropdownMenu ref="dropdownMenu" :order="order" @closeOthers="openDropdownHandel(index)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import DropdownMenu from "@/components/orders/DropdownMenu.vue";

export default {
  name: "ListTable",
  components: {
    DropdownMenu,
  },
  props: ["orders"],
  data() {
    return {
      openDropdownProp: null,
    };
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
  },
  methods: {
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
    openDropdownHandel(index) {
      if (this.openDropdownProp !== null && this.openDropdownProp !== index) {
        this.$refs.dropdownMenu[this.openDropdownProp].closeDropdown();
      }
      this.openDropdownProp = index;
    },
  },
};
</script>

<style scoped lang="scss">

          // global style in path =>  src/scss/global/_globalStyle.scss

</style>
