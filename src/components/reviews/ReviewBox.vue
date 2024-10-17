<template>
  <div class="firstReview">
    <div>
      <!-- <p>towhidur rahman</p> -->
      <img
        src="data:image/jpeg;base64,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"
      />
    </div>
    <div>
      <p>towhidur rahman</p>
      <p>Total purchases 1200$</p>
      <p>total reviews 12</p>
    </div>
    <div>
      <img
        class="starRev"
        src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
      />
      <img
        class="starRev"
        src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
      />
      <img
        class="starRev"
        src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
      />
      <img
        class="starRev"
        src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
      />
      <p>23-10-2023</p>
    </div>
    <div>
      <p>
        updated throughout the entire process. I had a question about the
        product, and their support team responded promptly and professionally.
        Overall, my experience with [Store Name] was outstanding, and I can't
        wait for my next purchase.
      </p>
    </div>
    <div>
      <div>
        <p>puplic commint</p>
      </div>
      <div>
        <p>direct message</p>
      </div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43kvGUBvK8hAfRMdMOQdLL5Fj_tXt7hUI5A&usqp=CAU"
        />
      </div>
    </div>
  </div>
</template>

<script></script>
<style scoped lang="scss">
.star {
  width: 20px;
  height: 20px;
  margin-left: -5px;
}
.starRev {
  width: 20px;
  height: 20px;
  margin-left: 0px;
  margin-bottom: 2px;
}
.contReviews {
  width: 100%;
  height: 500px;
  // background-color: aquamarine;
  display: flex;
  justify-content: center;
  > div {
    width: 90%;
    height: 240px;
    // background-color: darkorange;
  }
  > div:first-child {
    display: grid;
    grid-template-columns: repeat(10, 10%);
    grid-template-rows: repeat(10, 10%);
    // grid-template-areas:
    //   "img img info info . . star star star star star . "
    //   "img img info info . . review review review review review review "
    //   "img img info info . . review review review review review review "
    //   ". . . . . . review review review review review review "
    //   ". . . . . . review review review review review review "
    //   ". . . . . . review review review review review review "
    //   ". . . . . . review review review review review review "
    //   ". . . . . . conect conect conect conect conect conect ";
    > div:first-child {
      grid-area: 2/1/5/2;
      // width: 70%;
      // height: 80%;
      // background-color: rgb(184, 183, 183);
      display: flex;
      justify-content: flex-end;
      img {
        width: 90px;
        height: 70px;
      }
    }
    > div:nth-child(2) {
      // grid-area: info;
      grid-area: 2/2/5/5;
      // background-color: seagreen;
      text-transform: capitalize;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      // width: 70%;
      // height: 80%;
      p:first-child {
        font-weight: 600;
        font-size: 18px;
        padding-left: 6px;
      }
      p:nth-child(2),
      p:nth-child(3) {
        font-weight: 600;
        color: rgb(164, 164, 162);
        padding-left: 6px;
      }
    }
    > div:nth-child(3) {
      grid-area: 2/5/4/7;
      font-weight: 600;
      // background-color: rgb(153, 182, 173);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: rgb(164, 164, 162);
    }
    > div:nth-child(4) {
      // grid-area: review;
      grid-area: 4/5/10/10;
      // background-color: rgb(160, 45, 110);
      text-transform: capitalize;
      font-size: 18px;
      color: rgb(164, 164, 162);
      p {
        text-align: start;
      }
    }
    > div:nth-child(5) {
      grid-area: 10/5/12/10;
      // grid-area: conect;
      // background-color: salmon;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      div:first-child,
      div:nth-child(2) {
        width: 160px;
        height: 30px;
        border: 1px solid rgb(203, 202, 202);
        text-align: center;
        line-height: 30px;
        font-weight: 600;
        text-transform: capitalize;
        border-radius: 4px;
      }
      div:nth-child(3) {
        width: 40px;
        border-radius: 4px;
        height: 30px;
        border: 1px solid rgb(203, 202, 202);
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
          height: 20px;
        }
      }
    }
  }
}
</style>
