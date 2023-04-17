<template>
  <header>
    <img
      class="locaweb-logo"
      src="@/assets/logo.svg"
      alt="Locaweb"
    >
    <h2 class="titulo">
      Você está muito próximo de mudar a forma de <span class="titulo__destaque">hospedar seu site</span>
    </h2>
    <p>Escolha seu plano</p>
  </header>
  <div class="planos">
    <Plano
      v-for="(j, index) in json"
      :key="index"
      :plano_id="index + 1"
      :titulo="j.titulo"
      :preco="j.preco"
      :preco_infos="j.preco_infos"
      :ideal="j.ideal"
      :topicos="j.topicos"
      :mais_usado="j.titulo == 'Hospedagem 2' ? true : false"
      :show_escolher="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Plano from '@/components/Plano.vue';
import json from '@/assets/planos.json';

export default defineComponent({
  name: 'SelecionarPlano',
  components: { Plano },
  data() {
    return { json };
  }
});
</script>

<style scoped lang="scss">
header {
  .titulo {
    display: flex;
    flex-direction: column;

    &__destaque {
      color: #F30168;
      text-decoration: underline;
    }
  }
}

.planos {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, 300px);
  margin: 0 auto;
  justify-content: center;
}
</style>
