<template>
    <div class="categories-list">
      <CategoryItem v-for="category in categories" :key="category.id" :category="category" />
    </div>
  </template>
  
  <script>
  import CategoryItem from './CategoryItem.vue';
  import { mapState, mapActions } from 'pinia';
  import { useCategoriesStore } from '@/store/categories/categories.js';
  
  export default {
    name: "CategoriesList",
    components: {
      CategoryItem
    },
    computed: {
      ...mapState(useCategoriesStore, ['categories'])
    },
    created() {
    this.fetchCategories();
    },
    methods: {
        ...mapActions(useCategoriesStore, ['fetchCategories']),
    }
    };
  </script>
  
  <style scoped>
  .categories-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
 
    
  }

  @media(max-width:450px){
    .categories-list{
      margin-top: -75px;
    }
  }
  </style>
  