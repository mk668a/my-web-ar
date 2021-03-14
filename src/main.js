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
    apiKey: "AIzaSyAuS3JoPweTKmaE1y1umJFjwHjmfv0iLhE-U",
    authDomain: "my-web-ar.firebaseapp.com",
    databaseURL: "https://my-web-ar-default-rtdb.firebaseio.com/",
    projectId: "my-web-ar",
    storageBucket: "my-web-ar.appspot.com",
    messagingSenderId: "263864417017",
    appId: "1:263864417017:web:82887403353b23588dc028"
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

