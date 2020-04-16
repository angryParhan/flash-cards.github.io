<template>
  <section>
    <div class="editBlock">
      <div class="item">
        <h2>Word</h2>
        <input type="text" maxlength="30" ref="currentWord" v-model="currentWord">
      </div>
      <div class="item">
        <h2>Translation</h2>
        <input type="text" maxlength="30" ref="currentTranslationEl" v-model="currentTranslation">
      </div>
    </div>
    <button @click="editCard">Edit</button>
  </section>
</template>

<script>
  export default {
    name: "Edit",
    data () {
      return {
        currentWord: '',
        currentTranslation: ''
      }
    },
    created () {
      const idx = this.allCards.findIndex(item => item.id === this.$store.getters.getCurrentId )
      this.currentWord = this.allCards[idx].word
      this.currentTranslation = this.allCards[idx].translation

    },
    computed: {
      allCards () {
        return this.$store.getters.getCards
      }
    },
    methods: {
      editCard () {
        if (this.currentWord.trim() === '') {
          this.$refs.currentTranslationEl.style['border-bottom-color'] = 'gray'
          this.$refs.currentWord.style['border-bottom-color'] = 'red'
        } else if (this.currentTranslation.trim() === '') {
          this.$refs.currentWord.style['border-bottom-color'] = 'gray'
          this.$refs.currentTranslationEl.style['border-bottom-color'] = 'red'
        } else {
          this.$store.commit('editCard', { word: this.currentWord, translation: this.currentTranslation} )
          this.currentWord = ''
          this.currentTranslation = ''
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
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

    h2 {
      font-family: 'Lexend Giga', sans-serif;
      font-size: 20px;
      color: darkgray;
      user-select: none;
    }

    .editBlock {
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
      .editBlock {
        width: 80%;
      }
    }
  }
</style>
