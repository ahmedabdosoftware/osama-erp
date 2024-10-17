
<template>
    <div class="add">
      <div class="add_title">
        <p :class="{ 'dark-mode-title': getDarkMode }">update Unit</p>
      </div>
      <div :class="{ 'dark-moode': getDarkMode }" class="add_allConten">
        <div>
          <h3 :class="{ 'dark-mode-title': getDarkMode }">update Units</h3>
        </div>
      <ValidationObserver class="wraper-form" ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="updateSingleUnit" class="add_allContent_cont-form add_allContent_cont-form--units">
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
  
  
  // actions and state
  import { mapActions, mapState } from 'pinia';

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
        id:'',
      };
    },
    computed: {
      getDarkMode() {
        return false;
      },
      ...mapState(useUnitsStore, ['units']),

    },
    methods: {
          // ============ my actions => start=======================================
  
      ...mapActions(useUnitsStore, ['updateUnit','fetchUnits']),  
        // ============ my actions => end==========================================
        fetchDetails(){
      console.log("details run")
      console.log(this.id)
        const unit = this.units.find(unit => unit.id === this.id);
    
            if (unit) {
            this.name = unit.name;
            this.shorhandName = unit.shorthand;
            this.isUseShorthand = unit.allowShorthand;
        
            }
        },
      async updateSingleUnit() {
        try {
          await this.updateUnit({
            id:this.id,
            name: this.name,
            shorthand: this.shorhandName,
            allowShorthand: this.isUseShorthand,
          });
          sweetalert({
            text: "unit updated successfully",
            icon: "success",
          });
        } catch (error) {
          console.error("Failed to update unit:", error);
        }
      }
    },
    async created() {
    
    this.id = this.$route.params.unitId;
    await this.fetchUnits()
    this.fetchDetails()

    

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
  