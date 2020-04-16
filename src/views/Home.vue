<template>
  <section>
    <div class="welcome-container" v-if="!cards.length">
        <h1>Welcome to Flash-cards app!<br>Enjoy your learning!<br>Click bellow to add your first card!</h1>
    </div>

    <div class="btn-block"  v-if="!cards.length">
      <router-link to="/add" tag="button" class="addCard"></router-link>
    </div>
    <div class="user-container" v-else>
      <div class="container-flex">
        <div class="col">
          <button class="btn" @click="shakeArr">SHAKE</button>
        </div>
        <div class="col">
          <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="germanFirst"/>
          <label class="custom-control-label" for="customSwitch1">German first</label>
        </div>
        <div class="col">
          <input type="checkbox" class="custom-control-input" id="customSwitch2" v-model="voiceMode"/>
          <label class="custom-control-label" for="customSwitch2">Voice Mode</label>
        </div>
        <div class="col">
          <router-link to="/add" tag="button" class="btn">ADD CARD</router-link>
        </div>
      </div>
      <div class="custom-container">
        <div class="item flip-card" v-for="(card, i) in cards" :key="i" :ref="`card${i}`" @click="showGermanWord(i, card)" v-longclick="() => onLongPressStart(`card${i}`, i, card.id)"
        >
          <div class="flip-card-inner" ref="germanWord">
            <div class="flip-card-front" :class="{'text-style' : germanFirst, 'text-style-urk' : !germanFirst}">
              <p class="GermanText longWordBreak">{{ germanFirst ? card.word : card.translation }}</p>
            </div>
            <div class="flip-card-back" :class="{'text-style' : !germanFirst, 'text-style-urk' : germanFirst}">
              <p class="longWordBreak">{{ germanFirst ? card.translation : card.word }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-window
        v-if="modelShow"
        :topValue="top"
        :leftValue="left"
        @cancel="cancelAction"
        @edit="editAction"
        @delete="deleteAction"
        confirmMessage="Do you really want do delete?"
    ></modal-window>

  </section>
</template>

<script>

  import modalWindow from '../components/dialogWindow'

  export default {
    layout: "default",
    data() {
      return {
        germanFirst: false,
        voiceMode: true,
        modelShow: false,
        top: '',
        left: '',
      }
    },
    components: {
      modalWindow
    },
    computed: {
      cards () {
        return this.$store.getters.getCards
      }
    },
    methods: {
      showGermanWord(item, word) {
        this.$refs.germanWord[item].classList.add("showBack");
        setTimeout(() => {
          this.$refs.germanWord[item].classList.remove("showBack");
        }, 1000);
        if (this.voiceMode === true) {
          let pause = this.germanFirst ? 0 : 300
          setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(word.word)
            utterance.voice = window.speechSynthesis.getVoices().filter(v => v.lang == "de-DE")[0]
            utterance.volume = 1
            speechSynthesis.speak(utterance)
          }, pause)
        }
      },
      shakeArr() {
        let newPos;
        let temp;
        for (let i = this.cards.length - 1; i > 0; i--) {
          newPos = Math.floor(Math.random() * (i + 1))
          temp = this.cards[i]
          this.cards[i] = this.cards[newPos]
          this.cards[newPos] = temp
        }
        this.$forceUpdate()
      },
      onLongPressStart (name, i, id) {
        this.$store.commit('setCurrentId', id)
        let isMobile = {
          Android: function() {
            return navigator.userAgent.match(/Android/i)
          },
          BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
          },
          iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
          },
          Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
          },
          Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
          },
          any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
          }
        }

        let coordinates = {
          x: 90,
          y: 90
        }

        if(isMobile.any()) {
          if (i % 3 === 2) {
            coordinates.x = 5
            coordinates.y = 110
          } else {
            coordinates.x = 70
          }
        }

        document.body.style.overflow = 'hidden'
        this.top = Math.abs(window.scrollY - this.$refs[name][0].offsetTop) - coordinates.y + 'px'
        this.left = this.$refs[name][0].offsetLeft + coordinates.x + 'px'
        this.modelShow = true

      },
      cancelAction () {
        document.body.style.overflow = 'visible'

        this.modelShow = false
      },
      editAction () {
        document.body.style.overflow = 'visible'
        this.$router.push('/edit')
        this.modelShow = false
      },
      deleteAction () {
        document.body.style.overflow = 'visible'
        this.$store.commit('deleteCard')
        this.modelShow = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Comfortaa&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');

  section {
    margin-top: 100px;
    user-select: none;
  }

  .welcome-container {
    max-width: 600px;
    text-align: center;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 30px 40px;
    h1 {
      line-height: 60px;
      font-family: 'Courgette', cursive;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .btn-block {
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 3rem;
  }

  .addCard {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: white;
    background: #0bab64;
    box-shadow: 0px 0px 18px 0px rgba(162,199,162,1);
  }

  .addCard::before {
    content: '+';
    position: absolute;
    top: -3px;
    left: 24px;
    color: white;
    font: {
      family: "Open Sans", Helvetica, arial, sans-serif;
      size: 60px;
    }
  }

  .longWordBreak {
    word-break: break-word;
  }

  .container-flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  input[type=checkbox] + label {
    margin: 0.2em;
    cursor: pointer;
    padding: 0.2em;
  }

  .btn {
    background: transparent;
    border: 1px solid green;
    padding: 10px 30px;
    border-radius: 300px;
    color: #0bab64;
  }

  input[type=checkbox] {
    display: none;
  }

  .col {
    position: relative;
  }

  input[type=checkbox] + label:before {
    content: "\2714";
    border: 0.1em solid #000;
    border-radius: 0.2em;
    display: inline-block;
    width: 1em;
    height: 1em;
    padding-left: 0.2em;
    padding-bottom: 0.3em;
    margin-right: 0.2em;
    vertical-align: bottom;
    color: transparent;
    transition: .2s;
    position: absolute;
    left: -20px;
    top: -5px;
  }

  input[type=checkbox] + label:active:before {
    transform: scale(0);
  }

  input[type=checkbox]:checked + label:before {
    background-color: MediumSeaGreen;
    border-color: MediumSeaGreen;
    color: #fff;
  }

  input[type=checkbox]:disabled + label:before {
    transform: scale(1);
    border-color: #aaa;
  }

  input[type=checkbox]:checked:disabled + label:before {
    transform: scale(1);
    background-color: #bfb;
    border-color: #bfb;
  }

  .custom-container {
    margin-top: 2rem;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
  }
  .item {
    height: 100px;
    width: 150px;
    margin: 10px;
    text-align: center;
    cursor: pointer;
  }
  .flip-card-back p {
    margin-top: 25%;
  }
  .GermanText {
    margin-top: 26%
  }

  .flip-card {
    background-color: transparent;
    perspective: 1000px;
  }

  .flip-card-inner {
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .showBack {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-card-front {
    background-color: white;
    border: 1px solid rgb(83, 164, 81);
    color: black;
  }

  .flip-card-back {
    background-color: rgb(83, 164, 81);
    color: white;
    transform: rotateY(180deg);
  }
  .col {
    text-align: center;
  }
  .text-style {
    font-family: 'Raleway', sans-serif;
  }
  .text-style-urk {
    font-family: 'Comfortaa', cursive;
    font-size: 14px;
  }
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .custom-container {
      grid-template-columns: repeat(3, 1fr);
    }
    .item {
      height: 70px;
      width: 95px;
    }

    .welcome-container {
      width: 90%;
    }

    .container-flex {
      flex-direction: column;
    }

    .col {
      margin-top: 20px;
    }

    h1 {
      font-size: 18px !important;
      line-height: 40px !important;
    }

  }
</style>
