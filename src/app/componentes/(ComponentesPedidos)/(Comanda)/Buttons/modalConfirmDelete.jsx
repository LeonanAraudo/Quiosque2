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
                router.push("/Telas/Mesas");
                onClose(); 
            } else {
                alert(`Erro: ${result.error}`);
                setLoading(false); 
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar comanda');
            setLoading(false); 
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar Comanda</AlertDialogTitle>
                   
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel 
                        onClick={onClose} 
                        disabled={loading}
                        className={loading ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={deletarComanda}
                        disabled={loading}
                        className={`bg-red-600 hover:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Deletando...
                            </div>
                        ) : 'Deletar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
