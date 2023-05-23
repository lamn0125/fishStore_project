<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <p>CONFIRM TO DELETE THIS PRODUCT?</p>
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
            @click="$emit('delete-product')"
          >
           <i class="bi bi-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-content {
  padding-top: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
}
.modal-body ,.modal-footer {
  border: none;
}
.model-btn {
  font-size: 2rem;
}
</style>

<script>
import modelMixin from "@/mixins/modelMixin.js";

export default {
  props: {
    item: {},
  },
  data() {
    return {
      modal: "",
    };
  },

  mixins: [modelMixin],
};
</script>
