import comanda from '../../../../../models/comanda/comanda'

export default async function abrirComanda(req, res) {
  
  if (req.method === "POST") {
    try {
      const { mesa, estado, tempo } = req.body

      if (!estado || !mesa) {
        return res.status(400).json({ message: "Dados incompletos" });
      }

      const comandasMesa = await comanda.findAll();
      const proximoNumero = comandasMesa.length + 1;

      // Usar o horário atual do sistema
      const agora = new Date();
      
      const novaComanda = await comanda.create({  
          estado,
          mesa,
          tempo: agora.toISOString(), 
          numerocomanda: proximoNumero, 
      });

      return res.status(200).json(novaComanda);

    } catch (error) {
      console.error('Erro ao abrir comanda:', error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}