<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
  methods: {
    updatePage(page) {
      this.$emit("emit-pages", page);
    },
  },
};
</script>
