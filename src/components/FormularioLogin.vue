<template>
    <CaixaForm>
        <h2 class="caixa-form__titulo">Entre na sua conta</h2>
        <h3 class="caixa-form__subtitulo">Para acessar sua conta informe seu e-mail e senha</h3>
        <form
            class="caixa-form__form"
            @submit="e => salvar(e)"
        >
            <CampoForm
                class="form__campo"
                v-model="email"
                id="email"
                label="E-mail"
                type="email"
                placeholder="Seu e-mail"
                :required="true"
            />
            <CampoForm
                class="form__campo"
                v-model="senha"
                id="senha"
                label="Senha"
                type="password"
                placeholder="Sua senha"
                :required="true"
            />
            <p class="esqueci-senha">Esqueci minha senha</p>
            <button class="caixa-form__botao">Fazer login</button>
        </form>
    </CaixaForm>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CampoForm from './CampoForm.vue';
import CaixaForm from './CaixaForm.vue';

export default defineComponent({
    name: "FormularioLogin",
    components: { CampoForm, CaixaForm },
    setup() {
        const email = ref('');
        const senha = ref('');
        const salvar = (e: Event) => {
            checarCampos(e);
            e.preventDefault();
        };
        return {
            email,
            senha,
            salvar
        };
    }
});

function checarCampos(e: Event) {
    console.log(e.target);
}
</script>
  
<style scoped lang="scss">
.esqueci-senha {
    align-self: flex-end;
    color: #515D74;
    font-size: .9rem;
    line-height: 20px;
    margin: 0;
}
</style>