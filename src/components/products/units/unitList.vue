<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="unit__table">
        <table class="table">
          <thead>
            <tr>
              <th>اسم الوحدة</th>
              <th>اختصار الوحدة</th>
              <th>السماح بالاختصار</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in units" :key="unit.id">
              <td>{{ unit.name }}</td>
              <td>{{ unit.shorthand }}</td>
              <td>{{ unit.allowShorthand ? 'نعم' : 'لا' }}</td>
              <td class="actions">
                <DropdownMenu ref="dropdownMenu" :unit="unit" @closeOthers="openDropdownHandel(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import DropdownMenu from "@/components/products/units/DropdownMenu.vue";
  
  export default {
    name: "ListTable",
    components: {
      DropdownMenu,
  
    },
    props: ["units"],
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
  .ListTable {
    width: 100%;
    min-height: 150px;
    overflow: scroll;
  }
  .dark-mode {
    background-color: rgb(19, 19, 19);
  }
  .unit__table {
    width: 100%;
    min-height: 70px;
   // background-color: red;
    .table {
      width: 100%;
      border-collapse: collapse;
      tr {
        height: 30px !important;
   //     background-color: rgb(49, 47, 47);
        td,
        th {
           // background-color: aqua;
          text-align: center;
          text-transform: capitalize;
        }
      }
    }
  }
  thead {
    border-radius: 10px;
    background-color: var(--popularCalar);
    
    th {
      color: white;
      height: 40px;
    }
  }
  .actions {
    position: relative;
  }
  @media (max-width: 477px){
    thead {
      
      th {
       font-size: 16px;
      }
    }
  
  }
  </style>
  