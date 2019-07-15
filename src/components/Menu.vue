<template>
  <menu>
    <div class="logo">
      <img src="../static/logo.svg" alt="Logo" />
    </div>
    <ul>
      <router-link tag="li" active-class="active" to="/" exact>
        <i class="fas fa-chart-line"></i>
      </router-link>
      <router-link tag="li" active-class="active" to="/jobs">
        <i class="fas fa-user-tie"></i>
      </router-link>
      <router-link tag="li" active-class="active" to="/teams">
        <i class="fas fa-briefcase"></i>
      </router-link>

      <!-- <li><i class="fas fa-donate"></i> Remuneración</li>
      <li><i class="fas fa-gift"></i> Beneficios</li>
      <li><i class="fas fa-hand-holding-heart"></i> Otros</li>
      <li><i class="fas fa-handshake"></i> Socios</li>-->
    </ul>
  </menu>
</template>

<style scoped>
menu {
  grid-area: menuSection;
  background: #ffffff;
  margin: 0;
  padding: 0 25px;
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-gap: 40px;
  grid-template-areas: "logo" "items";
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.1);
  z-index: 10;
}

.logo {
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo > img {
  width: 100%;
  max-width: 48px;
  height: auto;
}

ul {
  grid-area: items;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
}
ul > li {
  margin-bottom: 5px;
  color: #3b3b3b;
  cursor: pointer;
  border-radius: 50%;
}

ul > li:hover {
  background: #f7f7f7;
}

ul > li.active {
  background: #f0f0f0;
  font-weight: 600;
}

ul > li > i {
  font-size: 1.5em;
  padding: 15px;
  border-radius: 50%;
  text-align: center;
}
</style>
