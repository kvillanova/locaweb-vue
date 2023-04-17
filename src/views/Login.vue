<template>
  <img
    class="locaweb-logo"
    src="@/assets/logo.svg"
    alt="Locaweb"
  >
  <FormularioLogin />
  <p class="nao-tem-conta">Ainda não tem conta?
    <RouterLink
      class="nao-tem-conta__link"
      to="cadastro"
    >Cadastre-se</RouterLink>
  </p>
</template>

<script lang="ts">
import FormularioLogin from '@/components/FormularioLogin.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Login",
  components: { FormularioLogin }
});
</script>

<style scoped lang="scss">
.nao-tem-conta {
  text-align: center;
  margin: 32px auto 0;
  max-width: calc(100vw - 20px);

  &__link {
    color: #F30168;
    text-decoration: underline;
    word-wrap: break-word;
  }
}
</style>