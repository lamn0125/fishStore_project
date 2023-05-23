<template>
<Loading :active="isLoading"></Loading>
  <h1 class="main-heading">CHECKOUT</h1>
  <div class="base-container">
    <StepProgress :stepNum='3'/>
    <form class="form-container" @submit.prevent="payOrder"  data-aos="fade-up">
      <table class="table-order">
        <thead>
          <th>ITEM</th>
          <th>QTY</th>
          <th>PRICE</th>
        </thead>
        <tbody class="table-detail">
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}</td>
            <td >{{ item.final_total }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table-order">
        <tbody class="table-detail">
          <tr>
            <th>EMAIL</th>
            <td>abc@gmail.com</td>
          </tr>
          <tr>
            <th>NAME</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>TEL</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>ADDRESS</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>PAYMENT</th>
            <td class="paidStatus">
              <span class="text-warning" v-if="!order.is_paid">NOT YET PAID</span>
              <span class="text-success" v-else>PAID</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pay-container">
        <p class="total-amount">TOTAL : {{ order.total }}</p>
      <button class="pay-btn" @click="payOrder">PAY</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.form-container {
  background-color: $container-color;
  border-radius: 10px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  > .table-order {
    min-height: 30vh;
    border-bottom: 1px rgb(83, 83, 83) solid;
    border-collapse: separate;
    padding: 20px 0;
    th {
      width: 200px;
      text-align: center;
      font-size: 1.2rem;
      padding: 8px;
    }
    .table-detail tr td{
      text-align: center;
      font-size: 1.4rem;
      padding: 15px;
    }
  }
  .pay-container {
    display: flex;
    align-items: center;
  }
  .pay-btn {
    color: #FFF;
    width: 200px;
    height: 60px;
    border: none;
    border-radius: 10px;
    background-color: $main-bg-color;
    font-size: 1rem;
    &:hover{
      color: $main-text-color;
      border: 2px solid $main-text-color;
      background-color: $container-color;
      transition: all .2s ease-out;
    }
  }
}
.total-amount {
  margin: 2rem auto;
  font-size: 1.4rem;
}

@media screen and (max-width: 598px){
  .form-container{
    width: 100%;
  }
}
</style>

<script>
import StepProgress from '@/components/StepProgress.vue'
export default {
  components: { StepProgress },
  data() {
    return {
      order: {
        user: {},
      },
      orderId: "",
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true
      this.$http.get(url).then((res) => {
      this.isLoading = false;
        if (res.data.success) {
          this.order = res.data.order;
        }
      });
    },
    payOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http.post(url).then((res) => {
        this.isLoading = false;
        this.$router.push(`/checkout/success/${this.orderId}`)
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
}
</script>
