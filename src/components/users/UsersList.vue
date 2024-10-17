<template>
    <div :class="{ 'dark-mode': getDarkMode }" class="ListTable">
      <div class="show__table">
        <table class="table">
          <thead>
            <tr>
              <th> الصورة الشخصية</th>
              <th> الايميل</th>
              <th>رقم الهاتف</th>
              <th>الاسم</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            
            <tr v-for="(user, index) in users" :key="user.id">
              <td v-if="user.profileImageURL"><img class="profile" :src="user.profileImageURL" /></td>
              <td v-else><font-awesome-icon class="profile" icon="user-circle" /></td>
              <td class="email">{{ user.email }}</td>
              <td class="phone">{{ user.number }}</td>
              <td>{{user.name}}</td>
              <td class="actions">
                <DropdownMenu ref="dropdownMenu" :user="user" @closeOthers="openDropdownHandel(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
    import DropdownMenu from "@/components/users/DropdownMenu.vue";
  
  export default {
    name: "UsersList",
    components: {
      DropdownMenu,
    },
    props: ["users"],
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

  // global style in path =>  src/scss/global/_globalStyle.scss

  .profile {
    width: 30;
    height: 30px;
    border-radius:50%;
    margin-top: 10px;

}
@media (max-width: 477px){
 
  .email,.phone{
    font-size: 11px;
  }
  
  }
  </style>
  