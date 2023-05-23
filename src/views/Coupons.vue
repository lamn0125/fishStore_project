<template>
  <Loading :active="isLoading"></Loading>
  <div class="base-container">
  <button class="add-coupon-btn" type="button" @click="openCouponModal(true)">
    ADD NEW COUPON
  </button>
  <span class="err-msg" v-show="errorMsg">Add unsuccessfully: {{errorMsg}}</span>
  <table class="coupon-table">
    <thead>
      <tr class="coupon-header">
        <th>COUPON CODE</th>
        <th>DISCOUNT(%)</th>
        <th>DUE DATE</th>
        <th>ENABLED</th>
        <th>EDIT</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coupon in coupons" :key="coupon.id" class="coupon-row">
        <td>{{ coupon.code }}</td>
        <td>{{ coupon.percent }}</td>
         <td>{{ $filters.date(coupon.due_date) }}</td>
        <td>
          <span v-if="coupon.is_enabled === 1" class="text-success">ENABLE</span>
          <span v-else class="text-muted">NOT ENABLE</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-lg" @click="openCouponModal(false, coupon)"> <i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-lg" @click="deleteCoupon(coupon.id)"><i class="bi bi-archive"></i></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <CouponModal
    :coupon="tempCoupon"
    ref="couponModal"
    @update-coupon="updateCoupon"
  />
</template>

<style lang="scss">
.err-msg {
  font-size: 1rem;
  font-weight: 600;
  width: 300px;
  margin-right: auto;
  line-height: 1.5rem;
}
.coupon-table {
  border-collapse: separate;
  width: 100%;
  padding: 20px;
}
.coupon-header {
  text-align: center;
  background-color: $main-bg-color;
  > th {
    padding: 20px 0;
    color: #FFF;
    font-size: 1.5rem;
    font-weight: 600;
  }
}
.coupon-row {
    background-color: $container-color;
    color: $main-text-color;
    font-size: 1.2rem;
    text-align: center;
    background-color: $container-color;
    > td {
      padding: 20px;
    }
}
.add-coupon-btn {
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
</style>


<script>
import CouponModal from "@/components/CouponModal.vue";

export default {
  components: { CouponModal },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: "",
        percent: "",
        due_date: "",
        code: "",
        id: "",
      },
      isNew: false,
      isLoading: false,
      errorMsg: null,
    };
  },
  methods: {
    getCoupons() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.isLoading = true;
      this.$http.get(api, this.tempProduct).then((res) => {
        this.isLoading = false;
        this.coupons = res.data.coupons;
      });
    },
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(api, { data: tempCoupon }).then((res) => {
        if (res.data.success) {
          this.getCoupons();
          this.errorMsg = null;
        } else {
          this.errorMsg = res.data.message
        }
          this.$refs.couponModal.hideModal();
        });
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(api, { data: this.tempCoupon }).then((res) => {
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      }
    },
    openCouponModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = { due_date: new Date().getTime() / 1000 };
        this.isNew = isNew
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    deleteCoupon(id){
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
      this.$http.delete(api).then(res => {
        this.getCoupons();
      })
    }
  },
  created() {
    this.getCoupons();
  },
};
</script>
