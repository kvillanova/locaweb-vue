interface TipoErros {
    vazio: string
    invalido: string
    identicas?: string
    padrao?: string
}

interface Campos {
    [key: string]: TipoErros
}


const textoErros: Campos = {
    email: {
        vazio: 'O campo de e-mail precisa estar preenchido.',
        invalido: 'Preencha o e-mail corretamente.'
    },
    senha: {
        vazio: 'Sua senha precisa estar preenchida.',
        invalido: 'Preencha a senha corretamente.',
        padrao: 'A senha precisa ter pelo menos 8 caracteres.',
        identicas: 'As senhas precisam ser idênticas.'
    },
    nome: {
        vazio: 'Seu nome precisa estar preenchido.',
        invalido: 'Preencha seu nome corretamente.'
    },
    celular: {
        vazio: 'Seu celular precisa estar preenchido.',
        invalido: 'Preencha seu celular corretamente.'
    },
    site: {
        vazio: 'Dê um nome para seu site.',
        invalido: 'Preencha o nome do site corretamente.'
    }
};

export default textoErros;