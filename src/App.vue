<template>
  <div class="App" id="app">
    <div class="App__Nav" id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <b-container class="App__Container">
      <router-view />
    </b-container>
  </div>
</template>
<style lang="scss">
.App {
  &__Container {
    display: flex;
    justify-content: center;
  }
}
</style>
