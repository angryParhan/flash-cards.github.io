<template>
 <header>
   <router-link tag="span" to="/">{{ title }}</router-link>
 </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: {
      type: String,
      default: 'Cards App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@600&display=swap');

  header {
    user-select: none;
    color: white;
    text-align: center;
    padding: 15px;
    background-color: #3bb78f;
    background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    font: {
      size: 40px;
      family: 'Teko', sans-serif;
    };
    letter-spacing: 4px;
    box-shadow: 0 1px 10px #999;
    span {
      cursor: pointer;
    }
  }
</style>
