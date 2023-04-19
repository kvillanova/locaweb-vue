<template>
    <CaixaForm>
        <h2 class="caixa-form__titulo">Entre na sua conta</h2>
        <h3 class="caixa-form__subtitulo">Para acessar sua conta informe seu e-mail e senha</h3>
        <form
            class="caixa-form__form"
            @submit.prevent="salvar"
        >
            <CampoForm
                class="form__campo"
                v-model="email"
                id="email"
                label="E-mail"
                type="email"
                placeholder="Seu e-mail"
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
                placeholder="Sua senha"
                :required="true"
                @pegar-validacoes="(validacoes) => mostrarErro(validacoes, 'senha')"
                :erro="erroSenha"
            />
            <p class="esqueci-senha">Esqueci minha senha</p>
            <button class="caixa-form__botao">Fazer login</button>
            <p
                class="form__erro"
                v-if="erroForm"
            >{{ erroForm }}</p>
        </form>
    </CaixaForm>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CampoForm from './CampoForm.vue';
import CaixaForm from './CaixaForm.vue';
import textoErros from '@/utils/textoErros';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { OBTER_USUARIOS_API } from '@/store/action-types';
import { LOGAR_USUARIO } from '@/store/mutation-types';
import { IUsuarioLogado } from '@/interfaces/IUsuario';


export default defineComponent({
    name: "FormularioLogin",
    components: { CampoForm, CaixaForm },
    setup() {
        const email = ref('');
        const senha = ref('');
        const erroEmail = ref('');
        const erroSenha = ref('');
        const erroForm = ref('');
        const store = useStore();
        const router = useRouter();

        store.dispatch(OBTER_USUARIOS_API);

        const mostrarErro = (validacoes: ValidityState, campoErro: string) => {
            if (campoErro === 'email' && validacoes.valueMissing) return erroEmail.value = textoErros[campoErro].vazio;
            if (campoErro === 'email' && !validacoes.valid) return erroEmail.value = textoErros[campoErro].invalido;
            if (campoErro === 'email' && validacoes.valid) return erroEmail.value = '';

            if (campoErro === 'senha' && validacoes.valueMissing) return erroSenha.value = textoErros[campoErro].vazio;
            if (campoErro === 'senha' && !validacoes.valid) return erroSenha.value = textoErros[campoErro].invalido;
            if (campoErro === 'senha' && validacoes.valid) return erroSenha.value = '';
        };
        const salvar = () => {
            const usuarios = store.state.usuarios;
            const usuario = usuarios.find(u => u.email === email.value);
            if (!usuario) return erroForm.value = 'Usuário não encontrado em nosso sistema. Tente novamente.';

            if (senha.value !== usuario.password) return erroForm.value = 'A senha não corresponde ao usuário. Tente novamente.';

            const usuarioLogado: IUsuarioLogado = {
                email: usuario.email,
                name: usuario.name,
            };

            store.commit(LOGAR_USUARIO, usuarioLogado);
            router.push('/');

        };
        return {
            email,
            senha,
            erroEmail,
            erroSenha,
            erroForm,
            mostrarErro,
            salvar
        };
    }
});
</script>
  
<style scoped lang="scss">
.esqueci-senha {
    align-self: flex-end;
    color: #515D74;
    font-size: .9rem;
    line-height: 20px;
    margin: 0;
}

.form__erro {
    margin: 0;
    color: red;
    font-size: .9rem;
}
</style>