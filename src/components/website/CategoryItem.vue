<template>
    <div class="category-item">
      <div class="circle">
        <img :src="category.imgUrl" alt="Category Image" />
        <div class="service-type">{{ category.availability }}</div>
      </div>
      <p>{{ category.name }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "CategoryItem",
    props: {
      category: Object
    }
  };
  </script>
  
  <style scoped>
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 35px;
    width: 200px;
    height: 200px;
  }
  
  .circle {
    position: relative;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../assets/images/deco-removebg.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  .circle img {
    width: 60%;
    height: 60%;
    border-radius: 50%;
  }
  
  .service-type {
    background-color: #254178;
    position: absolute;
    top: 5px;
    right: -10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    align-content:space-evenly;
  }
  
  p {
    margin-top: 10px;
    text-align: center;
  }
  </style>
  