<template>
  <Navbar />
  <Banner />
  <router-view />
  <Footer />
</template>

<style lang="scss">
@import '@/assets/all';
@import '@/assets/scss/reset/reset.scss';
@import '@/assets/scss/global/global.scss';
</style>

<script>
import Navbar from '@/components/Navbar.vue'
import Banner from '@/components/Banner.vue'
import Footer from '@/components/Footer.vue'
import emitter from "@/methods/emitter";

export default {
  components: { Navbar, Banner, Footer },
  provide() {
    return {
      emitter,
    };
  },
}

</script>
