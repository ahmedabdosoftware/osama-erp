<template>
    <div class="skeleton-table">
      <div class="skeleton-row header">
        <VueSkeletonLoader v-for="n in columns" :key="n" class="header-cell" :width="'100%'" :height="'40px'" type="rect" animation="wave" />
      </div>
      <div v-for="row in rows" :key="row" class="skeleton-row">
        <VueSkeletonLoader v-for="n in columns" :key="n" class="cell" :width="'100%'" :height="'15px'" type="rect" animation="wave" />
      </div>
    </div>
  </template>
  
  <script>
  import VueSkeletonLoader from 'skeleton-loader-vue';
  
  export default {
    name: 'SkeletonTable',
    components: {
      VueSkeletonLoader,
    },
    props: {
      columns: {
        type: Number,
        default: 6, 
      },
      rows: {
        type: Number,
        default: 5, 
      },
    },
  };
  </script>
  
  <style scoped>
  .skeleton-table {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .skeleton-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .header-cell {
    margin-bottom: 10px;
  }
  
  .cell {
    margin-bottom: 5px;
    flex: 1;
    margin-right: 10px;
  }
  
  .header-cell:last-child, .cell:last-child {
    margin-right: 0;
  }
  </style>
  