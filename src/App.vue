<template>
  <div class="container">
    <Menu />
    <main>
      <header>
        <SearchBar />
        <Profile />
      </header>

      <router-view />
    </main>
  </div>
</template>

<script>
import Menu from "./components/Menu";
import SearchBar from "./components/SearchBar";
import Profile from "./components/Profile";

export default {
  name: "app",
  components: { Menu, SearchBar, Profile }
};
</script>

<style>
* {
  box-sizing: border-box;
  font: 400 16px/1em "Poppins", sans-serif;
  font-size: calc(12px + (16 - 12) * ((100vw - 300px) / (1920 - 300)));
}
body {
  margin: 0;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  color: #464646;
}
h2 {
  font-size: 1.25rem;
  font-weight: 500;
  color: #a5a5a5;
  margin-top: 0;
}

header {
  grid-area: topBar;
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "search profile";
  grid-gap: 10px;
  padding: 10px;
  box-shadow: 0 0 5px rgba(140, 140, 140, 0.05);
}

body > .container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 2fr;
  grid-template-areas: "menuSection mainSection";
}

body > .container > main {
  grid-area: mainSection;
  background: #e8ecf1;
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-gap: 40px;
  grid-template-areas: "topBar" "contentSection";
}

main > .content {
  height: auto;
  grid-area: contentSection;
  padding: 0 50px 40px 50px;
  display: grid;
}

main > .content > h1 {
  grid-area: title;
}
</style>
