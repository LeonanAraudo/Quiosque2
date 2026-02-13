export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }

  try {
    // Limpa os cookies de autenticação
    const cookieBase = `HttpOnly; Path=/; Max-Age=0; SameSite=Strict`;
    res.setHeader("Set-Cookie", [
      `auth_token=; ${cookieBase}`,
      `token=; ${cookieBase}`,
    ]);

    return res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    console.error('Erro no logout:', error);
    return res.status(500).json({ error: 'Erro ao realizar logout' });
  }
}
