import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../../../../components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import {useDeleteComandas} from '../../../../../../hook/Comandas/useComandaDeleteById'

export default function DeleteComandaDialog({ comanda_id, isOpen, onClose }) {
    const { deletarComanda, isLoading } = useDeleteComandas()
    const router = useRouter()
    async function delComanda() {
        const result = await deletarComanda(comanda_id);
        if (result.success) {
            onClose();
            localStorage.removeItem(`total_comanda_${comanda_id}`);
            router.push("/Telas/Mesas");
        } else {
            alert(result.error);
        }
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar Comanda</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                        disabled={isLoading}
                        className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={delComanda}
                        disabled={isLoading}
                        className={`bg-red-600 hover:bg-red-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
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
