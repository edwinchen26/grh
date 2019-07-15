<template>
  <div class="search">
    <input type="text" v-model="search" @input="onChange" placeholder="Buscar puesto" />
    <span class="icon">
      <i class="fas fa-search"></i>
    </span>

    <div class="options" v-if="isOpen">
      <div
        class="option"
        v-for="(result, i) in results"
        :key="i"
        @click="searchFor(result.id, result.team)"
      >{{ result.name }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

const db = firebase.firestore();

export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
      results: [],
      jobs: [],
      isOpen: false
    };
  },
  created() {
    this.$binding("jobs", db.collection("jobs"));
  },
  methods: {
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      this.results = this.jobs.filter(
        item =>
          item.name.toLowerCase().indexOf(this.$data.search.toLowerCase()) > -1
      );
    },
    searchFor(id, team) {
      this.isOpen = false;
      this.search = "";
      this.$router.push({ path: `/jobs/edit/${id}/${team}` });
    }
  }
};
</script>


<style scoped>
.search {
  grid-area: search;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "iconSearch inputSearch";
  position: relative;
}
.search > span.icon {
  grid-area: iconSearch;
  width: 28px;
  height: 100%;
  padding: 0 5px;
  border-radius: 10px 0 0 10px;
  font-size: 0.95rem;
  font-weight: 500;
  background: #f1f1f1;
  color: rgba(0, 0, 0, 0.2);
  position: relative;
}
.search > span.icon > i {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.search > input[type="text"] {
  grid-area: inputSearch;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border: 0;
  outline: 0;
  border-radius: 0 10px 10px 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  background: #f1f1f1;
}

.search > input[type="text"]:focus + span.icon,
.search > input[type="text"]:not(:placeholder-shown) + span.icon,
.search > input[type="text"]:focus,
.search > input[type="text"]:not(:placeholder-shown) {
  background: #ffffff;
  color: #000000;
  border: 1px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
}

.search > input[type="text"]:focus + span.icon,
.search > input[type="text"]:not(:placeholder-shown) + span.icon {
  border-right: 0;
}
.search > input[type="text"]:focus,
.search > input[type="text"]:not(:placeholder-shown) {
  border-left: 0;
}

.search > input[type="text"]::placeholder {
  color: rgba(0, 0, 0, 0.2);
}

.search > .options {
  width: 100%;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 99;
  overflow: hidden;
}

.search > .options > .option {
  background: #ffffff;
  padding: 20px 30px;
  cursor: pointer;
}

.search > .options > .option:first-child {
  background: #f7f7f7;
  font-weight: 500;
}

.search > .options > .option:hover {
  font-weight: 500;
}
</style>
