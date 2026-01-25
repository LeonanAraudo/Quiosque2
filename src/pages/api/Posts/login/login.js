import usuario from '../../../../../models/Usuario/usuario';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nome, senha } = req.body;
      const nomeInput = typeof nome === 'string' ? nome.trim() : '';

      const user = await usuario.findOne({ where: { nome: { [Op.iLike]: nomeInput } } });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const isPasswordCorrect = await bcrypt.compare(senha, user.senha);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
        const token = jwt.sign(
        { usuario_id: user.usuario_id, nome: user.nome },  
        process.env.JWT_SECRET || "chave_secreta",         
        { expiresIn: "1h" }                              
      );

      const isProd = process.env.NODE_ENV === 'production';
      const cookieBase = `HttpOnly; Path=/; Max-Age=3600; SameSite=Strict${isProd ? '; Secure' : ''}`;
      res.setHeader("Set-Cookie", [
        `auth_token=${token}; ${cookieBase}`,
        `token=${token}; ${cookieBase}`,
      ]);

      return res.status(200).json({ message: "Login bem sucedido", token });

    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
