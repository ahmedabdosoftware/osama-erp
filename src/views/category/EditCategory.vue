<template>
  <div class="addCategory">
    <div class="addCategory__title">
      <p :class="{ 'dark-mode-title': getDarkMode }">update category</p>
    </div>
    <div :class="{ 'dark-moode': getDarkMode }" class="addCategory__allContent">
      <div class="allContent__title">
        <h3 :class="{ 'dark-mode-title': getDarkMode }">update category</h3>
      </div>
      
    <ValidationObserver class="wraper-form" ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="updateCategoryItem" class="allContent__cont-form">
        <div class="allContent__cont-form__name">
          <ValidationProvider name="الاسم الاول" rules="required" v-slot="{ errors }">
            <label :class="{ 'dark-mode-title': getDarkMode }">fill name</label>
            <input
              v-model="categoryName"
              type="text"
              placeholder="name category"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        
        <div class="allContent__cont-form__description">
          <ValidationProvider name="الوصف" rules="required" v-slot="{ errors }">
            <label :class="{ 'dark-mode-title': getDarkMode }">description</label>
            <input
              v-model="description"
              type="text"
              placeholder="description category"
            />
            <p class="note">you will be able to edit it later.</p>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="allContent__cont-form__image">
          <label> imge</label>
          <input id="fileImage" class="filee" type="file" @change="handleFileUpload">
        </div>

        <div class="allContent__cont-form__Availability">
          <label id="Availability" :class="{ 'dark-mode-title': getDarkMode }">Availability</label>
          <div>
            <ValidationProvider name="تركيب" rules="required" v-slot="{ errors }">
              <input type="radio" id="installation" value="تركيب" v-model="availability">
              <label for="installation">Installation</label>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider name="توريد" rules="required" v-slot="{ errors }">
              <input type="radio" id="sale" value="توريد" v-model="availability">
              <label for="sale">Sale</label>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider name="تركيب وتوريد" rules="required" v-slot="{ errors }">
              <input type="radio" id="both" value="تركيب وتوريد" v-model="availability">
              <label for="both">Both</label>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <div class="allContent__cont-form__submit">
          <router-link to="/dashboard/Category"> <button>cancle</button> </router-link>
          <button class="creat"  :class="{ 'disabled-btn': invalid }" :disabled="invalid" >creat</button>
        </div>       
      </form>
    </ValidationObserver>
    </div>
    <CircleLoader :show="isLoading" />

  </div>
</template>
<script>


import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

  // Register rules with custom messages

  extend('required', {
  ...required,
  message: '{_field_} مطلوب'
  
  });

  // CircleLoader
  import CircleLoader from '@/shared/components/loading/CircleLoader.vue';
// actions 
import {  mapActions, mapState  } from 'pinia'
import { useCategoriesStore } from '@/store/categories/categories.js'

import sweetalert from "sweetalert";

export default {
  name: "AddCatagory",
  //   its not stil work
  props: ["category"],
  components: {
    CircleLoader,

  },
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",
      id:null,
      file: null,
      availability: null, // Add availability here
      // loading 
      isLoading: false

    };
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
    ...mapState(useCategoriesStore, ['categories']),

  },
  methods: {
      
     // ============ my actions => start=======================================

     ...mapActions(useCategoriesStore, ['updateCategory', 'uploadImage','deleteImageFromStorage']),
     // ============ my actions => end==========================================
     
     // ============ handle File Upload => start==========================================
     handleFileUpload(event) {
       this.file = event.target.files[0];
     },
     // ============ handle File Upload => end==========================================
   
    // ============ updateCategory => start====================================
    async  updateCategoryItem(e) {

      e.preventDefault();


      try {
        this.isLoading = true;

        let imageUrlToSendWithObj = "";
        if (this.file) {
          await this.deleteImageFromStorage(this.imageUrl);

          imageUrlToSendWithObj = await this.uploadImage(this.file);
        }
        const obj = {
          name: this.categoryName,
          desc: this.description,
          id :this.id,
          availability: this.availability,

        };
        if (this.file) {
          obj.imgUrl = imageUrlToSendWithObj;
        }
        await this.updateCategory(obj);
        sweetalert({
          text: "updated",
          icon: "success",
        });
        this.isLoading = false;

      } catch (error) {
        sweetalert({
          text: "unupdated",
          icon: "error",
        });
        console.error(error);
        this.isLoading = false;

      }


    },

    // ============ updateCategory => end==========================================
  },
  mounted() {
    this.id = this.$route.params.id;
    const category = this.categories.find(category => category.id === this.id);
    if (category) {
      this.categoryName = category.name;
      this.description = category.desc;
      this.imageUrl = category.imgUrl;
      console.log(this.imageUrl)
      if( category.availability){
      this.availability = category.availability;
    }
    
    }

  },
};
</script>
<style scoped lang="scss">

// global style (add && Edit) view :- 
//  in sass folder


// scoped style :-
button {
    margin-right: 7px;
    border-radius: 5px;
    width: 70px;
    height: 30px;
    text-transform: capitalize;
    font-weight: bold;
    cursor: pointer;
  }
  .note {
    font-size: 15px;
    padding-left: 3px;
    color: rgb(181, 179, 179);
  }
  
  // input file
  input[type="file"]{
          font-size: 19px;
          background-color: white;
          border-radius: 5px;
          border: 2px solid rgb(198, 195, 195);
          width: 90%;
        }
        input[type="file"]::-webkit-file-upload-button{
          background-color: rgb(198, 195, 195);
          /* border-radius: 5px; */
          /* style goes here */
          border: none;
          width: 120px;
          height: 50px;
          cursor: pointer;
          margin-left:-7px ;
   }
  
</style>
