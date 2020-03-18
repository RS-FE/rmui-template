import Vue from 'vue';
import App from './App';
import { router } from './router';

import 'amfe-flexible';

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
