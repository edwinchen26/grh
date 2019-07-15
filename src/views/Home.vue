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
      <h2>Listado por beneficios (10)</h2>
      <div class="box">
        <ol>
          <li v-for="(job, index) in topGrossRemuneration" :key="index">{{ job.name }}</li>
        </ol>
      </div>
    </section>

    <section class="chart">
      <h2>Gráfico general de remuneraciones</h2>
      <div class="radio_button">
        <input type="radio" id="default" value="default" v-model="selectedTeam" name="selectTeam" />
        <label for="default">General</label>
      </div>
      <div class="radio_button" v-for="team in teams" :key="team.id">
        <input type="radio" :id="team.id" :value="team.id" v-model="selectedTeam" name="selectTeam" />
        <label :for="team.id">{{ team.name }}</label>
      </div>
      <Chart :data="selectedTeam" />
    </section>
  </div>
</template>

<script>
import Card from "../components/Card";
import Chart from "../components/Chart";
import firebase from "../firebase";

const db = firebase.firestore();

export default {
  name: "Home",
  components: { Card, Chart },
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
      });

    setTimeout(() => {
      this.selectedTeam = "default";
    }, 1000);
  },
  data() {
    return {
      jobsCounter: 0,
      averageBenefits: 0,
      totalRemuneration: 0,
      selectedTeam: ""
    };
  },
  firestore() {
    return {
      teams: db.collection("teams"),
      topGrossRemuneration: db
        .collection("jobs")
        .orderBy("totalRemuneration", "desc")
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

.content > section.report {
  grid-area: report;
  width: 100%;
}
section.report > .cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 40px;
}

.content > section.listing {
  grid-area: listing;
}
section.listing > .box {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

section.listing > .box > ol > li {
  margin: 10px 0;
}

.content > section.chart {
  grid-area: chart;
}

.radio_button {
  display: inline-block;
  margin: 10px 5px 30px 5px;
}
.radio_button:first-of-type {
  margin-left: 0;
}
.radio_button > input[type="radio"] {
  display: none;
}
.radio_button > label {
  padding: 10px 15px;
  color: #b7b7b7;
  border: 2px solid #b7b7b7;
  border-radius: 50px;
  cursor: pointer;
}
.radio_button > input[type="radio"]:checked + label {
  color: #4481eb;
  border: 2px solid #4481eb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>



