<template>
  <HeaderCadastro />
  <div class="cadastro-container">
    <FormularioCadastro />
    <Plano
      class="plano-cadastrado"
      :plano_id="plano"
      :titulo="json.titulo"
      :preco="json.preco"
      :preco_infos="json.preco_infos"
      :ideal="json.ideal"
      :topicos="json.topicos"
      :plano_escolhido="true"
      @ao-trocar-plano="resetarPlano"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioCadastro from '@/components/FormularioCadastro.vue';
import HeaderCadastro from '@/components/HeaderCadastro.vue';
import Plano from '@/components/Plano.vue';
import json from '@/assets/planos.json';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { SELECIONAR_PLANO } from '@/store/mutation-types';

export default defineComponent({
  name: 'Cadastro',
  components: { FormularioCadastro, HeaderCadastro, Plano },
  setup() {
    const store = useStore();
    const router = useRouter();
    const plano = store.state.planoSelecionado ? store.state.planoSelecionado : 0;
    const resetarPlano = () => {
      store.commit(SELECIONAR_PLANO, null);
      router.push('/selecionar-plano');
    };
    return {
      plano,
      resetarPlano,
      json: json[plano - 1]
    };
  }
});
</script>

<style lang="scss">
.cadastro-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  max-width: 980px;
  margin: 0 auto;

  @media screen and (max-width:999px) {
    flex-direction: column-reverse;
  }
}

.plano.plano-cadastrado {
  @media screen and (max-width:999px) {
    margin: 20px auto -20px;
    background: none;
    border: none;

    & .plano__topico {
      display: none;
    }
  }
}
</style>
