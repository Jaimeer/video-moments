import { auth } from '../setup/firebase'
const debug = require('debug')('APP::Store:User')

function generateCustomDisplayName(user) {
  return user.displayName || user.email || '--'
}

const state = {
  error: null,
  currentUser: null,
}

const getters = {}

const mutations = {
  SET_CURRENT_USER(state, { user }) {
    debug('SET_CURRENT_USER', user)
    if (user) {
      user.customDisplayName = generateCustomDisplayName(user)
    }
    state.currentUser = user
  },
  SET_LOGIN_ERROR(state, { error }) {
    debug('SET_LOGIN_ERROR', error)
    state.error = error
  },
}

const actions = {
  login({ commit, rootState }, { email, password }) {
    debug('login')
    auth
      .signInWithEmailAndPassword(email, password)
      .then(firebaseUser => {
        commit('SET_LOGIN_ERROR', { error: null })
        rootState.router.push({ name: 'events' })
      })
      .catch(error => {
        debug('User Login Error', error.message)
        commit('SET_LOGIN_ERROR', { error: error.message })
      })
  },
  autoLogin({ commit }) {
    debug('autoLogin')
    auth.onAuthStateChanged(async firebaseUser => {
      debug('AuthStateChanged', firebaseUser)
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          debug('Email is verified')
        } else {
          debug('Email is not verified')
        }
        commit('SET_CURRENT_USER', { user: firebaseUser })
      }
    })
  },
  logout({ commit, rootState, dispatch }) {
    debug('logout')
    auth.signOut().then(data => {
      commit('SET_CURRENT_USER', { user: null })
      rootState.router.push({ name: 'events' })
    })
  },
  cleanError({ commit, rootState }) {
    debug('cleanError')
    commit('SET_LOGIN_ERROR', { error: '' })
  },
}

export default { namespaced: true, state, mutations, actions, getters }
