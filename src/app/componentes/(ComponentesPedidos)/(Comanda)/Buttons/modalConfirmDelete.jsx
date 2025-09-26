import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteComandaDialog({ comanda_id, isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const deletarComanda = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/Delete/DeleteComandaById/${comanda_id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            
            if (response.ok) {
                alert('Comanda deletada com sucesso!');
                onClose(); // ✅ Fechar apenas no sucesso
                router.push("/Telas/Mesas");
            } else {
                alert(`Erro: ${result.error}`);
                // ❌ NÃO fechar em caso de erro - usuário pode tentar novamente
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar comanda');
            // ❌ NÃO fechar em caso de erro - usuário pode tentar novamente
        } finally {
            setLoading(false); // ✅ Sempre parar o loading
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar Comanda</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja deletar esta comanda? Esta ação não pode ser desfeita 
                        e todos os itens da comanda também serão removidos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={loading}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={deletarComanda}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? 'Deletando...' : 'Deletar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
