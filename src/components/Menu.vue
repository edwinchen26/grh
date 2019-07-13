<template>
  <menu>
    <div class="logo">Logo</div>
    <ul>
      <router-link tag="li" active-class="active" to="/" exact>
        <i class="fas fa-chart-line"></i> Vista General
      </router-link>
      <router-link tag="li" active-class="active" to="/jobs">
        <i class="fas fa-briefcase"></i> Puestos
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
  padding: 0;
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-gap: 40px;
  grid-template-areas: "logo" "items";
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.1);
  z-index: 10;
}

.logo {
  grid-area: logo;
  font-size: 2rem;
  font-weight: 800;
  line-height: 70px;
  padding-left: 15px;
}

ul {
  grid-area: items;
  width: 75%;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
}
ul > li {
  width: 100%;
  font-size: 0.95rem;
  font-weight: 400;
  padding: 15px;
  margin-bottom: 5px;
  border-radius: 50px;
  color: #3b3b3b;
  cursor: pointer;
}

ul > li:hover {
  background: #f7f7f7;
}
ul > li.active {
  background: #f0f0f0;
  font-weight: 600;
}
ul > li > i {
  margin: 0 10px;
}
</style>
