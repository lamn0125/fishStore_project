<template>
  <div class="container">
    <div class="step">
      <div class="circle-container red"></div>
    </div>
    <div class="step">
       <div class="circle-container" :class="[step >= '2' ? 'yellow' : null]"></div>
      <span class="connect-line"></span>
    </div>
    <div class="step">
      <div class="circle-container" :class="[step == '3' ? `yellow green` : null]"></div>
      <span class="connect-line"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";
  .container {
    padding: 20px;
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: center;
  }
  .step {
    flex: 1;
    font-weight: 700;
    font-size: 1.6rem;
    text-align: center;
    position: relative;
    .circle-container {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 auto;

      border: 5px $main-text-color solid;
    }
    .connect-line {
      content: '';
      background-color: $main-bg-color;
      height: 2px;
      display: block;
      position: absolute;
      top: 25px;
      left: calc(-50% + 50px);
      right: calc(50% + 50px);
    }
  }
  .red {
    background-color: red;
  }
  .yellow {
     background-color: yellow;
  }
  .green{
     background-color: green;
  }

</style>

<script>
export default {
  props:['stepNum'],

  data(){
    return{
      step: this.stepNum
    }
  },
}
</script>