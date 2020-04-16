const STORAGE_KEY = 'Cards-store'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [],
    currentId: ''
  },
  mutations: {
    setState (state) {
      state.cards = JSON.parse(localStorage.getItem(STORAGE_KEY) || [])
    },
    addNewCard (state, payload) {
      const newItem = {
        id: `f${(~~(Math.random()*1e8)).toString(16)}`,
        word: payload.word,
        translation: payload.translation
      }
      state.cards.push(newItem)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cards))
    },
    deleteCard (state) {
      const idx = state.cards.findIndex(item => item.id === state.currentId )
      state.cards.splice(idx, 1)
      state.currentId = ''
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cards))
    },
    setCurrentId (state, id) {
      state.currentId = id
    },
    editCard (state, payload) {
      const idx = state.cards.findIndex(item => item.id === state.currentId )
      state.cards[idx].word = payload.word
      state.cards[idx].translation = payload.translation
      state.currentId = ''
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cards))
    }
  },
  getters: {
    getCards (state) {
      return state.cards
    },
    getCurrentId (state) {
      return state.currentId
    }
  }
})
