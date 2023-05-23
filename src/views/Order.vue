<!-- eslint-disable vue/multi-word-component-names -->
<template>

<h1 class="main-heading">ORDER</h1>
  <div class="base-container">
    <StepProgress :stepNum='2'/>
    <Form v-slot="{ errors }" class="order-container" @submit="createOrder" data-aos="fade-up">
      <div class="order-form">
        <div class="input-row">
          <label for="name" class="form-label">NAME</label>
          <Field
            id="name"
            name="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['name'] }"
            placeholder="Peter Wang"
            :rules="{required:true}"
            v-model="form.user.name"
          ></Field>
        </div>
        <div class="input-row">
          <label for="email" class="form-label">EMAIL</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="test@example.com"
            :rules="{ email: true, required:true }"
            v-model="form.user.email"
          ></Field>
        </div>

        <div class="input-row">
          <label for="tel" class="form-label">MOBILE</label>
          <Field
            id="tel"
            name="tel"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['tel'] }"
            placeholder="Enter your mobile"
            :rules="{ regex: /^[0-9]+$/ , required:true}"
            v-model="form.user.tel"
          ></Field>
        </div>
        <div class="input-row">
          <label for="address" class="form-label">ADDRESS</label>
          <Field
            id="address"
            name="address"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['address'] }"
            placeholder="Enter your address"
            :rules="{ required:true}"
            v-model="form.user.address"
          ></Field>
        </div>
        <div class="input-row">
          <label for="message" class="form-label">MESSAGE</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="20"
            rows="5"
            v-model="form.message"
          ></textarea>
        </div>
        </div>
      <div class="order-panel">

      <div class="order-panel-container">
        <h2 class="title">ORDER</h2>
        <table>
          <thead>
          <tr>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>FINAL PRICE</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>{{item.product.title}}</td>
              <td>{{item.total}}</td>
              <td>{{item.final_total}}</td>
            </tr>
            <tr class="total">
              <td>TOTAL</td>
              <td>{{cart.total}}</td>
            </tr>
            <tr class="total">
              <td>FINAL PRICE</td>
              <td>{{cart.final_total}}</td>
            </tr>
          </tbody>
        </table>
        <div class="btn-container">
          <button class="back-btn" @click="getBack">BACK TO CART</button>
          <button class="btn order-btn" type="submit">PLACE ORDER</button>
        </div>
        </div>
      </div>
  </Form>
  </div>
</template>

<style lang="scss">
.order-container {
  width: 1000px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: $container-color;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  .input-row {
    margin-bottom: 1rem;
  }
}
.order-form {
  min-width: 280px;
}
.order-panel-container {
  height: 100%;
  display: flex;
  width: 500px;
  padding: 0 10px;
  flex-direction: column;
}
  .title {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  table {
    height: 100%;
    border-collapse: separate;
    thead > tr >th {
      font-size: 1.2rem;
      font-weight: 500;
      text-align: center;
    }
    tbody {
      font-size: 1.2rem;
      height: 2rem;
      tr > td {
        padding: 0.8rem;
        width: 150px;
        text-align: center;
      }
    }
  }
  .order-btn {
      width: 200px;
      height: 60px;
      border: none;
      border-radius: 10px;
      color: #FFF;
      background-color: rgb(0, 48, 13);
      font-size: 1rem;
      &:hover{
        border: 2px solid $main-text-color;
        background-color: $container-color;
        color: rgb(2, 26, 97);
        transition: all .2s ease-out;
      }
    }
    .back-btn {
      width: 200px;
      height: 60px;
      border: none;
      border-radius: 10px;
      color: #FFF;
      background-color: rgb(0, 0, 0);
      font-size: 1rem;
      &:hover{
        color: $main-text-color;
        border: 2px solid $main-text-color;
        background-color: $container-color;
        transition: all .2s ease-out;
      }
    }
    .btn-container {
      display: flex;
      width: 100%;
      margin-top: 1rem;
      justify-content:space-between;
      gap: 1rem;
    }
    .total {
      font-weight: 700;
      font-size: 1.5rem;
    }

@media screen and (max-width: 992px) {
  .order-container {
    width: 100%;
    margin: 0;
  }
  .order-form {
    width: 50%;
  }
}

</style>

<script>
import StepProgress from '@/components/StepProgress.vue'

export default {
  components: { StepProgress },
    data(){
    return {
      form: {
        user: {
          email: "",
          name: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      cart: {},
      isInValid: true,
    }
  },
   methods: {
    createOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(api, { data: this.form }).then((res) => {
        this.$router.push(`/checkout/${res.data.orderId}`);
      });
    },
    getCart(){
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then(res => {
        console.log(res.data)
        this.cart = res.data.data
      })
    },
    getBack(){
      this.$router.push('/cart')
    },
  },
  created(){
    this.getCart();
  }

}
</script>