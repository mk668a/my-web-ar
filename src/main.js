import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
require('aframe')

// firebase
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCRwBG7hWpMeXyH1O28wmcx__JZw4ZEQ-U",
    authDomain: "webar-8fa80.firebaseapp.com",
    databaseURL: "https://webar-8fa80.firebaseio.com",
    projectId: "webar-8fa80",
    storageBucket: "webar-8fa80.appspot.com",
    messagingSenderId: "996519997485",
    appId: "1:996519997485:web:c41496eabb41003df088a4"
  })
}

export default firebase
// end of firebase

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

