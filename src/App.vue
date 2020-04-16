<template>
  <div id="app">

    <headerBar title="Flash Cards"></headerBar>

    <transition name="fade"
                mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import headerBar from './components/header'

  export default {
    name: 'HelloWorld',
    components: {
      headerBar
    },
    created () {
      this.$store.commit('setState')
    },
    methods: {
      refresh () {
        this.$router.push('/about')
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>


