<template>
  <div class="content">
    <span class="ed">{{ ed }}</span>
    <h1>Puestos de trabajo</h1>
    <section class="add">
      <h2>Editar puesto</h2>
      <form @submit.prevent="onSubmit">
        <div class="inputs">
          <div class="input">
            <input
              id="jobName"
              type="text"
              v-model="data.name"
              required="required"
              autocomplete="off"
            />
            <label for="jobName">Nombre</label>
          </div>
          <div class="input">
            <input
              id="jobDescription"
              type="text"
              v-model="data.description"
              required="required"
              autocomplete="off"
            />
            <label for="jobDescription">Descripción</label>
          </div>
        </div>
        <div class="team">
          <h2>Seleccione un departamento</h2>
          <div class="radio_button" v-for="team in teams" :key="team.id">
            <input
              type="radio"
              :checked="team.id == data.team"
              :id="team.id"
              name="selectTeam"
              @click="getTeamInfo(team.id)"
              required="required"
            />
            <label :for="team.id">{{ team.name }}</label>
          </div>
          <div class="budget">
            <h2>Presupuesto disponible:</h2>
            <span v-if="initialTeam.length == 0">{{ 0 | toCurrency }}</span>
            <span v-else :class="{ overBudget: isOverBudget }">{{ this.tempBudget | toCurrency }}</span>
          </div>
        </div>
        <div class="benefits">
          <div class="actions">
            <label>Beneficios ({{ inputs.length }})</label>
            <div class="button add" @click="addInput()">+</div>
            <div class="button remove" @click="deleteInput()">-</div>
          </div>
          <div class="newBenefit" v-for="(input, index) in inputs" :index="index" :key="index">
            <span class="remove" title="Eliminar" @click="deleteInput(index)">-</span>
            <span class="counter">{{ index + 1 }}</span>
            <div class="input">
              <input
                :id="'name' + index"
                type="text"
                v-model="input.name"
                required="required"
                autocomplete="off"
              />
              <label :for="'name' + index">Nombre</label>
            </div>
            <div class="input">
              <input
                :id="'description' + index"
                type="text"
                v-model="input.description"
                required="required"
                autocomplete="off"
              />
              <label :for="'description' + index">Descripción</label>
            </div>
            <div class="input">
              <input
                :id="'amount' + index"
                type="number"
                min="0"
                step="any"
                v-model.number="input.amount"
                @keyup="budgetLeft()"
                required="required"
                autocomplete="off"
              />
              <label :for="'amount' + index">Remuneración</label>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="submit">Guardar</button>
          <span class="delete" @click="deleteJob(data.id)">Eliminar</span>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import firebase from "../firebase";
const firestore = firebase.firestore();

