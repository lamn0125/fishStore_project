<template>
  <div class="banner">
  <div class="discount-banner">
    <p class="discount-text">GET 20% OFF DISCOUNT BY ENTERING <span>fishshop2023</span></p>
  </div>
    <div class="banner-header">
      <slot></slot>
    </div>
  </div>
  <div class="black"></div>
</template>

<style lang="scss">
.discount-banner {
  width: 100%;
  position: relative;
  z-index: 100;
  background-color: #000;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  height: 50px;
  .discount-text {
    animation: discountBanner 3s infinite;
    line-height: 50px;
    color: #FFF;
    span {
      font-weight: 700;
      color: rgb(255, 0, 0);
    }
    &:hover {
      animation: none;
    }
  }
}
@keyframes discountBanner {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.banner {
  padding-top: 80px;
  background-image: url('@/assets/images/Main-Banner.jpg');
  width: 100%;
  height: 70vh;
  background-position: 50% 40%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  opacity: 0.7;
}
.banner-header {
  font-size: 3.5rem;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%);
  p {
    color: rgb(5, 5, 121);
    font-weight: 600;
    box-shadow: 1px 10px 5px 0px rgba(0, 0, 0, 0.75);
  }
}
.black {
  background-color: #000;
  width: 100%;
  height: 70vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -10;
}
</style>
