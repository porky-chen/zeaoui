<template>
  <div id="app">
    <Test/>
  </div>
</template>

<script>
import Test from './components/Test'

export default {
  name: 'App',
  components: {
    Test
  }
}
</script>

<style lang="sass">
@import './sass/app';
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
</style>
