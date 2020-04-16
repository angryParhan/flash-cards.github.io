<template>
  <section>
    <div class="addBlock">
      <div class="item">
        <h2>Word</h2>
        <input type="text" maxlength="30" ref="word" v-model="newWord">
      </div>
      <div class="item">
        <h2>Translation</h2>
        <input type="text" maxlength="30" ref="translationEl" v-model="translation">
      </div>
    </div>
    <button @click="addCard">ADD</button>
  </section>
</template>

<script>
  export default {
    name: "Edit",
    data () {
      return {
        newWord: '',
        translation: ''
      }
    },
    methods: {
      addCard () {
        if (this.newWord.trim() === '') {
          this.$refs.word.style['border-bottom-color'] = 'red'
        } else if (this.translation.trim() === '') {
          this.$refs.translationEl.style['border-bottom-color'] = 'red'
        } else {
          this.$refs.word.style['border-bottom-color'] = 'gray'
          this.$refs.translationEl.style['border-bottom-color'] = 'gray'
          this.$store.commit('addNewCard', { word: this.newWord, translation: this.translation} )
          this.newWord = ''
          this.translation = ''
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Lexend+Giga&display=swap');


  section {
    margin-top: 120px;
    text-align: center;
    button {
      margin-top: 90px;
      padding: 10px 30px;
      border: 1px solid green;
      border-radius: 20px;
      color: #0bab64;
      background: transparent;
    }

    input {
      display: block;
      width: 100%;
      border: none;
      border-bottom: 1px solid grey;
      background: transparent;
      color: black;
      border-radius: 0;
      box-shadow: none;
    }
  }

  h2 {
    font-family: 'Lexend Giga', sans-serif;
    font-size: 20px;
    color: darkgray;
    user-select: none;
  }

  .addBlock {
    max-width: 600px;
    height: 300px;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 30px 40px;

    .item {
      input {
        margin-top: 30px;
        padding-bottom: 10px;
        padding-left: 5px;
      }
    }
    .item:last-child {
      margin-top: 50px;
    }
  }

  @media all and (max-width: 640px){
    .addBlock {
      width: 80%;
    }
  }

</style>
