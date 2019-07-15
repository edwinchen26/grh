<template>
  <div class="content">
    <h1>Mensaje</h1>
    <section class="message">
      <span>{{ this.message }}</span>
      <div class="buttons">
        <button class="confirm" @click="goTo(destination)">Confirmar</button>
        <span class="back" v-if="this.isDoubleCheck" @click="goTo(-1)">Volver</span>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "../firebase";

const admin = require("firebase/app");
const db = firebase.firestore();

export default {
  name: "Message",
  data() {
    return {
      message: "",
      isDoubleCheck: false,
      destination: -2,
      data: []
    };
  },
  props: {
    type: String,
    id: String
  },
  created() {
    if (this.type == "delete-job" && this.id) {
      this.message = "¿Desea eliminar esta información?";
      this.isDoubleCheck = true;
      this.$binding("data", db.collection("jobs").doc(this.id));
    }
    if (this.type == "delete-team" && this.id) {
      this.message = "¿Desea eliminar este departamento?";
      this.isDoubleCheck = true;
      this.$binding("data", db.collection("teams").doc(this.id));
    }
    if (this.type == "success" && this.id == "edit") {
      this.message = "¡Información editada con éxito!";
    }
    if (this.type == "success" && this.id == "submit") {
      this.message = "¡Información agregada con éxito!";
    }
    if (this.type == "failure") {
      this.message = "Lo sentimos, hubo un error.";
      this.destination = -1;
    }
  },
  methods: {
    goTo(path) {
      if (path != -1) {
        if (this.type == "delete-job" && this.id) {
          const increment = admin.firestore.FieldValue.increment(
            this.data.totalRemuneration
          );

          db.collection("teams")
            .doc(this.data.team)
            .update({ budget: increment });

          db.collection("jobs")
            .doc(this.id)
            .delete();
        }
        if (this.type == "delete-team" && this.id) {
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

          db.collection("teams")
            .doc(this.id)
            .delete();
        }
      }
      this.$router.go(path);
    }
  }
};
</script>

<style scoped>
main > .content {
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 3em;
  grid-template-areas: "title" "message";
}

section.message {
  grid-area: message;
}

.message > span {
  font-size: 1.25em;
  font-weight: 500;
}

.buttons {
  display: flex;
  flex-flow: row nowraps;
  margin: 1em 0;
}

.buttons > button.confirm {
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

.buttons > span.back {
  align-self: center;
  color: rgba(0, 0, 0, 0.5);
  border: 0;
  font-weight: 500;
  cursor: pointer;
}
</style>
