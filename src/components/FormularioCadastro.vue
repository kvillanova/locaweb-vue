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
                :pattern="nomeRegex"
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
            <p
                class="form__erro"
                v-if="erroForm"
            >{{ erroForm }}</p>
        </form>
    </CaixaForm>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CampoForm from '@/components/CampoForm.vue';
import CaixaForm from '@/components/CaixaForm.vue';
import textoErros from '@/utils/textoErros';
import XRegExp from 'xregexp';
import IUsuario from '@/interfaces/IUsuario';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { OBTER_USUARIOS_API, ADICIONAR_USUARIO_API } from '@/store/action-types';

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
        const erroForm = ref('');

        const store = useStore();
        const router = useRouter();
        store.dispatch(OBTER_USUARIOS_API);

        const aceitarTermos = ref(false);

        const nomeRegex = XRegExp('\\p{Latin}{2,}\\s\\p{Latin}{1,}(\\s\\p{Latin}{1,})*');
        let nomeRegexText = nomeRegex.toString();
        nomeRegexText = nomeRegexText.replace(/^\/(.*)\/$/, '$1');

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
            if (senha.value !== confirmarSenha.value) return false;

            if (!aceitarTermos.value) return erroForm.value = 'Você precisa aceitar os termos antes de continuar.';
            else erroForm.value = '';

            const usuarios = store.state.usuarios;
            const usuarioExiste = usuarios.find(u => u.email === email.value);
            if (usuarioExiste) return erroForm.value = 'E-mail já cadastrado no sistema. Tente novamente.';

            const [firstname, ...lastname] = nome.value.split(' ');
            const name: IUsuario['name'] = {
                firstname,
                lastname: lastname.join(' ')
            };

            const usuario: IUsuario = {
                email: email.value,
                name,
                tel: celular.value,
                password: senha.value,
            };

            store.dispatch(ADICIONAR_USUARIO_API, usuario).then(() => {
                router.push('/');
            });
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
            erroForm,
            nomeRegex: nomeRegexText,
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

.form__erro {
    margin: 0;
    color: red;
    font-size: .9rem;
}
</style>