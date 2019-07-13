<template>
  <div class="card">
    <div class="icon">
      <i class="fas fa-5x" :class="icon"></i>
    </div>
    <div class="name">{{ title }}</div>
    <div class="data">
      <span>
        <span v-if="isCurrency">{{ value | toCurrency}}</span>
        <span v-else>{{ value }}</span>
        <span>{{ isAverage ? '(promedio)' : '' }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    value: Number,
    isAverage: Boolean,
    isCurrency: Boolean,
    icon: String
  },
  filters: {
    toCurrency: function(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
  }
};
</script>


<style scoped>
.cards > .card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #6bb9f0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  grid-template-areas: "name" "data";
  position: relative;
  overflow: hidden;
}

.cards > .card > .icon {
  z-index: 10;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  opacity: 0.5;
  color: rgba(107, 185, 240, 0.7);
}
.cards > .card > .name {
  z-index: 11;
  grid-area: name;
  align-self: end;
  font-size: 0.95rem;
  font-weight: 500;
  color: #606060;
  text-transform: uppercase;
}
.cards > .card > .data {
  grid-area: data;
  color: rgba(0, 0, 0, 0.75);
}
.cards > .card > .data > span > span:first-child {
  margin-right: 10px;
  font-size: 1.85rem;
  font-weight: 800;
}
.cards > .card > .data > span > span:last-child {
  font-size: 0.75rem;
  font-weight: 400;
}
</style>
