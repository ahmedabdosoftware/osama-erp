<template>
    <div class="statistics_result" :class="{'statistics_result--nonPaid': isNonPaid}">
      <div>
        <font-awesome-icon class="iconAwesome" :icon="icon" />
      </div>
      <div>
        <p class="title">{{ title }}</p>
        <slot>
          <!-- المحتوى الافتراضي  -->
          <span>{{ value }}</span>
        </slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number],
        default: ''
      },
      isNonPaid: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>


  
<style scoped lang="scss">

%center{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}


.statistics_result{
   width: 220px;
   min-height: 100px;
   background-color: rgb(240, 237, 237);
   
   border-radius: 8px;
   margin: 15px 0px;
   display: flex;

   >div:first-child{
      width: 60px;
      height: 100px;
     // background-color: red;
     @extend %center;
  }
  >div:nth-child(2){
      width: 160px;
      height: 100px;
     // background-color: blue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      p,span{
          font: {
              size: 19px;
              weight: 600;
          }
          color: rgb(49, 48, 48);
          padding-right: 5px;
      }
      p{
          color: rgb(109, 108, 108);
          margin-bottom: 10px;
          font-size: 14px;
      }
   }
   
}

.iconAwesome{
  width: 40px;
  height: 40px;
}
.title{
    align-items: center;
    width: 100%;
    height: 40px !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}

@media (max-width: 477px){
  

  .statistics_result{
      margin: 15px;
      width: 250px;
      height: 100px;
      background-color: white;
  }
  .statistics_result--nonPaid{
    width: 250px;
  }
  .iconAwesome{
      width: 30px;
      height: 30px;
  }
}

</style>


