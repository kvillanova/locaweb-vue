<template>
    <CaixaForm>
        <h2 class="caixa-form__titulo">Dados pessoais</h2>
        <h3 class="caixa-form__subtitulo">Informe seus dados pessoais para acesso à sua conta</h3>
        <form
            class="caixa-form__form"
            @submit.prevent="e => salvar(e)"
        >
            <CampoForm
                class="form__campo"
                v-model="nome"
                id="nome"
                label="Nome completo"
                type="text"
                placeholder="Informe seu nome completo"
                :required="true"
            />
            <CampoForm
                class="form__campo"
                v-model="celular"
                id="celular"
                label="Celular"
                type="text"
                placeholder="(99) 99999-0000"
                :required="true"
            />
            <CampoForm
                class="form__campo"
                v-model="email"
                id="email"
                label="E-mail"
                type="email"
                placeholder="Informe seu e-mail"
                :required="true"
            />
            <CampoForm
                class="form__campo"
                v-model="senha"
                id="senha"
                label="Senha"
                type="password"
                subinfo="No mínimo 8 caracteres"
                :required="true"
                pattern=".{8,}"
                @update:model-value="checarSenhas"
            />
            <CampoForm
                class="form__campo"
                v-model="confirmarSenha"
                id="confirmar-senha"
                label="Confirme sua senha"
                type="password"
                :required="true"
                pattern=".{8,}"
                :erro-customizado="erroSenhas"
                @update:model-value="checarSenhas"
            />
            <h2 class="caixa-form__titulo caixa-form__titulo-adicional">Dados do seu site</h2>
            <CampoForm
                class="form__campo"
                v-model="nomeSite"
                id="nome-site"
                label="Nome do seu site"
                type="text"
                placeholder="Meu site"
                :required="true"
            />
            <div class="aceitar-termos">
                <input
                    v-model="aceitarTermos"
                    id="aceitar-termos"
                    class="aceitar-termos__checkbox"
                    type="checkbox"
                    :required="true"
                >
                <label
                    for="aceitar-termos"
                    class="aceitar-termos__label"
                >
                    <Fa
                        :icon="aceitarTermos ? ['far', 'square-check'] : ['far', 'square']"
                        color="#F30168"
                    /> <span>Ao concluir com seu cadastro você concorda com nossos <u>termos de uso</u> e
                        <u>politicas de privacidade</u>.</span>
                </label>
            </div>
            <button class="caixa-form__botao">Criar conta</button>
        </form>
    </CaixaForm>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CampoForm from '@/components/CampoForm.vue';
import CaixaForm from '@/components/CaixaForm.vue';

export default defineComponent({
    name: "FormularioCadastro",
    components: { CampoForm, CaixaForm },
    setup() {
        const nome = ref('');
        const celular = ref('');
        const email = ref('');
        const senha = ref('');
        const confirmarSenha = ref('');
        const nomeSite = ref('');
        const erroSenhas = ref('');
        const aceitarTermos = ref(false);
        const salvar = (e: Event) => {
            checarSenhas();
            console.log(nome.value);
        };
        const checarSenhas = () => {
            if (senha.value === confirmarSenha.value) return erroSenhas.value = '';
            return erroSenhas.value = 'As senhas devem ser idênticas.';
        };
        return {
            nome,
            celular,
            email,
            senha,
            confirmarSenha,
            nomeSite,
            aceitarTermos,
            erroSenhas,
            checarSenhas,
            salvar
        };
    }
});
</script>
  
<style scoped lang="scss">
.caixa-form__titulo-adicional {
    margin: 20px 0 0;
    padding: 20px 0 0;
    border-top: solid 1px #515D744D;
}

.aceitar-termos {
    margin: 20px 0 0;
    padding: 20px 0 0;
    border-top: solid 1px #515D744D;
    font-size: 1rem;

    &__checkbox {
        display: none;
    }

    &__label {
        display: flex;
        cursor: pointer;

        &>span {
            margin-left: 5px;
        }
    }
}
</style>