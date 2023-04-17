import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import http from '@/http';
import IUsuario, { IUsuarioLogado } from '@/interfaces/IUsuario';
import { OBTER_USUARIOS_API } from './action-types';
import { OBTER_USUARIOS, SELECIONAR_PLANO } from './mutation-types';
import { InjectionKey } from 'vue';

interface Estado {
  usuarios: IUsuario[],
  usuarioLogado: IUsuarioLogado | null,
  planoSelecionado: number | null,
  nomeSite: string | null
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    usuarios: [],
    usuarioLogado: null,
    planoSelecionado: null,
    nomeSite: null
  },
  mutations: {
    [OBTER_USUARIOS](state, usuarios: IUsuario[]): void {
      state.usuarios = usuarios;
    },
    [SELECIONAR_PLANO](state, plano: number): void {
      state.planoSelecionado = plano;
    }
  },
  actions: {
    [OBTER_USUARIOS_API]: ({ state, commit }) => {
      if (state.usuarios.length > 0) return;
      http.get('users')
        .then(resp => {
          commit(OBTER_USUARIOS, resp.data);
        });
    }
  }
});

export const useStore = () => {
  return vuexUseStore(key);
};