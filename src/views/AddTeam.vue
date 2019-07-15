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
            v-model="teamName"
            required="required"
            autocomplete="off"
          />
          <label for="teamName">Nombre</label>
        </div>
        <div class="input">
          <input
            id="teamDescription"
            type="text"
            v-model="teamDescription"
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
            v-model.number="teamBudget"
            required="required"
            autocomplete="off"
          />
          <label for="budget">Presupuesto</label>
        </div>
        <button class="submit">Agregar</button>
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
      teamName: "",
      teamDescription: "",
      teamBudget: ""
    };
  },
  methods: {
    onSubmit() {
      const router = this.$router;

      const teamsRef = db.collection("teams").doc();
      const data = {
        id: teamsRef.id,
        name: this.teamName,
        description: this.teamDescription,
        budget: parseInt(this.teamBudget)
      };

      teamsRef
        .set(data)
        .then(function() {
          router.push({ path: `/message/success/submit` });
        })
        .catch(function(error) {
          console.error(error);
          router.push({ path: `/message/failure/submit` });
        });
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
.input > input[type="number"] {
  width: 50%;
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

button.submit {
  grid-area: submit;
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
</style>