export default {
  name: "EditJob",
  firestore() {
    return {
      data: firestore.collection("jobs").doc(this.id),
      initialTeam: firestore.collection("teams").doc(this.team),
      teams: firestore.collection("teams").orderBy("name", "asc"),
      selectedTeam: firestore.collection("teams").doc(this.team),
      oldTeam: firestore.collection("teams").doc(this.team)
    };
  },
  data() {
    return {
      data: [],
      inputs: [],
      selectedTeam: {
        id: "",
        name: "",
        description: "",
        budget: 0
      },
      tempBudget: 0,
      isOverBudget: false,
      ed: 0
    };
  },
  props: {
    id: String,
    team: String
  },
  created() {
    this.$binding("data", firestore.collection("jobs").doc(this.id)).then(
      data => {
        this.inputs = [...data.benefits];
      }
    );
  },
  methods: {
    addInput() {
      this.inputs.push({
        name: "",
        description: "",
        amount: ""
      });
    },
    deleteInput(index) {
      if (index == null) {
        if (this.inputs.length > 0) this.inputs.pop();
      } else this.inputs.splice(index, 1);
    },
    onSubmit() {
      const router = this.$router;

      if (this.tempBudget >= 0) {
        let totalRemuneration = 0;
        this.inputs.forEach(item => {
          totalRemuneration = totalRemuneration + parseInt(item.amount);
        });
        this.data.totalRemuneration = totalRemuneration;
        this.data.team = this.selectedTeam.id;

        // eslint-disable-next-line
        const { benefits, ...newData } = this.data;

        this.$firestore.data
          .update({ ...newData, benefits: [...this.inputs] })
          .then(function() {
            router.push({ path: `/message/success/edit` });
          })
          .catch(function(error) {
            console.error(error);
            router.push({ path: `/message/failure/submit` });
          });

        if (this.initialTeam.id != this.selectedTeam.id) {
          this.$firestore.initialTeam.update({
            budget: this.initialTeam.budget + this.data.totalRemuneration
          });
        }

        this.$firestore.selectedTeam.update({
          budget: this.tempBudget
        });
      } else {
        router.push({ path: `/message/failure/submit` });
      }
    },
    getTeamInfo(id) {
      this.$binding("selectedTeam", firestore.collection("teams").doc(id));
      if (this.initialTeam.length == 0) this.initialTeam.push(".");
      setTimeout(() => {
        this.ed = Math.random();
        this.budgetLeft();
      }, 50);
    },
    budgetLeft() {
      const totalBudget = this.selectedTeam.budget;
      const totalRemuneration = this.data.totalRemuneration;

      let tempRemuneration = 0;
      this.inputs.forEach(item => {
        let n = item.amount == "" ? 0 : parseInt(item.amount);
        tempRemuneration = tempRemuneration + n;
      });

      if (this.selectedTeam.id == this.data.team) {
        this.tempBudget = totalBudget + totalRemuneration - tempRemuneration;
      } else {
        this.tempBudget = totalBudget - tempRemuneration;
      }

      this.isOverBudget = totalBudget - tempRemuneration < 0 ? true : false;
      return this.tempBudget;
    },
    deleteJob(id) {
      this.$router.push({ path: `/message/delete-job/${id}` });
    }
  },
  updated() {
    this.budgetLeft();
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
.ed {
  display: none;
}
main > .content {
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 3em;
  grid-template-areas: "title" "form";
}

section.add {
  grid-area: form;
}

section.add > h2 {
  margin-bottom: 1em;
}

form {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "inputs inputs team" "benefits benefits benefits" "submit . .";
  grid-gap: 40px;
}

.team {
  grid-area: team;
}

.team > h2 {
  font-size: 1rem;
  color: #676767;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
}

.team > .radio_button {
  display: inline-block;
  margin: 20px 5px;
}
.team > .radio_button:first-of-type {
  margin-left: 0;
}
.team > .radio_button > input[type="radio"] {
  display: none;
}
.team > .radio_button > label {
  padding: 10px 15px;
  color: #b7b7b7;
  border: 2px solid #b7b7b7;
  border-radius: 50px;
  cursor: pointer;
}
.team > .radio_button > input[type="radio"]:checked + label {
  color: #4481eb;
  border: 2px solid #4481eb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.team > .budget > h2 {
  margin: 2em 0 1em 0;
  font-size: 1rem;
  color: #676767;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
}

.team > .budget > span {
  font-size: 2em;
  font-weight: 600;
}

.team > .budget > span.overBudget {
  color: #f00;
}

.inputs {
  grid-area: inputs;
}

.input {
  margin: 2.5em 0;
  position: relative;
}

.input > input[type="text"],
.input > input[type="number"] {
  width: 100%;
  padding: 15px 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  outline: 0;
  border: 2px solid #ffffff;
}

.input > input[type="text"] + label,
.input > input[type="number"] + label {
  position: absolute;
  top: 11px;
  left: 21px;
  font-weight: 400;
  margin: 10px 0;
  color: #9e9e9e;
  font-style: italic;
  cursor: text;
  transition: top 0.5s, left 0.5s, font-size 0.6s;
}

.input > input[type="text"]:valid + label,
.input > input[type="number"]:valid + label {
  font-size: 0.85rem;
  top: calc(0% - 15px);
  left: 20px;
  color: #676767;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  cursor: default;
}

.benefits {
  grid-area: benefits;
  display: flex;
  flex-flow: column;
}

.benefits > .actions {
  display: flex;
  flex-flow: rows nowrap;
}

.benefits > .actions > * {
  padding: 10px 15px;
  margin: 0 5px;
}

.benefits > .actions > label {
  color: #676767;
  font-weight: 600;
  padding: 10px 0;
}

.benefits > .actions > .button {
  font-size: 1.25em;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
}

.benefits > .actions > .button {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(87, 108, 117, 1) 0%,
    rgba(37, 50, 55, 1) 100.2%
  );
}
.benefits > .actions > .button.remove {
  opacity: 0.85;
}

.newBenefit {
  display: grid;
  grid-template-columns: auto 20px 1fr 2fr 1fr;
  grid-gap: 20px;
}

.newBenefit > .input {
  margin: 1em 0;
}

.newBenefit > span.counter {
  font-weight: 600;
  font-size: 1.25em;
  color: rgba(0, 0, 0, 0.5);
  align-self: center;
}
.newBenefit > span.counter:after {
  content: ".";
}

.newBenefit > span.remove {
  align-self: center;
  padding: 5px 10px;
  font-size: 1em;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  flex-flow: row nowraps;
  margin: 2em 0;
}

.buttons > button.submit {
  padding: 15px 20px;
  margin: 2em 25px 2em 0;
  color: #ffffff;
  border: 0;
  outline: 0;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
}

.buttons > span.delete {
  align-self: center;
  color: rgba(0, 0, 0, 0.5);
  border: 0;
  font-weight: 500;
  cursor: pointer;
}
</style>

