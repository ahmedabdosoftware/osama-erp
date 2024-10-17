<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="show__table">
        <table class="table">
          <thead>
            <tr>
              <th>تاريخ التحويل</th>
              <th> الفرع *من</th>
              <th> الفرع *الى</th>
              <th>الحالة</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transfer, index) in transferes" :key="transfer.id">
              <td>{{ transfer.date }}</td>
              <td>{{ transfer.selectedBranchFrom }}</td>
              <td>{{ transfer.selectedBranchTo }}</td>
              <td>{{ getStatusText(transfer.status) }}</td>
              <td class="actions">
                <DropdownMenu ref="dropdownMenu" :transfer="transfer" @closeOthers="openDropdownHandel(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
import DropdownMenu from "@/components/branches/transfer/DropdownMenu.vue";
  
  export default {
    name: "ListTable",
    components: {
      DropdownMenu,
    },
    props: ["transferes"],
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
          case 0:
            return 'فى الانتظار';
          case 3:
              return 'منجز';
          case 1:
              return 'اثناء النقل';
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
  