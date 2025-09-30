import usuario from '../../../../../models/Usuario/usuario';
import bcrypt from 'bcrypt';

export default async function createUser(req, res) {
  if (req.method === "POST") {
    try {
      const { nome, senha } = req.body;

      // Validação básica
      if (!nome || !senha) {
        return res.status(400).json({ error: "Nome e senha são obrigatórios" });
      }

      // Gera hash da senha
      const saltRounds = 10; // força do hash
      const senhaHash = await bcrypt.hash(senha, saltRounds);

      // Cria o usuário no banco com senha criptografada
      const usuarioData = await usuario.create({ nome, senha: senhaHash });

      // Retorna o usuário sem a senha
      const { senha: _, ...usuarioSafe } = usuarioData.toJSON();

      return res.status(201).json(usuarioSafe);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
