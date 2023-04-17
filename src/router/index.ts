import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Welcome.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('@/views/Cadastro.vue')
  },
  {
    path: '/selecionar-plano',
    name: 'Selecionar Plano',
    component: () => import('@/views/SelecionarPlano.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
