<template>
  <div class="App" id="app">
    <div v-show="!isHome" class="App__Nav" id="nav">
      <router-link to="/">Go Back</router-link>
    </div>
    <b-container class="App__Container">
      <router-view />
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    isHome() {
      return this.$route.path === '/'
    }
  }
}
</script>
<style lang="scss">
.App {
  &__Nav {
    margin: 10px;
  }
  &__Container {
    display: flex;
    margin: 20px;
    justify-content: center;
  }
}
</style>
