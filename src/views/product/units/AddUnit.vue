
<template>
    <div class="add">
      <div class="add_title">
        <p :class="{ 'dark-mode-title': getDarkMode }">Create Units</p>
      </div>
      <div :class="{ 'dark-moode': getDarkMode }" class="add_allConten">
        <div>
          <h3 :class="{ 'dark-mode-title': getDarkMode }">Add Units</h3>
        </div>
      <ValidationObserver class="wraper-form" ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="createNewUnit" class="add_allContent_cont-form add_allContent_cont-form--units">
          <div class="cont-form_field Name">
            <ValidationProvider name="اسمك الوحدة" rules="required" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }">Unit Name</label>
              <input v-model="name" type="text" placeholder="Enter unit name" required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="cont-form_field">
            <ValidationProvider name="الاختصار" rules="required" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }">Shorthand</label>
              <input v-model="shorhandName" type="text" placeholder="Enter Shorhand Name " required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="display-options">
              <label>
                <input  type="checkbox" v-model="isUseShorthand" />
                <p> allow to use shorthand</p>
              </label>
          </div>
          <div class="cont-form_btn">
            <router-link to="/dashboard/Units"><button type="button">Cancel</button></router-link>
            <button class="create"   :class="{ 'disabled-btn': invalid }" :disabled="invalid" type="submit">Create</button>
          </div>
        </form>
      </ValidationObserver>
      </div>
    </div>
  </template>
  <script>
  
  // actions 
  import { mapActions } from 'pinia'
  import { useUnitsStore } from '@/store/products/units/units.js';

  // sweetalert 
  import sweetalert from "sweetalert";

  import { extend } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';
  

  extend('required', {
    ...required,
    message: '{_field_} مطلوب'
  });
  
  export default {
    name: "AddUnit",
    data() {
      return {
        name: '',
        shorhandName: '',
        isUseShorthand: false,
      };
    },
    computed: {
      getDarkMode() {
        return false;
      }
    },
    methods: {
          // ============ my actions => start=======================================
  
      ...mapActions(useUnitsStore, ['addUnit']),  
        // ============ my actions => end==========================================

      async createNewUnit() {
        try {
          await this.addUnit({
            name: this.name,
            shorthand: this.shorhandName,
            allowShorthand: this.isUseShorthand,
          });
          sweetalert({
            text: "unit craeted successfully",
            icon: "success",
          });
        } catch (error) {
          console.error("Failed to create unit:", error);
        }
      }
    },
    created() {
   },
  };
  </script>
  
  <style scoped lang="scss">

   
// global style :-
//  scss folder => path ( formStyle - form )

.display-options label{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
   // background-color: red;
    font-size: 19px;
    input{
        width: 17px;
        height: 17px;
        margin:0px 10px  ;
    }
}
.add_allContent_cont-form--units{
    height: 400px !important;
   // background-color: hotpink;

}
.add{
    background-color: white;
    color: black;
}
    </style>
  