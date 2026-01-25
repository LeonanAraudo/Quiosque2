import axios from "axios";

export default async function entregarItemComandaPorShakeId(shake_id) {
    try {
        // Busca o item_comanda correspondente ao shake_id
        const res = await axios.get(`/api/Gets/GetItemComandaByShakeId/${shake_id}`);
        if (res.data && res.data.id) {
            // Marca como entregue
            await axios.patch(`/api/Patch/PatchEntregueProduto/${res.data.id}`, { entregue: true });
        }
    } catch (error) {
        console.error("Erro ao marcar item_comanda como entregue:", error);
    }
}
