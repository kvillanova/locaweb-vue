<template>
  <header>
    <img
      class="locaweb-logo"
      src="@/assets/logo.svg"
      alt="Locaweb"
    >
    <div class="usuario">
      <div
        class="usuario__imagem"
        @click="() => botaoSairExibido = !botaoSairExibido"
      >
        <p class="usuario__letra">{{ usuario?.name.firstname.substring(0, 1) }}</p>
      </div>
      <p
        :class="{
          'usuario__botao-sair': !botaoSairExibido,
          'usuario__botao-sair--ativo': botaoSairExibido,
        }"
        @click="sair"
      >Sair</p>
    </div>
  </header>
  <main class="main">
    <h2 class="main__titulo">Olá João,</h2>
    <h3 class="main__subtitulo">Seja bem-vindo à sua conta de hospedagem.</h3>
    <iframe
      class="main__video"
      src="https://www.youtube.com/embed/uC4RC7BrkDA"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <p class="main__help">Caso tenha alguma dúvida, <u>visite nossa central de ajuda.</u></p>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { LOGAR_USUARIO } from '@/store/mutation-types';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Welcome',
  setup() {
    const botaoSairExibido = ref(false);
    const store = useStore();
    const router = useRouter();
    const sair = () => {
      store.commit(LOGAR_USUARIO, null);
      router.push('/login');
    };
    return {
      botaoSairExibido,
      usuario: store.state.usuarioLogado,
      sair
    };
  }
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 0;
}

.usuario {
  display: flex;
  flex-direction: column;

  &__imagem {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: darkolivegreen;
    display: flex;
    justify-content: center;
  }

  &__letra {
    font-size: 1rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
  }

  &__botao-sair {
    display: none;
  }

  &__botao-sair--ativo {
    margin: 5px 0;
    cursor: pointer;
  }
}

.main {
  text-align: left;
  max-width: 800px;
  width: calc(100vw - 40px);
  margin: 20px auto;

  &__titulo {
    margin: 0;
  }

  &__subtitulo {
    margin: 20px auto 0;
    font-weight: 300;
    font-size: 1rem;
  }

  &__video {
    margin: 30px auto 20px;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  &__help {
    font-size: .9rem;
  }
}
</style>