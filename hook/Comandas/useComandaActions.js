import { useState } from 'react';
import axios from 'axios';

export const useComandaActions = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deletarComanda = async (comanda_id) => {
        try {
            setIsLoading(true);
            const response = await axios.delete(`/api/Delete/DeleteComandaById/${comanda_id}`);
            
            if (response.status === 200) {
                return { success: true, message: "Comanda deletada com sucesso" };
            } else {
                return { success: false, message: "Erro ao deletar comanda" };
            }
        } catch (error) {
            console.error("Erro ao deletar comanda:", error);
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    // const enviarParaCozinha = async (comanda_id) => {
    //     try {
    //         setIsLoading(true);
    //         // Aqui você pode implementar a lógica para enviar para cozinha
    //         // Por exemplo, atualizar o status da comanda
    //         const response = await axios.put(`/api/Put/UpdateComandaStatus/${comanda_id}`, {
    //             status: 'enviada_para_cozinha'
    //         });
            
    //         if (response.status === 200) {
    //             return { success: true, message: "Comanda enviada para cozinha" };
    //         } else {
    //             return { success: false, message: "Erro ao enviar para cozinha" };
    //         }
    //     } catch (error) {
    //         console.error("Erro ao enviar para cozinha:", error);
    //         return { success: false, message: error.message };
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const finalizarComanda = async (comanda_id) => {
    //     try {
    //         setIsLoading(true);
    //         // Aqui você pode implementar a lógica para finalizar a comanda
    //         const response = await axios.put(`/api/Put/UpdateComandaStatus/${comanda_id}`, {
    //             status: 'finalizada'
    //         });
            
    //         if (response.status === 200) {
    //             return { success: true, message: "Comanda finalizada" };
    //         } else {
    //             return { success: false, message: "Erro ao finalizar comanda" };
    //         }
    //     } catch (error) {
    //         console.error("Erro ao finalizar comanda:", error);
    //         return { success: false, message: error.message };
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return {
        deletarComanda,
        // enviarParaCozinha,
        // finalizarComanda,
        isLoading
    };
};
