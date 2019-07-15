<template>
  <div class="content">
    <h1>Departamentos</h1>
    <section class="add">
      <h2>Agregar departamento</h2>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <input
            id="teamName"
            type="text"
            v-model="data.name"
            required="required"
            autocomplete="off"
          />
          <label for="teamName">Nombre</label>
        </div>
        <div class="input">
          <input
            id="teamDescription"
            type="text"
            v-model="data.description"
            required="required"
            autocomplete="off"
          />
          <label for="teamDescription">Descripción</label>
        </div>
        <div class="input">
          <input
            id="budget"
            type="number"
            min="0"
            step="any"
            v-model.number="data.budget"
            required="required"
            autocomplete="off"
          />
          <label for="budget">Presupuesto</label>
        </div>
        <div class="input">
          <input
            id="totalRemuneration"
            type="number"
            min="0"
            step="any"
            v-model.number="initBudget"
            required="required"
            autocomplete="off"
            disabled
          />
          <label for="totalRemuneration">Remuneración total ofrecida</label>
        </div>
        <span
          v-if="data.budget < initBudget"
          class="alert"
        >Nuevo presupuesto es inferior a la remuneración total de este departamento</span>
        <div class="buttons">
          <button class="submit">Editar</button>
          <span class="delete" @click="deleteJob(id)">Eliminar</span>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import firebase from "../firebase";
const db = firebase.firestore();

export default {
  name: "AddJob",
  data() {
    return {
      data: {},
      initBudget: 0,
      isUnderBudget: false
    };
  },
  firestore() {
    return {
      data: db.collection("teams").doc(this.id)
    };
  },
  props: {
    id: String
  },
  created() {
    let temp = 0;
    this.$binding(
      "budget",
      db.collection("jobs").where("team", "==", this.id)
    ).then(jobs => {
      jobs.forEach(x => {
        temp = temp + x.totalRemuneration;
      });

      this.initBudget = temp;
    });
  },
  methods: {
    onSubmit() {
      const router = this.$router;

      const data = {
        name: this.data.name,
        description: this.data.description,
        budget: this.data.budget
      };

      if (this.data.budget < this.initBudget) {
        this.$binding(
          "reset",
          db.collection("jobs").where("team", "==", this.id)
        ).then(jobs => {
          jobs.forEach(x => {
            db.collection("jobs")
              .doc(x.id)
              .update({ totalRemuneration: 0 });
          });
        });
      }

      db.collection("teams")
        .doc(this.id)
        .update(data)
        .then(function() {
          router.push({ path: `/message/success/submit` });
        })
        .catch(function(error) {
          console.error(error);
          router.push({ path: `/message/failure/submit` });
        });
    },
    deleteJob(id) {
      this.$router.push({ path: `/message/delete-team/${id}` });
    }
  }
};
</script>

<style scoped>
main > .content {
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 3em;
  grid-template-areas: "title" "form";
}

section.add > h2 {
  margin-bottom: 1em;
}

.input {
  margin-bottom: 2.5em;
  position: relative;
}

.input > input[type="text"],
.input > input[type="number"],
.input > input[type="number"]:disabled {
  width: 50%;
  padding: 15px 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  outline: 0;
  border: 2px solid #ffffff;
}

.input > input[type="number"]:disabled {
  background: #f0f0f0;
  border-color: #f0f0f0;
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
.input > input[type="number"]:valid + label,
.input > input[type="number"]:disabled + label {
  font-size: 0.85rem;
  top: calc(0% - 15px);
  left: 20px;
  color: #676767;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  cursor: default;
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

span.alert {
  color: #c0392b;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
