<template>
  <div class="header">
    <nav>
      <div class="nav-logo">
       <router-link to="/"><img src="@/assets/images/logo.png" alt="logo"/></router-link>
      </div>

      <label class="toggle-hamburger" for="toggle-input">
        <i class="bi bi-list"></i>
      </label>
      <input id="toggle-input" type="checkbox" />

      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/faq">FAQ</router-link>
        </li>
        <li class="nav-item" v-if="loginStatus">
          <router-link to="/dashboard/products">Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="loginStatus">
          <router-link to="/dashboard/coupons">Coupons</router-link>
        </li>
      </ul>
      <div class="nav-icons">
        <i class="bi bi-person-circle" @click="login" v-if="!loginStatus"></i>
        <i class="bi bi-box-arrow-right" v-else @click="logout"></i>
        <i class="bi bi-cart" @click="viewCart">
          <span> {{ cartCount ? cartCount : 0 }} {{cartCount === 1 ? 'item' : 'items'}}</span>
        </i>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>

.header {
  position: fixed;
  height: 80px;
  width: 100%;
  opacity: 1;
  z-index: 99;
  box-shadow: $box-shadow;
}

nav {
  height: 100%;
  background-color: $main-bg-color;
  line-height: 80px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.nav-logo {
  color: #fff;
  font-size: 1.8rem;
  width: 150px;
  overflow: hidden;
  img {
   width: 100%;
    object-fit: cover;
  }
}

.toggle-hamburger,
#toggle-input {
  display: none;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  height: 100%;
  .nav-item {
    a {
      color: #fff;
     &:hover {
      color: rgb(119, 119, 119);
      transition: all 0.2s ease-out;
      }
    }
  }
}
.nav-icons {
  font-size: 1.5rem;
  i{
    color: #fff;
    margin: 0 1rem;
    span{
      margin: .5rem;
      color: #FFF;
      font-size: 1rem;
    }
    &:hover{
      cursor: pointer;
      color: rgb(119, 119, 119);
      transition: all 0.2s ease-out;
    }

  }
}

@media screen and (max-width: 992px) {
  .nav {
    padding: 0 10px;
  }
  .nav-list {
    transform: scale(1, 0);
    position: absolute;
    flex-direction: column;
    top: 100%;
    width: 100%;
    right: 0;
    left: 0;
    height: auto;
    z-index: 99;
    padding: 15px 0;
    background-color: #000;
    .nav-item {
      color: #FFF;
      font-size: 1rem;
      padding: 10px 0;
      opacity: 0;
    }
  }

  .toggle-hamburger {
    display: block;
    font-size: 2rem;
    > i {
      color: #FFF;
    }
  }

  #toggle-input {
    &:checked ~ .nav-list {
      transform: scale(1, 1);
      transition: transform 0.3s ease-out;
      transform-origin: top;
      opacity: 0.9;
      gap: 0.5rem;
    }
    &:checked ~ .nav-list > .nav-item {
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }
  }
  .nav-icons {
    i {
      margin: 0.3rem;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      cartCount: '',
      isLoginIn: false,
      loginStatus: false,
      cartLength: 0,
      cartLength: 0,
    }
  },
  inject: ["emitter"],
  created(){
    this.emitter.on("sendProduct", (data)=> {
      this.cartCount = data
    }),
    this.emitter.on('loginStatus', (data => {
      this.loginStatus = data
    }))
  },
  methods: {
    viewCart(){
      this.$router.push('/cart')
    },
    login(){
      this.$router.push('/login')
    },
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push("/login");
          this.loginStatus = false
        }
      });
    },
  },
}
</script>
