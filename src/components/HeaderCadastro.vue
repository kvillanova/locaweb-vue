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
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderCadastro',
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
</style>
  