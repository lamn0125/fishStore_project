<template>
  <Loading :active="isLoading"></Loading>
  <div class="base-container">
    <button class="back-btn" @click="getBack">BACK TO PRODUCT</button>

    <div class="product-wrapper">
      <div class="left">
        <h2 class="product-title">{{ product.title }}</h2>
        <img :src="product.imageUrl" alt="" class="product-image" />
      </div>
      <div class="right">
        <div class="product-unit">
          {{ product.unit }}
        </div>
        <div class="product-desc">
          {{ product.description }}
        </div>
        <div v-if="!product.price">
          {{ product.origin_price }}
        </div>
        <del v-if="product.price"
          >ORIGINAL PRICE :  $ {{ product.origin_price }}</del>
        <div v-if="product.price" class="product-price">
          ON SALE PRICE : $ {{ $filters.currenecy(product.price) }}
        </div>
        <br />
      <button type="button" class="add-btn" @click="addToCart(product.id)">ADD TO CART</button>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product-wrapper {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
}
.left {
  flex: 1;
  .product-title {
    font-weight: 600;
    font-size: 2rem;
  }
  .product-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    overflow: hidden;
  }
}
.right{
  flex: 1;
  font-size: 1.5rem;
  margin: 1rem;
  .product-unit {
    margin: 1rem 0;
  }
  .product-desc {
    margin-bottom: 1rem;
    border-bottom: 2px solid $container-color;
    padding: 2rem 0;
  }
  .product-price {
    margin-top: 1rem;
    font-size: 1.7rem;
    font-weight: 600;
  }
}
.back-btn, .add-btn {
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
.add-to-cart-btn {
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
</style>


<script>
export default {
inject: ["emitter"],
  data() {
    return {
      id: "",
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
        }
      });
    },
    getBack(){
      this.$router.push('/products')
    },
    addToCart(id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = { product_id: id, qty: 1 }
      this.$http.post(api, { data: cart }).then((res) => {
        this.isLoading = false
        this.getCart()
      })
    },
    getCart(){
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then(res => {
        const cartLength = res.data.data.carts.length
        this.emitter.emit('sendProduct', cartLength)
      })
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
