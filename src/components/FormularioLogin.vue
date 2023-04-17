<template>
    <div class="caixa-form">
        <h2 class="caixa-form__titulo">Entre na sua conta</h2>
        <h3 class="caixa-form__subtitulo">Para acessar sua conta informe seu e-mail e senha</h3>
        <form
            class="form"
            @submit.prevent="salvar"
        >
            <CampoForm
                class="form__campo"
                v-model="email"
                id="email"
                label="E-mail"
                type="email"
                placeholder="Seu e-mail"
            />
            <CampoForm
                class="form__campo"
                v-model="senha"
                id="email"
                label="Senha"
                type="password"
                placeholder="Sua senha"
            />
            <p class="form__esqueci-senha">Esqueci minha senha</p>
            <button class="form__botao">Fazer login</button>
        </form>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CampoForm from './CampoForm.vue';

export default defineComponent({
    name: "FormularioLogin",
    components: { CampoForm },
    setup() {
        const email = ref('');
        const senha = ref('');
        const salvar = () => {
            console.log('salvo');
        };
        return {
            email,
            senha,
            salvar
        };
    }
});
</script>
  
<style scoped lang="scss">
.caixa-form {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E6EAF2;
    width: calc(100vw - 10px);
    max-width: 617px;
    padding: 30px;
    margin: 20px auto;
    align-items: start;

    &__titulo {
        font-size: 1.5rem;
        margin: 0;
    }

    &__subtitulo {
        font-size: 1rem;
        font-weight: 400;
        margin-top: 8px;
    }
}

.form {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__esqueci-senha {
        align-self: end;
        color: #515D74;
        font-size: .9rem;
        line-height: 20px;
        margin: 0;
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