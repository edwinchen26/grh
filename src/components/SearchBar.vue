<template>
  <div class="search">
      <input type="text" placeholder="Buscar puesto">
      <span class="icon"><i class="fas fa-search"></i></span>
  </div>
</template>

<style scoped>
.search{
  grid-area: search;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'iconSearch inputSearch';
}
.search > span.icon{
  grid-area: iconSearch;
  width: 28px;
  height: 100%;
  padding: 0 5px;
  border-radius: 10px 0 0 10px;
  font-size: .95rem; font-weight: 500;
  background: #F1F1F1;
  color: rgba(0, 0, 0, .2);
  position: relative;
}
.search > span.icon > i{ position: absolute; top: 50%; right: 0; transform: translateY(-50%); }
.search > input[type=text]{
  grid-area: inputSearch;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border: 0; outline: 0;
  border-radius: 0 10px 10px 0;
  font-size: .95rem; font-weight: 500;
  color: rgba(0, 0, 0, .5);
  background: #F1F1F1;
}
.search > input[type=text]::placeholder{ color: rgba(0, 0, 0, .2); }
.search > input[type=text]:not(:placeholder-shown) + span.icon{ color: rgba(0, 0, 0, .5); }
</style>
