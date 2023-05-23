<!-- eslint-disable vue/multi-word-component-names -->
<template>
<Loading :active="isLoading"></Loading>
  <div class="base-container">
    <div class="main-container">
      <div class="order-status">
        <p>THANK YOU <i class="bi bi-emoji-smile"></i></p>
        <p>PAY SUCCESSFULLY</p>
      </div>
      <div class="order-container">
        <h3 class="order-number">ORDER NUMBER</h3>
        <p class="order-id">{{this.orderId}}</p>
      </div>
       <button class="redirect-btn" @click="redirectBtn">BACK TO HOME</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  background-color: $container-color;
  width: 100%;
  padding: 20px;
  height: auto;
  text-align: center;
  .order-status{
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
.order-container{
  .order-number {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .order-id {
    color: rgb(242, 183, 21);
    font-size: 1.5rem;
  }
}

.redirect-btn{
  margin-top: 1rem;
  padding: 10px;
  width: 250px;
  height: auto;
  border: none;
  border-radius: 10px;
  color: #FFF;
  background-color: $main-bg-color;
  &:hover{
    border: 2px solid $main-text-color;
    background-color:$container-color;
    color: $main-text-color;
    transition: all .2s ease-out;
  }
}
</style>

<script>
export default {
  inject: ["emitter"],
  data(){
    return {
      orderId: '',
    }
  },
  methods: {
    redirectBtn(){
      this.emitter.emit('sendProduct', 0)
      this.$router.push('/')
    }
  },
  created(){
    this.orderId =  this.$route.params.orderId;
  }
}
</script>