
<template>
    <div class="add">
      <div class="add_title">
        <p :class="{ 'dark-mode-title': getDarkMode }">Delete  {{ role =="clint" ? 'Clint': 'technical'}} </p>
      </div>
      <div :class="{ 'dark-moode': getDarkMode }" class="add_allContent add_allContent--edit">
        <div>
          <h3  v-if="shouldShowText"
            :class="{ 
              'dark-mode-title': getDarkMode, 
            }"
            class="warning-message" >
            <small class="moreSmall">please inter email and password for deleting</small> 
        </h3>
        <h3 v-else>are u sure ?</h3>
        </div>
      <ValidationObserver class="wraper-form" ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="Delete" class="add_allContent_cont-form add_allContent_cont-form--edit">
          <div class="cont-form_field Name">
            <ValidationProvider name="الاسم الاول" rules="required" v-slot="{ errors }">
              <label  :class="{ 'dark-mode-title': getDarkMode }">Full Name</label>
              <input readonly class="readOnlyInput" v-model="name" type="text" placeholder="Enter your name" required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="cont-form_field cont-form_field--Password">
            <ValidationProvider name=" كلمة السر" rules="required" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }"> Password</label>
              <input v-model="oldPassword" type="password" placeholder="Enter your old password" required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- <div class="cont-form_field cont-form_field--Password">
            <ValidationProvider name=" كلمة السر" rules="required" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }">Password</label>
              <input v-model="password" type="password" placeholder="Enter your password" required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div> -->
          <div class="cont-form_field  cont-form_field--Number">
            <ValidationProvider name=" رقم التليفون" rules="required|digits:11" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }">Number</label>
              <input readonly class="readOnlyInput" v-model="number" type="number" placeholder="Enter your number" required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="cont-form_field  cont-form_field--Email">
            <ValidationProvider name="الايميل" rules="required|email" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }"> Email</label>
              <input v-model="oldEmail" type="email" placeholder="Enter your old Email" required />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- <div class="cont-form_field  cont-form_field--Email">
            <ValidationProvider name="الايميل" rules="required|email" v-slot="{ errors }">
              <label :class="{ 'dark-mode-title': getDarkMode }">Email</label>
              <input v-model="email" type="email" placeholder="Enter your Email" required />
              <p class="note">You will be able to edit it later.</p>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div> -->
          <!-- <div class="cont-form_Image">
            <label>Image</label>
            <input  id="fileImage" class="filee readOnlyInput" type="file" @change="handleFileUpload" />
          </div> -->
          <div class="cont-form_btn">
            <router-link to="/dashboard/users/clintPages/Clint"><button type="button">Cancel</button></router-link>
            <button  class="delete-btn"   :class="{ 'disabled-btn': invalid }" :disabled="invalid" type="submit">Delete</button>
          </div>
        </form>
      </ValidationObserver>
      </div>
      <CircleLoader :show="isLoading" />

    </div>
  </template>
  
  <script>


// CircleLoader
import CircleLoader from '@/shared/components/loading/CircleLoader.vue';

import { extend } from 'vee-validate';
import { required,email,numeric,digits  } from 'vee-validate/dist/rules';

  // Register rules with custom messages

  extend('required', {
  ...required,
  message: '{_field_} مطلوب'
  
  });
  
  extend('email', {
  ...email,
  message: ' ادخل ايميل صالح'
  
  });
  extend('numeric', {
  ...numeric,
  message: ' ادخل  رقم من فضلك'
  
  });
  extend('digits', {
  ...digits,
  message: ' ادخل  رقم صحيح من فضلك'
  
  });

  import { mapActions, mapState } from 'pinia';
  import { useUserStore } from '@/store/auth/auth.js';
  import { useGetUserStore } from '@/store/users/users.js';
  
  export default {
    name: "deleteUser",
    data() {
      return {
        name: '',
        password: '',
        email: '',
        number:null,
        role:'',
        file: null, // for add picture
        profileImageURL:'',
        
        // old info
        oldEmail: '',
        oldPassword: '',

        // loading 
        isLoading: false,

      };
    },
    components: {
      CircleLoader,
    },
    computed: {
      ...mapState(useUserStore, ['user', 'role']),

      getDarkMode() {
        return false;
      },
      shouldShowText() {
      return !this.oldEmail || !this.oldPassword;
    }

    },
    methods: {
      ...mapActions(useUserStore, ['deleteUser', 'handleAuthStateChanged', 'uploadImage']),
      ...mapActions(useGetUserStore, ['fetchSingleUser']),

      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async Delete() {
          
          this.isLoading = true;
        try {
            await this.deleteUser({
            uid: this.userId,
            oldEmail: this.oldEmail,
            oldPassword: this.oldPassword,
            // newEmail: this.email,
            // newPassword: this.password,
            // name: this.name,
            // number: this.number,
            // profileImageURL: this.profileImageURL,
            });

           // if (this.file) {
            //await this.uploadImage({ uid: this.userId , file: this.file });
            //}
            
            this.$router.push({ name: 'Clint' });
            this.isLoading = false;

            // alert('User updated successfully!');
        } catch (error) {
            this.isLoading = false;
            // alert('Error deleting user: ' + error.message);
        }
        }

    },
   async created() {
        this.userId = this.$route.params.profileId;
        try {
        const userData = await this.fetchSingleUser(this.userId); 
        this.name = userData.name || ''; 
        this.role = userData.role || ''; 
        this.number = userData.number || '';
        this.oldEmail = userData.email || ''; 
        this.password = ''; 
        } catch (error) {
        alert('Error fetching user data: ' + error.message);
        }
    },
  };
  </script>
  
  <style scoped lang="scss">

  
// global style :-
//  scss folder => path ( formStyle - form )
.add {
  color: rgb(13, 12, 12);
  background-color: white;
}

.add_title {
  margin: 25px 0px ;
  
  }
  .note{
    margin-top: 10px;
  }

    </style>
  