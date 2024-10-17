<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <div class="addProduct">
      <div class="title">
        <p :class="{ 'dark-mode-title': getDarkMode }">create product</p>
      </div>
      <div :class="{ 'dark-moode': getDarkMode }" class="allContentt">
        <form class="cont-form" @submit.prevent="creatNewProduct">
          <div class="name">
            <label :class="{ 'dark-mode-title': getDarkMode }">product title</label>
            <ValidationProvider
              name="Product Title"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                v-model="productTitle"
                type="text"
                placeholder="title product"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="description">
            <label :class="{ 'dark-mode-title': getDarkMode }">description</label>
            <ValidationProvider
              name="Description"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                v-model="description"
                type="text"
                placeholder="description product"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <p class="note">you will be able to edit it later.</p>
          </div>
          
          <div class="imgeCont">
            <ValidationProvider
              name="Image"
              rules="required|image"
              v-slot="{ errors }"
            >
              <input
                v-on:change.prevent="pushOnArray()"
                id="inputField"
                type="file"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="uploadCont uploadContImge">
              <img id="up" class="upload" v-bind:src="imageUrl[0]" />
            </div>
            <div class="uploadCont uploadContImge">
              <img id="up" class="upload" v-bind:src="imageUrl[1]" />
            </div>
            <div class="uploadCont uploadContImge">
              <img id="up" class="upload" v-bind:src="imageUrl[2]" />
            </div>
            <div v-on:click.prevent="uploadFile()" id="btn" class="uploadCont uploadImge">
              <img
                class="upload"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQN9NvIcWwtddjv-IerO_kox9AJ0cCFU2Ew&usqp=CAU"
              />
              <span class="upUnderImge">upload</span>
            </div>
          </div>
          <div class="tags">
            <label>tags</label>
            <input v-model="tags" type="text" placeholder="enter tags" />
          </div>
          <div class="contCatoSup">
            <div class="cato">
              <label :class="{ 'dark-mode-title': getDarkMode }">category</label>
                <select v-model="selectedCategoryId">
                  <option v-for="category in categories" :value="category.id" :key="category.id">
                    {{ category.name }}
                  </option>
                </select>
            </div>
            <div class="cato">
              <label :class="{ 'dark-mode-title': getDarkMode }">unit</label>
                <select v-model="selectedUnitId" @change="fetchUnitName">
                  <option v-for="unit in units" :value="unit.id" :key="unit.id">
                    {{ unit.name }}
                  </option>
                </select>
            </div>
          </div>
          <div class="contPrice">
            <div class="price">
              <label :class="{ 'dark-mode-title': getDarkMode }">price Material</label>
              <ValidationProvider
                name="Price Material"
                rules="required|double:1|min_value:0"
                v-slot="{ errors }"
              >
                <input v-model="priceMaterial" placeholder="type here" type="text" />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <label :class="{ 'dark-mode-title': getDarkMode }">price With Labor </label>
              <ValidationProvider
                name="Price With Labor"
                rules="required|double:1|min_value:0"
                v-slot="{ errors }"
              >
                <input v-model="priceWithLabor" placeholder="type here" type="text" />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="price offer">
              <label :class="{ 'dark-mode-title': getDarkMode }">offer price (optionally)</label>
              <ValidationProvider
                name="Offer Price"
                rules="double:1|min_value:0"
                v-slot="{ errors }"
              >
                <input v-model="offerPrice" placeholder="type here" type="text" />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <label :class="{ 'dark-mode-title': getDarkMode }">buy price </label>
              <ValidationProvider
                name="buy Price"
                rules="double:1|min_value:0"
                v-slot="{ errors }"
              > 
                <input v-model="buyPrice" placeholder="type here" type="text" />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="puplish-allCont">
            <div class="price-options">
              <label>
                <input type="checkbox" v-model="showLaborPrice" />
                Show Labor Price on Site
              </label>
            </div>
            <div class="display-options">
              <label>
                <input type="checkbox" v-model="displayOnSite" />
                Display Product on Site
              </label>
            </div>
          </div>
          <div class="submit_cont">
            <button class="submit" :class="{ 'disabled-btn': invalid }" :disabled="invalid" @click="creatNewProduct">submit item</button>
          </div>
        </form>
      </div>
      <CircleLoader :show="isLoading" />

    </div>
  </ValidationObserver>
</template>

<script>

import { required, double, min_value, image } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

// Register rules with custom messages
    extend('required', {
      ...required,
      message: '{_field_} is required to create a product.'
    });
    extend('double', {
      ...double,
      message: '{_field_} must be a number.'
    });
    extend('min_value', {
      ...min_value,
      message: '{_field_} must be at least {min}.'
    });
    extend('image', {
      ...image,
      message: '{_field_} must be a valid image file.'
    });

// actions 
import { mapActions , mapState } from 'pinia'

// CircleLoader
import CircleLoader from '@/shared/components/loading/CircleLoader.vue';

//store
import { useProductsStore } from '@/store/products/products.js'
import { useCategoriesStore } from '@/store/categories/categories.js';
import { useUnitsStore } from '@/store/products/units/units.js';

// sweetalert 
import sweetalert from "sweetalert";

