<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1 class="main-heading">ABOUT US</h1>
  <div class="base-container">
    <div class="about-content">
      <div class="content-title" data-aos="fade-zoom-in" >
        <h1 class="text-title">THE Taiwan'S NO.1 ONLINE FISHMONGER</h1>
        <p class="text-desc">Local fishmongers are great, but where are they? Supermarkets have fish, but it doesn't make the cut! The best fish? We've got you. </p>
        <p>Our speciality is the wide range of fish that we supply (usually over 400 seafood lines). We can work with you to supply a range to suit your menu, event or shop range. </p>
      </div>
      <div class="content-image" data-aos="fade-left">
        <img src="https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"/>
      </div>

      <div class="content-title content-center-text" data-aos="fade-zoom-in" >
        <h1 class="text-title" >FISH DELIVERY</h1>
        <p class="text-desc">To keep your fish cold en route, we use dry ice, thermal packaging and fast delivery. Most shipments arrive frozen but even if defrosted, when you open your box your fish will be at a very low temperature suitable to put in your freezer. </p>
      </div>
      <div class="content-image content-center-img" data-aos="fade-right" >
        <img src="https://images.unsplash.com/photo-1601314212732-047d4bdffd22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"/>
      </div>

      <div class="content-title" data-aos="fade-zoom-in" >
        <h1 class="text-title">WHOLESALE INFO</h1>
        <p class="text-desc">The Fish Society has been selling high-quality seafood to customers nationwide for over 25 years. Whilst our primary customer is the individual in their own home we also supply restaurants, caterers and retailers. </p>
      </div>
      <div class="content-image" data-aos="fade-left">
        <img src="https://images.unsplash.com/photo-1636797600090-146b191714cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"/>
      </div>

    </div>
    <div class="about-container">
      <div class="about-wrapper" data-aos="flip-left">
        <i class="bi bi-clock"></i>
        <h4 class="about-title">Opening Hour</h4>
        <p>Tue ~ Thu : 10:00 - 07:00PM</p>
        <p>Fri ~ Sun : 10:00 - 09:00PM</p>
        <p>Mon : Closed</p>
      </div>

      <div class="about-wrapper" data-aos="flip-left" >
        <i class="bi bi-geo-alt"></i>
        <h4 class="about-title">Location</h4>
        <p>No.283, Hello Street, Dist West,</p>
        <p>Taipei, Taiwan</p>
      </div>

      <div class="about-wrapper" data-aos="flip-left">
        <i class="bi bi-truck"></i>
        <h4 class="about-title">DELIVERY</h4>
        <p>Frozen under -4°C</p>
        <p>Next Day delivery</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-content {
  background-color: $container-color;
  text-align: center;
  line-height: 2rem;
  padding: 20px;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, minmax(500px 700px));
  margin: 3rem 0;
  .content-title {
    grid-column: 1/ 2;
    font-size: 1.3rem;
    .text-title {
      font-weight: 700;
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
  .content-image{
    grid-column: 2/3;
    overflow: hidden;
    img {
      width: 70%;
      height: 70%;
      object-fit: cover;
    }
  }
  .content-center-text{
    grid-column: 2/ 3;
    grid-row: 2/3;
  }
  .content-center-img{
    grid-column: 1/2;
    grid-row: 2/3;
  }
}

.about-container {
  padding: 30px;
  line-height: 1.5rem;
  font-size: 1.2rem;
  display: flex;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border-top: 1px rgb(184, 184, 184) solid;
  background-color: $container-color;
  border-bottom: 1px rgb(184, 184, 184) solid;
  justify-content: space-around;
}
.about-wrapper {
  min-width: 25%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  > i {
    color: $main-text-color;
    display: block;
    margin-bottom: 1rem;
    font-size: 3rem;
  }
  .about-title {
    color: $main-text-color;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  > p {
    color: $main-text-color;
    text-align: center;
    font-size: 1 rem;
    margin-top: 0.5rem;
  }
}

@media screen and (max-width: 598px){
  .about-content {
    display: flex;
    flex-direction: column;
    .content-title{
      height: auto;
    }
    .content-image{
      img {
        width: 100%;
      }
    }
  }

}
</style>

<script>


export default {
  // mounted(){
  //   window.scrollTo(0, 0);
  // }
}
</script>
