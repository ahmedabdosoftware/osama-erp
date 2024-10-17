<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="show__table">
        <table class="table">
          <thead>
            <tr>
              <th>تاريخ</th>
              <th> اسم المورد</th>
              <th>الفرع </th>
              <th>الحالة</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(purchase, index) in purchases" :key="purchase.id">
              <td>{{ purchase.date }}</td>
              <td>{{ purchase.adress }}</td>
              <td>{{purchase.selectedBranch}}</td>
              <td>{{ getStatusText(purchase.status) }}</td>
              <td class="actions">
                <DropdownMenu ref="dropdownMenu" :purchase="purchase" @closeOthers="openDropdownHandel(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
    import DropdownMenu from "@/components/purchases/DropdownMenu.vue";
  
  export default {
    name: "ListTable",
    components: {
      DropdownMenu,
    },
    props: ["purchases"],
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
            return 'مدفوع';
          case '1':
              return 'اجل';
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
  