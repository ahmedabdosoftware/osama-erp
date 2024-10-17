<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="show__table">
        <table class="table">
          <thead>
            <tr>
              <th>تاريخ</th>
              <th> الشحن </th>
              <th>الفرع </th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ret, index) in returns" :key="ret.id">
              <td>{{ ret.date || "غير محدد" }}</td>
              <td>{{ ret.shipping || "غير محدد" }}</td>
              <td>{{ret.selectedBranch || "غير محدد"}}</td>
              <td class="actions">
                <DropdownMenu ref="dropdownMenu" :ret="ret" @closeOthers="openDropdownHandel(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
    import DropdownMenu from "@/components/returns/DropdownMenu.vue";
  
  export default {
    name: "ListTable",
    components: {
      DropdownMenu,
    },
    props: ["returns"],
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
  