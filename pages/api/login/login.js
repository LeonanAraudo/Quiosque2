import usuario from '../../../models/Usuario/usuario';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nome, senha } = req.body;

      const user = await usuario.findOne({ where: { nome } });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const isPasswordCorrect = senha === user.senha;

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
     return res.status(200).json({message: "Login bem sucedido"})
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}