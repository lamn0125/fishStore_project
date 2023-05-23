<template>
<Loading :active="isLoading" ></Loading>
<ToastMessages></ToastMessages>
<h1 class="main-heading">PRODUCTS</h1>
  <div class="base-container">
  <div class="main-container">
    <div class="category-container">
      <table class="category-table">
        <thead>
          <th><input type="text" class="search-input" placeholder="&#x1F50D;  PRODUCT NAME" v-model="keyword" @change="searchHandler"/></th>
        </thead>
        <tbody class="category-list">
          <tr>
            <td @click="selectedCategory(null)">All</td>
          </tr>
          <tr v-for="category in categoryList" :key="category">
            <td><span @click="selectedCategory(category)">{{category}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="cards" data-aos="fade-up">
      <div
        class="card"
        style="width: 15rem"
        v-for="product in filteredProducts ? filteredProducts : products"
        :key="product.id"
      >
        <img :src="product.imageUrl" class="card-img-top card-img" alt="product.title" />
        <button class="detail-btn" type="button">
          <i class="bi bi-three-dots-vertical" @click="getProduct(product.id)"></i>
        </button>

        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">
            {{ product.unit }}
          </p>
          <p>$ {{ $filters.currency(product.price) }}</p>
          <button
            class="addToCart-btn"
            @click="addToCart(product.id)"
            :disabled="status.loadingItem === product.id"
          >
            <i class="bi bi-cart-check" v-if="isAddedToCart && product.id == status.addedItem"></i>
            <i class="bi bi-cart-plus" v-else></i>

          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
}
.category-container {
  height: auto;
  .category-table{
    border-collapse: separate;
  }
  .search-input {
     height: 60px;
     padding: 10px;
     border: 2px solid $main-text-color;
     border-radius: 10px;
     margin-bottom: .5rem;
  }
  .category-list {
    > tr > td{
      background-color: $container-color;
      padding: 1rem;
      cursor: pointer;
    }
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  justify-content: center;
  .card {
    border: none;
    background-color: $container-color;
    position: relative;
    margin: 1rem;
    &:hover > button {
      opacity: 0.7;
      transform: scale(1, 1);
      transition: all 0.2s ease-out;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      bottom: 0.5rem;
      left: 0.5rem;
      transition: transform 0.3s ease-out;
    }

    &::before {
      border-top: 1px #000 solid;
      border-bottom: 1px #000 solid;
      transform: scale(0, 1);
    }
    &::after {
      border-left: 1px #000 solid;
      border-right: 1px #000 solid;
      transform: scale(1, 0);
    }
    &:hover::before {
      transform: scale(1.05, 1);
    }
    &:hover::after {
      transform: scale(1, 1.05);
    }
    .detail-btn {
      position: absolute;
      transform: scale(1, 0);
      z-index: 10;
      color: #fff;
      top: 0;
      right: 0;
      border: none;
      font-size: 2rem;
      margin: 1rem;
      background-color: transparent;
    }
    .card-img {
      padding: .5rem;
      height: 200px;
      object-fit: cover;
    }
    .card-title {
      font-weight: 600;
      font-size: 1.5rem;
    }
    .card-text {
      line-height: 1.5rem;
      font-size: 1rem;
    }
    .addToCart-btn {
      border: none;
      background-color: transparent;
      cursor: pointer;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      z-index: 10;
      > i {
        font-size: 2rem;
        &:hover {
          color: rgb(202, 202, 202);
        }
      }
    }
  }
}
</style>

<script>
export default {
  inject: ["emitter"],
  data() {
    return {
      products: [],
      status: {
        addedItem: ''
      },
      isLoading: false,
      isAddedToCart: false,
      cartLength: '',
      categoryList: [],
      keyword: '',
      category: null,
    }
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.products = res.data.products
        const list = res.data.products
        let newList = list.map(item => {
          return item.category
        })
        newList.forEach(item => {
          if(this.categoryList.indexOf(item) === -1){
            this.categoryList.push(item)
          } else {
            return
          }
        })
      })
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    addToCart(id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.addedItem = id
      const cart = { product_id: id, qty: 1 }
      this.$http.post(api, { data: cart }).then((res) => {
        this.isLoading = false
        this.isAddedToCart = true
        this.getCart()
      })
    },
    getCart(){
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then(res => {
        this.cartLength = res.data.data.carts.length
        this.emitter.emit('sendProduct', this.cartLength)
      })
    },
    selectedCategory(category){
      this.category = category
    },
  },
  computed: {
    filteredProducts(){
      if(this.keyword != ''){
        return this.products.filter(item => {
          return item.content.toLowerCase().match(this.keyword.toLowerCase())
        })
      } else if (this.category != null){
        return this.products.filter(item => {
          return item.category === this.category
        })
      }
    },
  },
  created() {
    this.getProducts()
  },
}
</script>
