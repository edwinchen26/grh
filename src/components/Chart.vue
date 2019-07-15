<template>
  <div class="chartContainer">
    <div class="data" v-for="d in teams[data]" :key="d.id">
      <span class="name">{{ d.name }}</span>
      <span class="bar" :style="{ width: (d.totalRemuneration / highestRemuneration) * 100 + '%'}"></span>
      <span class="number">{{ d.totalRemuneration | toCurrency }}</span>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

const db = firebase.firestore();

export default {
  name: "Chart",
  props: {
    data: String
  },
  data() {
    return {
      highestRemuneration: 0,
      teams: {},
      selectedTeam: {}
    };
  },
  created() {
    this.teams["default"] = [];
    this.$binding(
      "default",
      db.collection("jobs").orderBy("totalRemuneration", "desc")
    ).then(jobs => {
      jobs.forEach(x => {
        this.teams.default.push(x);
      });
    });

    this.$binding(
      "jobs",
      db.collection("jobs").orderBy("totalRemuneration", "desc")
    ).then(jobs => {
      jobs.forEach(x => {
        if (!this.teams.hasOwnProperty(x.team)) {
          this.teams[x.team] = [];
        }
        this.teams[x.team].push(x);
      });

      const keys = Object.keys(this.teams);
      keys.forEach(key => {
        this.teams[key] = this.teams[key].slice(0, 10);
      });
    });
  },
  updated() {
    this.highestRemuneration = this.teams[this.data][0].totalRemuneration;
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
section.chart > .chartContainer {
  grid-area: chartContainer;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
section.chart > .chartContainer > .data {
  display: grid;
  grid-template-columns: 1fr 3fr auto;
  grid-gap: 10px;
  grid-template-areas: "name bar number";
  margin: 15px 0;
}
section.chart > .chartContainer > .data:first-child {
  margin-top: 0;
}
section.chart > .chartContainer > .data:last-child {
  margin-bottom: 0;
}
section.chart > .chartContainer > .data > .name {
  grid-area: name;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.4);
}
section.chart > .chartContainer > .data > .bar {
  width: 1%;
  transition: width 2s;
  grid-area: bar;
  border-radius: 50px;
  background: #667db6;
  background: -webkit-linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  );
  background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
}
section.chart > .chartContainer > .data > .number {
  grid-area: number;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
}
</style>
