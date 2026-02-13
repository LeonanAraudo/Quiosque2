'use client';
import { useState } from 'react';
import { useCadastrarFicha } from '../../../../../hook/Fichas/useCadastrarFicha';
import { X, Plus, PackagePlus } from 'lucide-react';

export default function CadFichasComponent({ onClose, onSuccess }) {
    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const { cadastrar, isLoading, error } = useCadastrarFicha();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nomeProduto.trim() || !quantidade) {
            alert('Preencha todos os campos!');
            return;
        }

        try {
            await cadastrar(nomeProduto, quantidade);
            setNomeProduto('');
            setQuantidade('');
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (err) {
            console.error('Erro ao cadastrar:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="bg-black p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                <PackagePlus className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Nova Ficha</h2>
                        </div>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <PackagePlus className="w-4 h-4" />
                            Nome do Produto
                        </label>
                        <input
                            type="text"
                            value={nomeProduto}
                            onChange={(e) => setNomeProduto(e.target.value)}
                            placeholder="Digite o nome do produto"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Quantidade
                        </label>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder="Digite a quantidade"
                            min="0"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Cadastrando...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Cadastrar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}