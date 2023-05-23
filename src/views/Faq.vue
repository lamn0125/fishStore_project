<!-- eslint-disable vue/multi-word-component-names -->
<template>
<h1 class="main-heading">FAQ</h1>
  <div class="base-container">
    <div class="accordion-container">
      <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
        <h2 class="accordion-header">
          <button
            @click="openFaq(index)"
            class="accordion-button"
            type="button"
          >
            {{ faq.question }}
          </button>
        </h2>
        <div class="accordion-body" v-show="currentFaq == index">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.accordion-container {
  display: flex;
  flex-direction: column;
  .accordion-item {
    padding: 10px;
    width: 100%;
    height: auto;
    .accordion-header button {
      height: 50px;
      font-weight: 600;
      margin-bottom: 1rem;
      font-size: 1.8rem;
      color: rgb(0, 48, 13);
      line-height: 1.3em;
      height: auto;
      &:hover,
      &:focus {
        color: #000;
      }
    }
    .accordion-body {
      padding-bottom: 1rem;
      font-size: 1.5rem;
       color: rgb(108, 108, 108);
      line-height: 1.5em;
      height: auto;

    }
  }
}
</style>

<script>


export default {
  data() {
    return {
      faqs: [
        {
          question: 'When will my order get delivered after payment?',
          answer:
            'For chilled products directly out of the fish market, order now and get it in 1 days!'
        },
        {
          question: 'Where do you deliver?',
          answer:
            'We deliver to Taiwan Island. We do not deliver to Outlying Islands.'
        },
        {
          question:
            'Is your seafood sustainable?',
          answer:
            'Sustainability is our highest priority. We personally know the fishermen we work with and we catch our seafood in accordance with established seasons. We do not sell any protected fish species and our farms are ASC, Global G.a.p and B.A.P certified. '
        },
        {
          question: 'How should customers store our products?',
          answer:
            'Our live and fresh seafood should be stored between 3 and 7°C in the refrigerator (for best results, place in the bottom of the refrigerator). Frozen seafood needs to be stored in a freezer at a temperature of -18°C.'
        },
        {
          question: 'What if my order get rotten when I received it? ',
          answer:
            'Please feel free to contact us +886-900-122 in our working hour or email to twseafood@example.com. You can get a full refund or reorder the products. We will try to resolve the issue as quickly as possible.'
        }
      ],
      isOpen: false,
      currentFaq: null
    }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    openFaq(index) {
      this.currentFaq = index
    }
  }
}
</script>
