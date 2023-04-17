import { store } from '@/store';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/Welcome.vue'),
    meta: { usuarioLogado: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { usuarioLogado: false }
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('@/views/Cadastro.vue'),
    meta: {
      usuarioLogado: false,
      planoSelecionado: true
    }
  },
  {
    path: '/selecionar-plano',
    name: 'Selecionar Plano',
    component: () => import('@/views/SelecionarPlano.vue'),
    meta: {
      usuarioLogado: false
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.usuarioLogado && !store.state.usuarioLogado) {
    next("/login");
  }
  else if (!to.meta.usuarioLogado && store.state.usuarioLogado) {
    next("/welcome");
  }
  else if (to.meta.planoSelecionado && !store.state.planoSelecionado) {
    next("/selecionar-plano");
  }
  else {
    next();
  }
});

export default router;
