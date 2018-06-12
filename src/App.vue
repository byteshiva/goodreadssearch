<template>
  <div id="app">
    <GoodRead msg=";Goodreads Search Center;"/>
  </div>
</template>

<script>
import GoodRead from './components/GoodRead.vue'

export default {
  name: 'app',
  components: {
    GoodRead
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1em;
}
</style>
