<template>
  <HeaderCadastro>
    <p>Escolha seu plano</p>
  </HeaderCadastro>
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
      @aoEscolherPlano="selecionarPlano"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Plano from '@/components/Plano.vue';
import HeaderCadastro from '@/components/HeaderCadastro.vue';
import json from '@/assets/planos.json';
import { useStore } from '@/store';
import { SELECIONAR_PLANO } from '@/store/mutation-types';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SelecionarPlano',
  components: { Plano, HeaderCadastro },
  setup() {
    const store = useStore();
    const router = useRouter();
    const selecionarPlano = (id: number) => {
      console.log(id);
      store.commit(SELECIONAR_PLANO, id);
      router.push('/cadastro');
    };

    return {
      json,
      store,
      selecionarPlano
    };
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