export default {
  name: "AddNewProduct",
  components: {
    CircleLoader,
  },
  data() {
    return {
      productTitle: "",
      description: "",
      imageUrl: [],
      tags: "",
      priceMaterial: "",
      priceWithLabor: "",
      offerPrice:"",
      buyPrice:"",
      
      showLaborPrice: false,
      displayOnSite: true,
      selectedCategoryId:'',
      selectedUnitId:'',
      unitName:'',
      // loading 
      isLoading: false

    };
  },
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },

    ...mapState(useCategoriesStore, ['categories']),
    ...mapState(useUnitsStore, ['units']),


  },
  async created() {
    await this.fetchCategories();
    this.selectedCategoryId =  this.categories[0].id
    await this.fetchUnits();
    this.selectedUnitId =  this.units[0].id
    this.unitName =  this.units[0]
   

  },
  methods: {
    // ============ my actions => start =============================================

    ...mapActions( useProductsStore, ['addProduct', 'uploadImage']),
    ...mapActions(useCategoriesStore, ['fetchCategories']),
    ...mapActions(useUnitsStore, ['fetchUnits']),  


    // ============ my actions => end ==============================================
   

    fetchUnitName(){
      const unit = this.units.find(unit => unit.id === this.selectedUnitId);
        if(unit){

          this.unitName= unit
        }
    },

    // ============ FileReader  for show the selected image localy before upload => start =============================================
      pushOnArray: function () {


      const file = event.target.files[0];
      if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrll = e.target.result;
        this.imageUrl.push(imageUrll);
      };
      reader.readAsDataURL(file);
      }



      },



// ============ push On Array after make url from file => end=============================================


    // ============ FileReader for show the selected image localy before upload => end ==============================================

    uploadFile() {
      document.getElementById("inputField").click();
    },

    // ============ creat New Product => start =====================================

    async creatNewProduct(e) {
      e.preventDefault();
      try {
        this.isLoading = true;
        if (this.imageUrl.length > 0) {
          console.log(this.imageUrl[0])
          
          const downloadURL = await this.uploadImage(this.imageUrl[0]);
          console.log(downloadURL)
          let obj = {
            name: this.productTitle,
            priceMaterial: parseFloat(this.priceMaterial),
            priceWithLabor: parseFloat(this.priceWithLabor),
            offerPrice: parseFloat(this.offerPrice),
            buyPrice: parseFloat(this.buyPrice),
            description: this.description,
            categoryId: this.selectedCategoryId,
            unitId: this.selectedUnitId,
            unitName: this.unitName,
            imageUrl: downloadURL,
            showLaborPrice: this.showLaborPrice,
            displayOnSite: this.displayOnSite,
          };
          await this.addProduct(obj);
          sweetalert({
            text: "created",
            icon: "success",
          });
          this.isLoading = false;

        }
      } catch (error) {
        sweetalert({
          text: "uncreated",
          icon: "error",
        });
        console.log(error);
        this.isLoading = false;

      }
    },

    // ============ creat New Product => end =======================================
    


  },

};
</script>
<style scoped lang="scss">
.addProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 13px;
  //background-color: aqua;
}
.title {
  width: 470px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    text-transform: capitalize;
    font-size: 22px;
    font-weight: 600;
  }
}
.allContentt {
  width: 470px;
  display: flex;
  flex-wrap: wrap;
  height: 740px;
  background-color: white;
  border-radius: 10px;
  border: solid 1px rgb(181, 179, 179);
}
.allContentt form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-evenly;
  > div {
    width: 100%;
  }
  > div:nth-child(1) {
    margin-top: 20px;
  }
  > div:nth-child(7),
  
 .submit_cont {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 40px !important;
    button {
      width: 30% ;
      height: 90%;
      background-color: blue;
      text-transform: capitalize;
      color: white;
      margin-left: 22px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  > div:nth-child(6) {
    height: 19% !important;
    //background-color: aqua;
    
    .type {
      height: 50%;
      select {
        margin-top: 23px;
      }
    }
  }
  > .contCatoSup,
  > div:nth-child(6) {
    padding-left: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
     div {
      display: flex;
      flex-wrap: wrap;
      align-content: space-evenly;
      width: 49%;
      height: 90%;
       select,
       input {
        width: 90%;
        border-radius: 5px;
      }
    }
  }
  .name,
  .description,
  .tags {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 20px;
    input {
      width: 90%;
      height: 25px;
      border-radius: 5px;
    }
  }
}
.allContentt form > div:nth-child(2),
.allContentt form > div:nth-child(3) {
  height: 15%;
}
.allContentt
  form
  > div:not(
    .allContentt form > div:nth-child(2),
    .allContentt form > div:nth-child(3)
  ) {
  height: 10%;
}
.description {
  input {
    height: 45px  !important;
  }
}
.puplish-allCont{
  width: 100% !important;
  padding-left: 10px;
  >div{
  margin-left: 10px;

  }
}
.name,
.tags,
.cato,
.price,
.sup {
  input:focus {
    outline: none;
  }
  input,
  select {
    height: 30px;
  }
}
input[type="file"] {
  border: 2px solid rgb(198, 195, 195);
  width: 90%;
  display: none;
}

.imgeCont {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > .uploadCont {
    background-color: rgb(181, 179, 179);
    border-radius: 5px;
    width: 20% !important;
    height: 80%;
    > button {
      background-color: rgb(181, 179, 179);
      font-size: 19px;
      width: 70px;
      height: 40px;
    }
  }

  > .uploadContImge {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: solid rgb(181, 179, 179) 1px;
  }
  > .uploadImge {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-evenly;
  }
}

.upload {
  width: 50px;
  height: 40%;
}

.disabled-btn{
opacity: 0.4;
cursor:not-allowed;
}
#up {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.upUnderImge {
  text-transform: capitalize;
}

// phone
@media (max-width: 477px) {
  .title {
    p {
      margin-left: 60px;
    }
  }
  .allContentt {
    width: 370px !important;
  }
  .puplish-allCont,.price{
  font-size: 14px;
}
}
// phone max-width:365px
@media(max-width:365px){
      
      .allContentt {
        width: 350px !important;
        }
        .title {
          width: 350px;
      }    
      .allContentt form {
      }                                     
      }                                     
</style>
