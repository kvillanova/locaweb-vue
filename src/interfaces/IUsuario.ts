export default interface IUsuario {
  id: number,
  email: string,
  username: string,
  password: string,
  name: {
    firstname: string,
    lastname: string
  }
};

export type IUsuarioLogado = Pick<IUsuario, 'email' | 'name'>;