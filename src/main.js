import Vue from 'vue';
import App from './App.vue';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREABSE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_APP_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
});

export const db = firebase.firestore();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
