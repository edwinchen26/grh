<template>
  <div class="profile">
    <div class="icon"></div>
    <div class="name">
      Fernando Fernández
      <i class="fas fa-caret-down"></i>
    </div>
  </div>
</template>

<style scoped>
.profile {
  grid-area: profile;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.profile > .icon {
  width: 40px;
  height: 40px;
  background: #6bb9f0;
  border-radius: 50%;
  margin: 0 10px 0 30px;
  display: inline-block;
}
.profile > .name {
  margin: 0 30px 0 10px;
}
</style>
