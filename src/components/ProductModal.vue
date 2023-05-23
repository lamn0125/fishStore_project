<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">NEW IMAGE URL</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="FILL IN IMAGE URL"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >OR UPLOAD IMAGE
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              <div class="mt-5" v-if="tempProduct.images">
                <div
                  v-for="(image, key) in tempProduct.images"
                  class="mb-3 input-group"
                  :key="key"
                >
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.images[key]"
                    placeholder="FILL IN IMAGE URL"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)"
                  >
                    REMOVE
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.images[tempProduct.images.length - 1] ||
                    !tempProduct.images.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.images.push('')"
                  >
                    ADD NEW IMAGE
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">TITLE*</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="FILL IN TITLE"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">CATEGORY*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="FILL IN CATEGORY"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">UNIT*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="FILL IN UNIT"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">ORIGINAL PRICE*</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    placeholder="FILL IN ORIGINAL PRICE"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">PRICE*</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="tempProduct.price"
                    placeholder="FILL IN PRICE"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">DESCRIPTION</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="FILL IN PRODUCT DESCRIPTION"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">PRODUCT CONTENT</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="FILL IN PRODUCT CONTENT"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    ENABLED?
                  </label>
                </div>
              </div>
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
            @click="$emit('update-product', tempProduct)"
          >
           <i class="bi bi-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
  .modal-footer {
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
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },

  uploadFile() {
    const uploadedFile = this.$refs.fileInput.files[0];
    console.dir(uploadedFile);
    const formData = new FormData();
    formData.append("file-to-upload", uploadedFile);
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
    this.$http.post(url, formData).then((res) => {
      if (res.data.success) {
        this.tempProduct.imageUrl = res.data.imageUrl;
      }
    });
  },

  mixins: [modelMixin],
};
</script>
