import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
export default function destroyHook(produto_id){
    const router = useRouter()
    const onSubmit = async () => {
        console.log(produto_id + " id no hook")
            try{
                const response = await axios.delete(`/api/DeleteProdutoById/${produto_id}`)
                router.push("/Telas/Estoque")
                console.log('Produto deletado com sucesso:');
            }catch (error) {
                console.error('Erro ao deletar o produto:', error);
            }
        }
        return { onSubmit }
}   