<template>
  <div class="content">
    <h1>Vista General</h1>
    <section class="report">
      <h2>Reportes</h2>
      <div class="cards">
        <Card
          title="Puestos en planilla"
          :value="this.jobsCounter"
          :isAverage="false"
          :isCurrency="false"
          icon="fa-briefcase"
        />
        <Card
          title="Beneficios por puesto"
          :value="this.averageBenefits"
          :isAverage="true"
          :isCurrency="false"
          icon="fa-hand-holding-heart"
        />
        <Card
          title="Gastos en remuneración"
          :value="this.totalRemuneration"
          :isAverage="true"
          :isCurrency="true"
          icon="fa-donate"
        />
      </div>
    </section>

    <section class="listing">
      <h2>Listado de puestos</h2>
      <div class="box">POR LLENAR</div>
    </section>

    <section class="chart">
      <h2>Gráfico de remuneraciones</h2>
      <div class="chartContainer">
        <div class="data" v-for="d in topRemuneration" :key="d.id">
          <span class="name">{{ d.name }}</span>
          <span
            class="bar"
            :style="{ width: (d.totalRemuneration / highestRemuneration) * 100 + '%'}"
          ></span>
          <span class="number">{{ d.totalRemuneration | toCurrency }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Card from "../components/Card";
import firebase from "../firebase";

const db = firebase.firestore();

export default {
  name: "Home",
  components: { Card },
  mounted() {
    let size = this.jobsCounter;
    let averageBenefits = this.averageBenefits;
    let totalRemuneration = this.totalRemuneration;

    db.collection("jobs")
      .get()
      .then(snap => {
        size = snap.size;
        snap.forEach(doc => {
          averageBenefits = averageBenefits + doc.data().benefits.length;
          totalRemuneration = totalRemuneration + doc.data().totalRemuneration;
        });
        averageBenefits = averageBenefits / size;
        averageBenefits = Math.round(averageBenefits);

        this.jobsCounter = size;
        this.averageBenefits = averageBenefits;
        this.totalRemuneration = totalRemuneration;
        this.highestRemuneration = this.topRemuneration[0].totalRemuneration;
      });
  },
  data() {
    return {
      jobsCounter: 0,
      averageBenefits: 0,
      totalRemuneration: 0,
      highestRemuneration: 0
    };
  },
  firestore() {
    return {
      topRemuneration: db
        .collection("jobs")
        .orderBy("totalRemuneration", "desc")
        .limit(10)
    };
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
main > .content {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto auto 1fr;
  grid-gap: 3em;
  grid-template-areas: "title title" "report listing" "chart listing";
}

/* Section: reports */
.content > section.report {
  grid-area: report;
  width: 100%;
}
section.report > .cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 40px;
}

/* Section: listing */
.content > section.listing {
  grid-area: listing;
}
section.listing > .box {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

/* Section: chart */
.content > section.chart {
  grid-area: chart;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: "title" "chartContainer";
}
section.chart > h2 {
  grid-area: title;
}
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



