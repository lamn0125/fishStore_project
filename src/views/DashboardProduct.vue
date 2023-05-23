<template>
  <Loading :active="isLoading"></Loading>
  <div class="base-container">
  <div class="btn-container">
    <button class="add-product-btn" type="button" @click="openModal(true)">
      ADD NEW PRODUCTS
    </button>
    <span class="err-msg" v-show="errorMsg">Add unsuccessfully: {{errorMsg}}</span>
    <input type="text" class="search-input" placeholder="SEARCH PRODUCT NAME" v-model="keyword" @change="searchHandler"/>
  </div>

  <table class="product-table">
    <thead>
      <tr class="product-header">
        <th >CATEGORY</th>
        <th>NAME</th>
        <th>ORIGINAL PRICE<i class="bi bi-filter"></i></th>
        <th>PRICE</th>
        <th>ENABLED</th>
        <th>EDIT</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in (filteredProducts ? filteredProducts : products) " :key="item.id" class="product-row">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">ENABLED</span>
          <span class="text-muted" v-else>NOT ENABLED</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-lg"
              @click="openModal(false, item)"
            >
             <i class="bi bi-pencil-square"></i>
            </button>
            <button
              class="btn btn-lg"
              @click="openDeleteModal(item)"
            >
              <i class="bi bi-archive"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <Paginator :pages="pagination" @emit-pages="getProducts"></Paginator>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  >
  </ProductModal>
   <DeleteModal
    ref="delModal"
    :item="tempProduct"
    @delete-product="deleteProduct"
  ></DeleteModal>
</template>


<style lang="scss">
.btn-container{
  width: 100%;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  .add-product-btn {
    width: 200px;
    height: 60px;
    border: none;
    border-radius: 10px;
    color: #FFF;
    background-color: rgb(0, 0, 0);
    font-size: 1rem;
    margin-right: 1rem;
    &:hover{
      color: $main-text-color;
      border: 2px solid $main-text-color;
      background-color: $container-color;
      transition: all .2s ease-out;
    }
  }
  .err-msg {
    font-size: 1rem;
    font-weight: 600;
    width: 300px;
    margin-right: auto;
    line-height: 1.5rem;
  }
  .search-input {
    width: 300px;
    height: 60px;
    border: 2px solid $main-text-color;
    border-radius: 10px;
    color: $main-text-color;
    padding: 10px;
    background-color: #FFF;
    font-size: 1rem;
  }
}

  .product-table {
    border-collapse: separate;
    width: 100%;
    padding: 20px;
  }
  .product-header{
    text-align: center;
    background-color: $main-bg-color;
    > th {
      padding: 20px 0;
      color: #FFF;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .product-row{
    background-color: $container-color;
    color: $main-text-color;
    font-size: 1.2rem;
    text-align: center;
    background-color: $container-color;
    > td {
      padding: 20px;
    }
  }

</style>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import Paginator from "@/components/Paginator.vue";


export default {
  components: { ProductModal, DeleteModal, Paginator },
  inject: ["emitter"],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      keyword: '',
      errorMsg: null,
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = "put";
      }
      const productComponent = this.$refs.productModal;
      this.isLoading = true;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false;
        productComponent.hideModal();
        if (res.data.success) {
          this.getProducts();
          this.errorMsg = null;
        } else {
          this.errorMsg = res.data.message
        }
      });
    },
    openDeleteModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    deleteProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;

      this.$http.delete(url).then((res) => {
        this.isLoading = false;
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });
    },
  },
  computed: {
    filteredProducts(){
      if(this.keyword != ''){
        return this.products.filter(item => {
          return item.title.toLowerCase().match(this.keyword.toLowerCase())
        })
      }
    },
  },
  created(){
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push("/login");
      }
    });
    this.getProducts();
  }
}
</script>