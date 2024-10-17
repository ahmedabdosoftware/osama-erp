<template>
  <div class="skeleton-details">
    <div class="skeleton-details__header">
      <VueSkeletonLoader class="title" :width="'80%'" :height="'20px'" type="rect" animation="wave"/>
    </div>
    <div class="skeleton-details__info">
      <div class="skeleton-details__info__item">
        <VueSkeletonLoader class="line" :width="'50%'" :height="'15px'" type="rect" animation="wave"/>
        <VueSkeletonLoader class="line" :width="'40%'" :height="'15px'" type="rect" animation="wave"/>
      </div>
      <div class="skeleton-details__info__item">
        <VueSkeletonLoader class="line" :width="'50%'" :height="'15px'" type="rect" animation="wave"/>
        <VueSkeletonLoader class="line" :width="'40%'" :height="'15px'" type="rect" animation="wave"/>
      </div>
      <div class="skeleton-details__info__item">
        <VueSkeletonLoader class="line" :width="'50%'" :height="'15px'" type="rect" animation="wave"/>
        <VueSkeletonLoader class="line" :width="'40%'" :height="'15px'" type="rect" animation="wave"/>
      </div>
    </div>
    <div class="skeleton-details__table">
      <VueSkeletonLoader class="table-line" :width="'100%'" :height="'25px'" type="rect" animation="wave"/>
      <VueSkeletonLoader class="table-line" :width="'100%'" :height="'25px'" type="rect" animation="wave"/>
      <VueSkeletonLoader class="table-line" :width="'100%'" :height="'25px'" type="rect" animation="wave"/>
    </div>
    <div class="skeleton-details__image">
      <VueSkeletonLoader class="image" :width="'100%'" :height="'200px'" type="rect" animation="wave"/>
    </div>
    <div class="skeleton-details__note">
      <VueSkeletonLoader class="note" :width="'80%'" :height="'15px'" type="rect" animation="wave"/>
      <VueSkeletonLoader class="note" :width="'60%'" :height="'15px'" type="rect" animation="wave"/>
    </div>
  </div>
</template>

<script>
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  name: 'DetailsSkeletonLoader',
  components: {
    VueSkeletonLoader,
  },
};
</script>

<style scoped>
.skeleton-details {
  width: 85%;
  margin: auto;
  margin-top: 32px;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
}

.skeleton-details__header,
.skeleton-details__info__item,
.skeleton-details__table,
.skeleton-details__image,
.skeleton-details__note {
  margin-bottom: 20px;
}

.skeleton-details__info__item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.skeleton-details__table .table-line {
  margin-bottom: 10px;
}

.image {
  border-radius: 8px;
}
</style>
