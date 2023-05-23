<template>
<h1 class="main-heading">HOME</h1>
  <div class="base-container">
    <div class="main-container">
      <div class="main-content" v-for="(text, index) in mainText" :key="index">
        <div class="main-text">
          <h3>{{text.title}}</h3>
          <p>
            {{text.desc}}
          </p>
        </div>
        <div class="main-photo">
          <img class="photos" :src="text.image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  background-color: $container-color;
  height: auto;
  padding: 30px;
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;
  .main-content {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    width: 80%;
    height: 100%;
    align-items: center;
    .main-text {
      max-width: 500px;
      h3 {
      color: $main-text-color;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 3rem;
    }
    p {
      color: #000;
      font-size: 1.3rem;
      line-height: 2.2rem;
    }
    }

  }
}
.main-photo {
  .photos {
    object-fit: cover;
    overflow: hidden;
    width: 400px;
    height: 250px;
  }
}
@media screen and (max-width: 576px) {
  .main-container {
    .main-content{
      width: 100%;
      .main-text {
        justify-content: center;
      }
    }
  }
  .main-photo {
    .photos {
      width: 100%;
      height: 200px;
    }
  }
}
</style>

<script>
export default {
  data(){
    return{
      mainText: [
        {
          title: 'WHY CHOOSE US?',
          desc: `
            We are the TW's #1 specialist online fishmonger.
            We professionally freeze fish when it is at its freshest to pause the clock on quality.   Much of what is sold as fresh at the supermarket is defrosted or up to 2 weeks old.
          `,
          image: `https://images.unsplash.com/photo-1618055301293-494ab4c71f9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80`
        },
        {
          title: 'WE ARE GREAT AT WHAT WE DO',
          desc: `
            Founded over 30 years ago, we are the number 1 specialist online fishmonger.Quality and service. These are our mantras. We have delivered a million servings of fish to over 100,000 customers. We have an “excellent” 4.7 rating on reviews.co.uk.
          `,
          image:`https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`
        },
        {
          title: 'SUSTAINABILITY',
          desc: `
            Sustainability is very big in our minds.
            It is a complicated subject! We are well on track to giving an honest and detailed sustainability rating for all our fish. We donate to sustainability projects.
          `,
          image: `
          https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1913&q=80`

        },
      ]
    }
  }
}
</script>

