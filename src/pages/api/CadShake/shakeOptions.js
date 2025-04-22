import shakeOptions from '../../../../models/ShakeOptions/options'

export default async function GetProdutos(req, res) {
    if (req.method === "POST") {
        try {
            const { tamanho, sabor, cobertura, adicionais,nome } = req.body;

            const postShake = await shakeOptions.create({
                tamanho,
                sabor,
                cobertura,
                nome,
                adicionais: Array.isArray(adicionais) ? adicionais.join(", ") : adicionais
            });

            res.status(200).json(postShake);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar shake" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
