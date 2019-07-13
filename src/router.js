import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Jobs from './views/Jobs.vue';
import AddJob from './views/AddJob.vue';
import EditJob from './views/EditJob.vue';
import Message from './views/Message.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/jobs',
      component: Jobs
    },
    {
      path: '/jobs/add',
      component: AddJob
    },
    {
      path: '/jobs/edit/:id/:team',
      component: EditJob,
      props: true
    },
    {
      path: '/message/:type/:data',
      component: Message,
      props: true
    }
  ]
})