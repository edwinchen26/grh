<template>
  <div class="content">
    <h1>Departamentos</h1>
    <section class="table">
      <router-link tag="div" class="button" :to="{ path: 'add'}" append>Agregar departamento</router-link>
      <div class="container">
        <div class="data heading">
          <span>Departamento</span>
          <span>Descripción</span>
          <span>Presupuesto actual</span>
          <span>Puestos</span>
        </div>
        <router-link
          :to="{ path: `edit/${team.id}` }"
          tag="div"
          class="data"
          v-for="team in teams"
          :key="team.id"
          append
        >
          <span>{{ team.name }}</span>
          <span>{{ team.description }}</span>
          <span>{{ team.budget | toCurrency }}</span>
          <span>{{ count[team.id] ? count[team.id] : '0' }}</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "../firebase";
const firestore = firebase.firestore();

export default {
  name: "Teams",
  data() {
    return {
      count: {}
    };
  },
  firestore() {
    return {
      teams: firestore.collection("teams").orderBy("name", "asc")
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
  },
  beforeCreate() {
    let teams = [];

    this.$binding("jobs", firestore.collection("jobs")).then(jobs => {
      jobs.forEach(x => {
        teams.push(x.team);
      });

      teams.forEach(i => {
        this.count[i] = (this.count[i] || 0) + 1;
      });
    });
  }
};
</script>


<style scoped>
main > .content {
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 3em;
  grid-template-areas: "title" "table";
}

.content > section.table {
  grid-area: table;
  width: 100%;
}

section.table > .button {
  display: inline-block;
  padding: 15px 20px;
  color: #ffffff;
  outline: 0;
  border: 0;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
}

section.table > .container {
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column;
}

section.table > .container > .data {
  display: grid;
  grid-template-columns: 1fr 2fr repeat(2, minmax(auto, 15%));
}
section.table > .container > .data > span {
  padding: 20px 10px;
}
section.table > .container > .data:not(.heading) {
  color: #707070;
}
section.table > .container > .data:not(.heading):nth-child(2n-1) {
  background: #f7f7f7;
}
section.table > .container > .data:not(.heading):hover {
  background: #ececec;
  cursor: pointer;
}
section.table > .container > .data.heading {
  border-bottom: 1px solid #cccccc;
}
section.table > .container > .data.heading > span {
  color: #4b4b4b;
  font-weight: 600;
}
</style>

