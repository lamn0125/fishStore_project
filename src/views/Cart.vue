<!-- eslint-disable vue/multi-word-component-names -->
<template>
<Loading :active="isLoading"></Loading>
<h1 class="main-heading">CART</h1>
  <div class="base-container">
  <div v-if="!cart.carts" class="empty-container">
    <h2>No Items added <i class="bi bi-emoji-frown"></i></h2>
    <button class="redirect-btn" @click="redirectBtn">CHECK OUT ALL PRODUCTS</button>
  </div>
    <div class="cart-container" v-else data-aos="fade-up">
    <StepProgress :stepNum='1'/>
    <table class="cart-list-panel">
      <thead class="table-header">
        <tr>
          <th></th>
          <th>Product</th>
          <th >QTY</th>
          <th>PRICE</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="item in cart.carts" :key="item.id" class="table-row">
          <td><img class="product-image" :src="item.product.imageUrl" /></td>
          <td>{{item.product.title}}</td>
         <td>
            <div class="qty-control">
              <button class="reduceQty" @click="qtyHandler($event,item)">-</button>
              <input
              class="qty-input"
                type="number"
                v-model.number="item.qty"
              />
              <button class="addQty" @click="qtyHandler($event,item)">+</button>
            </div>
        </td>
          <td>{{item.product.price}}</td>
          <td>{{item.total}}</td>
           <td class="delete-btn" @click="removeCartItem(item.id)">
            <i class="bi bi-x-circle"></i>
          </td>
        </tr>
    </tbody>
    </table>

    <div class="cart-footer">
      <div class="coupon-btn">
        <input
          type="text"
          class="form-control"
          v-model="coupon_code"
          placeholder="Enter Coupon Code"
        />
        <button
          class="use-coupon-btn"
          type="button"
          @click="addCouponCode"
        >
          USE COUPON
        </button>
        <p v-if="coupon_status"> COUPON SUCCESSFULLY USED</p>
        <p v-else-if="coupon_status != null">COUPON UNSUCCESSFULLY USED</p>
      </div>
       <button class="next-btn" @click="getOrder">Next</button>
    </div>
  </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
}
.cart-list-panel {
  background-color: $container-color;
  border-radius: 10px;
  border-spacing: 10px;
  border-collapse: separate;
  margin: 0 auto;
  width:100%;
}
.table-header {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
.table-row {
  font-size: 1.2rem;
  text-align: center;
}
.product-image {
  width: 100px;
}

.qty-control {
   height: 30px;
    display: flex;
    justify-content: center;
  > button {
    width: 30px;
    height: 100%;
    border: none;
    color:#FFF;
    background-color: $main-bg-color;
  }
  .qty-input {
      height: 100%;
      color: #000;
      width: 40px;
      padding: 8px;
      text-align: center;
  }
  /*remove stepping in inputs */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
.delete-btn i {
  color: $main-text-color;
  cursor: pointer;
}
.next-btn{
  margin-top: 1rem;
  width: 200px;
  height: 60px;
  border: none;
  color: #FFF;
  border-radius: 10px;
  margin-left: auto;
  background-color: $main-bg-color;
  font-size: 1rem;
  &:hover{
    border: 2px solid $main-bg-color;
    background-color: $container-color;
    transition: all .2s ease-out;
    color: $main-text-color;
  }
}
.empty-container {
  margin: 0 auto;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  > button {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 2rem;
  }
}
.redirect-btn {
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
.cart-footer {
  display: flex;
}
.coupon-btn {
  margin-top: 1rem;
  display: flex;
  input{
    width: 250px;
  }
  .use-coupon-btn {
    width: 200px;
    border: none;
    background-color: $container-color;
    border-radius: 10px;
    margin-right: 1rem;
    &:hover{
      border: 2px solid $main-bg-color;
      transition: all .2s ease-out;
    }
  }
}
@media screen and (max-width: 375px){
  .cart-list {
    display: flex;
    flex-direction: column;
  }
  .table-header {
    display: none;
  }
  .table-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

</style>


<script>
import StepProgress from '@/components/StepProgress.vue'
export default {
    inject: ["emitter"],
    components: {StepProgress},
    data(){
    return{
      cart: {},
      coupon_code: "",
      isLoading: false,
      coupon_status: null
    }
  },
  methods: {
    getCart(){
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(api).then(res => {
        this.isLoading = false

        const cartLength = res.data.data.carts.length
        this.emitter.emit('sendProduct', cartLength)
        if(res.data.data.carts.length !== 0){
          this.cart = res.data.data
        } else {
          this.cart.carts = 0;
        }
      })
    },
    updateCart(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.id,
        qty: item.qty,
      };
      this.$http.put(api, { data: cart }).then((res) => {
        this.isLoading = false;
        this.getCart();
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          this.getCart();
        }
      });
    },
    qtyHandler(e,item){
      if(e.target.classList.contains('addQty')){
        item.qty++;
      } else if (e.target.classList.contains('reduceQty') && item.qty > 0){
          item.qty--;
       }
      this.updateCart(item)
      if(item.qty === 0){
        this.removeCartItem(item.id)
      }
    },
    getOrder(){
      this.$router.push('/order');
    },
    redirectBtn(){
      this.$router.push('/products')
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.$http.post(api, { data: coupon }).then((res) => {
        if (res.data.success){
          this.coupon_status = true
          this.getCart();
        } else {
          this.coupon_status = false
        }
      });
    },
  },
  created(){
    this.getCart()
  }
}
</script>