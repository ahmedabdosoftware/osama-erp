<template>
  <div class="reviews">
    <div class="moveToShop">
      <div class="contTitle">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmm3AQQCvFDSZUj4-3CyRkHHlL5Ep4-xwUA&usqp=CAU"
          />
        </div>
        <p :class="{ 'dark-mode-title': getDarkMode }">reviews grid</p>
      </div>
      <button class="viewShop">view shop</button>
    </div>
    <div :class="{ 'dark-mode-box': getDarkMode }" class="info-review">
      <div :class="{ 'dark-mode-box': getDarkMode }">
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">reviews</p>
        </div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">total reviews</p>
        </div>
        <div>
          <div>
            <span :class="{ 'dark-mode-title': getDarkMode }">10.0k</span>
            <span>July</span>
          </div>
          <div>
            <p  class="reviewsLastMonth">reviews until last month</p>
          </div>
        </div>
      </div>
      <div :class="{ 'dark-mode-box': getDarkMode }">
        <div></div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">average rating</p>
        </div>
        <div>
          <div>
            <span :class="{ 'dark-mode-title': getDarkMode }" class="rate"
              >4.0</span
            >
            <div>
              <span>
                <img
                  class="star"
                  src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
                />
              </span>

              <span>
                <img
                  class="star"
                  src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
                />
              </span>

              <span>
                <img
                  class="star"
                  src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
                />
              </span>

              <span>
                <img
                  class="star"
                  src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
                />
              </span>
            </div>
          </div>
          <div>
            <p class="rating">rating until last month</p>
          </div>
        </div>
      </div>
      <div :class="{ 'dark-mode-box': getDarkMode }">
        <div>
          <div>
            <p class="date" :class="{ 'dark-mode-title': getDarkMode }">
              February 2022.july 2023
            </p>
          </div>
        </div>
        <div>
          <!-- Indicator -->
          <div>
            <span></span>
            <span :class="{ 'dark-mode-title': getDarkMode }">1</span>
            <div></div>
            <span :class="{ 'dark-mode-title': getDarkMode }">80%</span>
          </div>
          <div>
            <span></span>
            <span :class="{ 'dark-mode-title': getDarkMode }">2</span>
            <div></div>
            <span :class="{ 'dark-mode-title': getDarkMode }">48%</span>
          </div>
          <div>
            <span></span>
            <span :class="{ 'dark-mode-title': getDarkMode }">3</span>
            <div></div>
            <span :class="{ 'dark-mode-title': getDarkMode }">22%</span>
          </div>
          <div>
            <span></span>
            <span :class="{ 'dark-mode-title': getDarkMode }">4</span>
            <div></div>
            <span :class="{ 'dark-mode-title': getDarkMode }">10%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="contReviews" :class="{ 'dark-mode-box': getDarkMode }">
      <div :class="{ 'dark-mode-box': getDarkMode }" class="">
        <div>
          <!-- <p>towhidur rahman</p> -->
          <img
            src="data:image/jpeg;base64,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"
          />
        </div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">towhidur rahman</p>
          <p>Total purchases 1200$</p>
          <p>total reviews 12</p>
        </div>
        <div>
          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <p>23-10-2023</p>
        </div>
        <div>
          <p>
            updated throughout the entire process. I had a question about the
            product, and their support team responded promptly and
            professionally. Overall, my experience with [Store Name] was
            outstanding, and I can't wait for my next purchase.
          </p>
        </div>
        <div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">puplic commint</p>
          </div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">direct message</p>
          </div>
          <div :class="{ 'dark-mode-white': getDarkMode }">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43kvGUBvK8hAfRMdMOQdLL5Fj_tXt7hUI5A&usqp=CAU"
            />
          </div>
        </div>
      </div>
      <div class="">
        <div>
          <!-- <p>towhidur rahman</p> -->
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTm0qy1hfpWWmK21gtFjbcAxTamCyVt4sQGw&usqp=CAU"
          />
        </div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">ahmed mohsen</p>
          <p>Total purchases 600$</p>
          <p>total reviews 1</p>
        </div>
        <div>
          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <p>23-10-2023</p>
        </div>
        <div>
          <p>
            updated throughout the entire process. I had a question about the
            product, and their support team responded promptly and
            professionally. Overall, my experience with [Store Name] was
            outstanding, and I can't wait for my next purchase.
          </p>
        </div>
        <div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">puplic commint</p>
          </div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">direct message</p>
          </div>
          <div :class="{ 'dark-mode-white': getDarkMode }">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43kvGUBvK8hAfRMdMOQdLL5Fj_tXt7hUI5A&usqp=CAU"
            />
          </div>
        </div>
      </div>
      <div class="">
        <div>
          <!-- <p>towhidur rahman</p> -->
          <img
            src="data:image/jpeg;base64,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"
          />
        </div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">said khalaf</p>
          <p>Total purchases 400$</p>
          <p>total reviews 7</p>
        </div>
        <div>
          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <p>23-10-2023</p>
        </div>
        <div>
          <p>
            updated throughout the entire process. I had a question about the
            product, and their support team responded promptly and
            professionally. Overall, my experience with [Store Name] was
            outstanding, and I can't wait for my next purchase.
          </p>
        </div>
        <div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">puplic commint</p>
          </div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">direct message</p>
          </div>
          <div :class="{ 'dark-mode-white': getDarkMode }">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43kvGUBvK8hAfRMdMOQdLL5Fj_tXt7hUI5A&usqp=CAU"
            />
          </div>
        </div>
      </div>
      <div class="">
        <div>
          <!-- <p>towhidur rahman</p> -->
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO3A4SB_bVvw2Vxc9hun6vynQgbnQWuwgyJg&usqp=CAU"
          />
        </div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">abdelsatar ali</p>
          <p>Total purchases 340$</p>
          <p>total reviews 9</p>
        </div>
        <div>
          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>
          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <p>23-10-2023</p>
        </div>
        <div>
          <p>
            updated throughout the entire process. I had a question about the
            product, and their support team responded promptly and
            professionally. Overall, my experience with [Store Name] was
            outstanding, and I can't wait for my next purchase.
          </p>
        </div>
        <div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">puplic commint</p>
          </div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">direct message</p>
          </div>
          <div :class="{ 'dark-mode-white': getDarkMode }">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43kvGUBvK8hAfRMdMOQdLL5Fj_tXt7hUI5A&usqp=CAU"
            />
          </div>
        </div>
      </div>
      <div class="">
        <div>
          <!-- <p>towhidur rahman</p> -->
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl6yj4gfcwZQjS-QEbDOSJ5-vNM7fIemBm-g&usqp=CAU"
          />
        </div>
        <div>
          <p :class="{ 'dark-mode-title': getDarkMode }">ali mohamed</p>
          <p>Total purchases 562$</p>
          <p>total reviews 26</p>
        </div>
        <div>
          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <span>
            <img
              class="starRev"
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg"
            />
          </span>

          <p>23-10-2023</p>
        </div>
        <div>
          <p>
            updated throughout the entire process. I had a question about the
            product, and their support team responded promptly and
            professionally. Overall, my experience with [Store Name] was
            outstanding, and I can't wait for my next purchase.
          </p>
        </div>
        <div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">puplic commint</p>
          </div>
          <div>
            <p :class="{ 'dark-mode-title': getDarkMode }">direct message</p>
          </div>
          <div :class="{ 'dark-mode-white': getDarkMode }">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43kvGUBvK8hAfRMdMOQdLL5Fj_tXt7hUI5A&usqp=CAU"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reviews",
  computed: {
    getDarkMode() {
      return this.$store.state.darkMode;
    },
  },
};
</script>
<style scoped lang="scss">
.reviews {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  // background-color: #f9f7f7;
}
.contTitle {
  background-color: blue;
  height: 40px;
  width: 190px;
  display: flex;
  align-items: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  div {
    width: 35px;
    height: 35px;
    border-radius: 17.5px;
    margin-left: 10px;
    background-color: white;

    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-transform: capitalize;
    text-align: center;
    margin-left: 20px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin-right: 10px;
  }
}
.moveToShop {
  width: 100%;
  height: 70px;
  // background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.viewShop {
  width: 90px;
  height: 30px;
  background-color: var(--popularCalar);
  // background-color: blue;
  color: white;
  margin-right: 10px;
  border-radius: 3px;
  text-transform: capitalize;
  font-weight: 600;
  // border: 2px solid rgb(185, 185, 184);
  cursor: pointer;
  border-radius: 5px;
}
.info-review {
  width: 90%;
  height: 300px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 5px solid rgb(203, 202, 202);
  // border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  // background-color: red;
}
.info-review > div {
  width: 30%;
  height: 86%;
  // background-color: rgb(75, 201, 86);
  background-color: white;
  position: relative;
  //   margin-bottom: 60px;
}
.info-review > div:first-child::after,
.info-review > div:nth-of-type(2)::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 60px;
  width: 4px;
  height: 90px;
  background-color: rgb(203, 202, 202);
}
.info-review > div:first-child,
.info-review > div:nth-of-type(2) {
  > div:first-child {
    width: 100%;
    height: 40%;
    //background-color: darkgreen;
    text-align: center;
    line-height: 75px;
    font-size: 30px;
    font-weight: 600;
    text-transform: capitalize;
    p {
      margin-right: 65px;
    }
  }
  > div:nth-of-type(2) {
    width: 100%;
    height: 15%;
    // background-color: salmon;
    text-align: center;
    line-height: 35px;
    font-weight: 600;
    text-transform: capitalize;
    p {
      margin-right: 86px;
    }
  }
  > div:nth-of-type(3) {
    width: 100%;
    height: 40%;
    // background-color: saddlebrown;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      height: 40%;
        // background-color: darkkhaki;
    }
    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      div {
        width: 40%;
        height: 80%;
        // background-color: fuchsia;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-right: 60px;
        span{
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 3px;
        }
      }
      .rate {
        margin-left: 55px !important;
      }
      > span:first-child {
        font-size: 30px;
        font-weight: 600;
      }
      > span:nth-of-type(2) {
        width: 55px;
        height: 30px;
        background-color: var(--popularCalar);
        // background-color: blue;
        border-radius: 3px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        font-weight: 600;
        color: white;
      }
    }
    div:nth-of-type(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      text-transform: capitalize;
      color: rgb(187, 188, 189);
      // background-color: blue;
      .rating {
        margin-right: 15px;
      }
    }
  }
}
.star {
  width: 20px;
  height: 20px;
  // margin-left: -5px;
}
.starRev {
  width: 20px;
  height: 20px;
  margin-left: 0px;
  margin-bottom: 2px;
}
.info-review > div:nth-of-type(3) {
  > div:first-child {
    width: 100%;
    height: 40%;
    // background-color: salmon;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 70%;
      height: 40px;
      border: 2px solid rgb(185, 185, 184);
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
      margin-bottom: 20px;
      // background-color: seagreen;
      font-weight: 600;
    }
  }

  > div:nth-of-type(2) {
    // background-color: seagreen;
    width: 100%;
    height: 55%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > div {
      width: 60%;
      height: 30px;
      //   background-color: red;
      display: flex;
      align-items: center;
      > div {
        width: 60%;
        height: 13px;
        background-color: var(--popularCalar);
        // background-color: blue;
        margin-left: 6px;
        border-radius: 3px;
      }
      span:first-child {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: rgb(112, 112, 112);
      }
      span:nth-of-type(3) {
        margin-left: 6px;
      }
    }
    > div:nth-of-type(2) {
      div {
        background-color: blueviolet;
        width: 40%;
      }
    }
    > div:nth-of-type(3) {
      div {
        background-color: aqua;
        width: 20%;
      }
    }
    > div:nth-of-type(4) {
      div {
        background-color: salmon;
        width: 5%;
      }
    }
  }
}
.contReviews {
  width: 90%;
  min-height: 500px;
  background-color: white;
  // background-color:salmon;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  > div {
    // background-color: darkblue;
    width: 90%;
    height: 270px;
    position: relative;
    margin-bottom: 20px;
    // border: 2px solid rgb(185, 185, 184);
  }
  > div::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 0px;
    width: 100%;
    height: 2px;
    background-color: rgb(185, 185, 184);
  }
  > div {
    // background-color: white;
    display: grid;
    grid-template-columns: repeat(10,10%);
    grid-template-rows: repeat(10, 10%);
    > div:first-child {
      grid-area: 2/1/5/2;
      display: flex;
      justify-content: flex-end;
      background-color: white;
      img {
        width: 100%;
        height: 100%;
      }
    }
    > div:nth-child(2) {
      grid-area: 2/2/5/5;
      // background-color: seagreen;
      text-transform: capitalize;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      p:first-child {
        font-weight: 600;
        font-size: 18px;
        padding-left: 6px;
      }
      p:nth-child(3) {
        margin-bottom: 19px;
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
      // background-color: sienna;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: rgb(164, 164, 162);
      span {
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 3px;
        .starRev {
          width: 20px;
          height: 20px;
        }
      }
    }
    > div:nth-child(4) {
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

.dark-mode {
  background-color: rgb(9, 9, 9) !important;
}
.dark-mode-title {
  color: white !important;
}
.dark-mode-white {
  background-color: white !important;
}
.dark-mode-box {
  background-color: black !important;
  box-shadow: 0 0 5px rgb(17, 16, 16);
}
// ipad
@media (max-width: 821px) {
  .info-review > div:nth-of-type(3) {
  > div:first-child {
    > div {
      width: 100% !important;
    }
 }
}

.contReviews {
  > div {
    > div:nth-child(3) {
      grid-area: 2/5/4/9;
    }
    > div:nth-child(5) {
      grid-area: 10/5/12/11;
}
}
}
}
// phone
@media (max-width: 477px) {
  .info-review {
    width: 100%;
  height: 600px;
  flex-wrap: wrap;
}
.info-review > div {
  width: 50%;
  height: 270px;
}
.info-review > div:nth-of-type(3){
  width: 70%;
}

.info-review > div:nth-of-type(2)::after {
  background-color:white !important;
}
.info-review > div:first-child,
.info-review > div:nth-of-type(2){

> div:first-child {
    p {
      margin-right: 0px;
      // background-color: darksalmon;
    }
  }
  > div:nth-of-type(2) {
    p {
      margin-right: 0px;
      // background-color: red;
    }
  }
  > div:nth-of-type(3) {
    > div:first-child {
      div {
        margin-right: 0px;
        // background-color: rgb(39, 130, 50);
      }
      .rate {
        margin-left: 0px !important;
        // background-color: rgb(13, 38, 128);
      }
    }

    }
  }

  .rating{
    margin-left:10px;
    // background-color:salmon;
  }
  .reviewsLastMonth{
    padding-left: 17px;
    // background-color:salmon;
  }
  .contReviews {
    width: 100%;
  > div {
    height: 400px !important;
    width: 100%;
    grid-template-columns: repeat(11,9%);
  }
 
  > div {
    >div:first-child{
      grid-area: 2/1/7/3;
    }
    > div:nth-child(2) {
      grid-area: 2/3/7/6;
      p:first-child {
        padding-left: 5px
      }
      p:nth-child(3) {
        margin-bottom: 0px;
      }
      p:nth-child(2),
      p:nth-child(3) {
        padding-left: 5px;
      }
    }
    > div:nth-child(3) {
      grid-area: 2/6/3/12;
    }
    > div:nth-child(4) {
      grid-area: 3/6/10/12;
    }
    > div:nth-child(5) {
      grid-area: 10/6/12/12;
      div:first-child,
      div:nth-child(2) {
        width: 60px;
        font-weight: 500;
        height: 30px;
        p{
          font-size: 9px !important;
          text-align: center;
          line-height: 30px;
          text-transform: capitalize;
        }

      }
    }
  }
}



}




</style>
