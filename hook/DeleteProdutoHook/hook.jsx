import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
export default function destroyHook(produto_id){
    const router = useRouter()
    const onSubmit = async () => {
            try{
                const response = await axios.delete(`/api/Delete/DeleteProdutoById/${produto_id}`)
                router.push("/Telas/Estoque")
            }catch (error) {
                console.error('Erro ao deletar o produto:', error);
            }
        }
        return { onSubmit }
}   