<template>
  <div class="content">
    <h1>Mensaje</h1>
    <section class="message">
      <span>{{ this.message }}</span>
      <div class="buttons">
        <button class="confirm" @click="goTo(destination)">Confirmar</button>
        <span class="back" v-if="this.isDoubleCheck" @click="goTo('...')">Volver</span>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "../firebase";
const db = firebase.firestore();

export default {
  name: "Message",
  data() {
    return {
      message: "",
      isDoubleCheck: false,
      destination: "/"
    };
  },
  props: {
    type: String,
    data: String
  },
  created() {
    if (this.type == "delete" && this.data) {
      this.message = "¿Está seguro que quiere eliminar esta información?";
      this.isDoubleCheck = true;
      this.destination = "/jobs";
    }
    if (this.type == "success" && this.data == "edit") {
      this.message = "¡Información editada con éxito!";
      this.destination = "/jobs";
    }
    if (this.type == "success" && this.data == "submit") {
      this.message = "¡Información agregada con éxito!";
      this.destination = "/jobs";
    }
    if (this.type == "failure") {
      this.message = "Lo sentimos, hubo un error.";
      this.destination = "...";
    }
  },
  methods: {
    goTo(path) {
      if (path == "...") {
        this.$router.go(-1);
      } else {
        if (this.type == "delete" && this.data) {
          db.collection("jobs")
            .doc(this.data)
            .delete();
        }
        this.$router.push({ path: path });
      }
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
