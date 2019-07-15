import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Jobs from './views/Jobs.vue';
import AddJob from './views/AddJob.vue';
import EditJob from './views/EditJob.vue';
import Teams from './views/Teams.vue';
import AddTeam from './views/AddTeam.vue';
import EditTeam from './views/EditTeam.vue';
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
      path: '/teams',
      component: Teams
    },
    {
      path: '/teams/add',
      component: AddTeam
    },
    {
      path: '/teams/edit/:id',
      component: EditTeam,
      props: true
    },
    {
      path: '/message/:type/:id',
      component: Message,
      props: true
    }
  ]
})