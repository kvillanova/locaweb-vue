interface TipoErros {
    vazio: string
    invalido: string
    identicas?: string
}

interface Campos {
    [key: string]: TipoErros
}


const textoErros: Campos = {
    email: {
        vazio: 'O campo de e-mail precisa estar preenchido.',
        invalido: 'Preencha o campo de e-mail corretamente.'
    },
    senha: {
        vazio: 'O campo de senha precisa estar preenchido.',
        invalido: 'Preencha o campo de e-mail corretamente.',
        identicas: 'As senhas precisam ser idênticas.'
    },
};

export default textoErros;