<template>
  <div id="app">
    <view-page />
  </div>
</template>

<script>
// import Test from './components/Test'
import ViewPage from './view/index'

export default {
  name: 'App',
  components: {
    ViewPage
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
