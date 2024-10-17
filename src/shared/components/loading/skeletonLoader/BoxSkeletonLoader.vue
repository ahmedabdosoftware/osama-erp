<template>
    <div class="skeleton-box">
      <VueSkeletonLoader class="image" :width="'100%'" :height="'200px'" type="rect" animation="wave"/>
      <VueSkeletonLoader class="title" :width="'70%'" :height="'20px'" type="rect" animation="wave"/>
      <VueSkeletonLoader class="description" :width="'90%'" :height="'15px'" type="rect" animation="wave"/>
      <VueSkeletonLoader class="description" :width="'80%'" :height="'15px'" type="rect" animation="wave"/>
    </div>
  </template>
  
  <script>
  import VueSkeletonLoader from 'skeleton-loader-vue';
  
  export default {
    name: 'BoxSkeletonLoader',
    components: {
      VueSkeletonLoader,
    }
  };
  </script>
  
  <style scoped>
  .skeleton-box {
    width: 300px;
    height: 380px;
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
  .image {
    margin-bottom: 15px;
  }
  .title, .description {
    margin-bottom: 10px;
  }
  </style>
  