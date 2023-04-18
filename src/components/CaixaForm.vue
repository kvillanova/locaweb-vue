<template>
  <div class="caixa-form">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CaixaForm',
});
</script>

<style lang="scss">
.caixa-form {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border: 1px solid #E6EAF2;
  width: calc(100vw - 20px);
  max-width: 617px;
  padding: 30px;
  margin: 20px auto;
  align-items: flex-start;
  text-align: left;
  box-sizing: border-box;

  &__titulo {
    font-size: 1.5rem;
    margin: 0;
    width: 100%;
  }

  &__subtitulo {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 8px;
    width: 100%;
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__botao {
    cursor: pointer;
    padding: 30px 24px;
    background: #F30168;
    border-radius: 5px;
    color: white;
    text-transform: uppercase;
    width: 100%;
    border: none;
    margin-top: 16px;
  }
}
</style>
  