<template>
    <CaixaForm>
        <h2 class="caixa-form__titulo">Dados pessoais</h2>
        <h3 class="caixa-form__subtitulo">Informe seus dados pessoais para acesso à sua conta</h3>
        <form
            class="caixa-form__form"
            @submit.prevent="salvar"
        >
            <CampoForm
                class="form__campo"
                v-model="nome"
                id="nome"
                label="Nome completo"
                type="text"
                placeholder="Informe seu nome completo"
                :required="true"
                @pegar-validacoes="(validacoes) => mostrarErro(validacoes, 'nome')"
                :erro="erroNome"
            />
            <CampoForm
                class="form__campo"
                v-model="celular"
                id="celular"
                label="Celular"
                type="text"
                placeholder="(99) 99999-0000"
                :required="true"
                @pegar-validacoes="(validacoes) => mostrarErro(validacoes, 'celular')"
                :erro="erroCelular"
            />
            <CampoForm
                class="form__campo"
                v-model="email"
                id="email"
                label="E-mail"
                type="email"
                placeholder="Informe seu e-mail"
                :required="true"
                @pegar-validacoes="(validacoes) => mostrarErro(validacoes, 'email')"
                :erro="erroEmail"
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
                @pegar-validacoes="(validacoes) => { mostrarErro(validacoes, 'senha'); mostrarErro(validacoes, 'confirmarSenha') }"
                :erro="erroSenha"
            />
            <CampoForm
                class="form__campo"
                v-model="confirmarSenha"
                id="confirmar-senha"
                label="Confirme sua senha"
                type="password"
                :required="true"
                pattern=".{8,}"
                @pegar-validacoes="(validacoes) => mostrarErro(validacoes, 'confirmarSenha')"
                :erro="erroConfirmarSenha"
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
                @pegar-validacoes="(validacoes) => mostrarErro(validacoes, 'site')"
                :erro="erroNomeSite"
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
import textoErros from '@/utils/textoErros';

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

        const erroNome = ref('');
        const erroCelular = ref('');
        const erroEmail = ref('');
        const erroSenha = ref('');
        const erroConfirmarSenha = ref('');
        const erroNomeSite = ref('');

        const aceitarTermos = ref(false);

        const mostrarErro = (validacoes: ValidityState, campoErro: string) => {
            if (campoErro === 'email' && validacoes.valueMissing) return erroEmail.value = textoErros[campoErro].vazio;
            if (campoErro === 'email' && !validacoes.valid) return erroEmail.value = textoErros[campoErro].invalido;
            if (campoErro === 'email' && validacoes.valid) return erroEmail.value = '';

            if (campoErro === 'senha' && validacoes.valueMissing) return erroSenha.value = textoErros[campoErro].vazio;
            if (campoErro === 'senha' && !validacoes.valid) return erroSenha.value = textoErros[campoErro].invalido;
            if (campoErro === 'senha' && validacoes.valid) return erroSenha.value = '';

            if (campoErro === 'confirmarSenha' && senha.value !== confirmarSenha.value) return erroConfirmarSenha.value = textoErros.senha.identicas || '';
            if (campoErro === 'confirmarSenha' && senha.value === confirmarSenha.value) return erroConfirmarSenha.value = '';

            if (campoErro === 'nome' && validacoes.valueMissing) return erroNome.value = textoErros[campoErro].vazio;
            if (campoErro === 'nome' && !validacoes.valid) return erroNome.value = textoErros[campoErro].invalido;
            if (campoErro === 'nome' && validacoes.valid) return erroNome.value = '';

            if (campoErro === 'celular' && validacoes.valueMissing) return erroCelular.value = textoErros[campoErro].vazio;
            if (campoErro === 'celular' && !validacoes.valid) return erroCelular.value = textoErros[campoErro].invalido;
            if (campoErro === 'celular' && validacoes.valid) return erroCelular.value = '';

            if (campoErro === 'site' && validacoes.valueMissing) return erroNomeSite.value = textoErros[campoErro].vazio;
            if (campoErro === 'site' && !validacoes.valid) return erroNomeSite.value = textoErros[campoErro].invalido;
            if (campoErro === 'site' && validacoes.valid) return erroNomeSite.value = '';
        };


        const salvar = () => {
            console.log('salvo');
        };


        return {
            nome,
            celular,
            email,
            senha,
            confirmarSenha,
            nomeSite,
            aceitarTermos,
            erroNome,
            erroCelular,
            erroEmail,
            erroSenha,
            erroConfirmarSenha,
            erroNomeSite,
            mostrarErro,
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