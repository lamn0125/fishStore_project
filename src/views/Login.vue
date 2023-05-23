<template>
  <Loading :active="isLoading"></Loading>
  <div class="base-container">
    <form class="main-container" @submit.prevent="signIn">
      <div v-if="isFailedLogin" class="login-status">Unsuccessfully Login</div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="test@example.com"
        required
        autofocus
        v-model="user.username"
      />

      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="password"
        required
        v-model="user.password"
      />
      <div class="button">
        <button class="login-btn">Submit</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>
.main-container {
  background-color: $container-color;
  border-radius: 10px;
  width: 60%;
  padding: 20px;
  margin: 0 auto;
  > label {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  > input{
    margin-bottom: 1rem;
  }
}
.button {
  width: 100%;
  text-align: end;
  .login-btn {
  width: 200px;
  height: 60px;
  border: none;
  margin-left: auto;
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
}
.login-status {
  font-size: 1.2rem;
  margin: 1rem 0;
  color: red;
}

@media screen and (max-width: 576px) {
  .main-container {
    width: 100%;
  }
  .button {
    text-align: center;
  }
}
</style>

<script>
export default {
  inject: ["emitter"],
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isLoading: false,
      isFailedLogin: false,
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.isLoading = true;
      this.$http.post(api, this.user).then((res) => {
        this.isLoading = false;
        console.log(res);
        if (res.data.success) {
          this.isFailedLogin = true;

          const { token, expired } = res.data;
          document.cookie = `LoginToken=${token}; expires=${new Date(expired)}`;
          this.$router.push("/dashboard/products");

          this.emitter.emit('loginStatus', this.isFailedLogin)
        } else {
          this.isFailedLogin = true;
        }
      });
    },
  },
};
</script>
