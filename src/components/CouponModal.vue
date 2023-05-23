<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">TITLE*</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="Enter Coupon Title"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">COUPON CODE*</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="Enter Coupon Code"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">DUE DATE*</label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="due_date"
            />
          </div>
          <div class="mb-3">
            <label for="price">DISCOUNT %*</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model.number="tempCoupon.percent"
              placeholder="Enter discount"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled">
                ENABLED*
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn model-btn"
            data-bs-dismiss="modal"
          >
            <i class="bi bi-x-circle"></i>
          </button>
          <button
            type="button"
            class="btn model-btn"
            @click="$emit('update-coupon', tempCoupon)"
          >
           <i class="bi bi-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-footer {
    border: none;
}
.model-btn {
  font-size: 2rem;
}
</style>


<script>
import modalMixin from "@/mixins/modelMixin";

export default {
  name: "couponModal",
  props: {
    coupon: {},
  },
  data() {
    return {
      tempCoupon: {},
      due_date: "",
    };
  },
  emits: ["update-coupon"],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      console.log(this.tempCoupon.due_date);
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString()
        .split("T");
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
