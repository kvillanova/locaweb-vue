<template>
  <HeaderCadastro />
  <FormularioCadastro />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioCadastro from '@/components/FormularioCadastro.vue';
import HeaderCadastro from '@/components/HeaderCadastro.vue';

export default defineComponent({
  name: 'Cadastro',
  components: { FormularioCadastro, HeaderCadastro }
});
</script>

<style scoped></style>
