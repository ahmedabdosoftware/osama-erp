<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="show__table">
        <table class="table">
          <thead>
            <tr>
              <th>تاريخ الانشاء</th>
              <th>اسم المخزن  </th>
              <th> المكان</th>
              <th>الحالة</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(branch, index) in Branches" :key="branch.id">
              <td>{{ branch.date }}</td>
              <td>{{ branch.nameBranch }}</td>
              <td>{{ branch.location }}</td>
              <td>{{ getStatusText(branch.status) }}</td>
              <td class="actions">
                <DropdownMenu ref="dropdownMenu" :branch="branch" @closeOthers="openDropdownHandel(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
import DropdownMenu from "@/components/branches/DropdownMenu.vue";
  
  export default {
    name: "ListTable",
    components: {
      DropdownMenu,
    },
    props: ["Branches"],
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
  