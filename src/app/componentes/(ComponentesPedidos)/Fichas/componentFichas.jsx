"use client";

import { useState } from "react";
import { useFichas } from "../../../../../hook/Fichas/useFichas";
import { useDeleteFicha } from "../../../../../hook/Fichas/useDeleteFicha";
import { useUpdateQuantidadeFicha } from "../../../../../hook/Fichas/useUpdateQuantidadeFicha";
import CadFichasComponent from "./cadastroFicha";
import {
  Plus,
  Minus,
  Trash2,
  Ticket,
  PackagePlus,
  Loader2,
} from "lucide-react";

export default function FichasComponent() {
  const { fichas, isLoading, refetch } = useFichas();
  const { deletar, isLoading: isDeletando } = useDeleteFicha();
  const { updateQuantidade } = useUpdateQuantidadeFicha();
  const [showCadastro, setShowCadastro] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const handleDelete = async (ficha_id) => {
    if (confirm("Deseja realmente excluir esta ficha?")) {
      try {
        setProcessingId(ficha_id);
        await deletar(ficha_id);
        await refetch();
      } catch (err) {
        alert("Erro ao deletar ficha");
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleUpdateQuantidade = async (ficha_id, novaQuantidade) => {
    if (novaQuantidade < 0) return;

    try {
      setProcessingId(ficha_id);
      await updateQuantidade(ficha_id, novaQuantidade);
      await refetch();
    } catch (err) {
      alert("Erro ao atualizar quantidade");
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-600 font-medium">Carregando fichas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Ticket className="w-10 h-10 text-blue-600" />
                Gerenciamento de Fichas
              </h1>
              <p className="text-gray-600">
                {fichas.length}{" "}
                {fichas.length === 1
                  ? "ficha cadastrada"
                  : "fichas cadastradas"}
              </p>
            </div>
            <button
              onClick={() => setShowCadastro(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <PackagePlus className="w-5 h-5" />
              Nova Ficha
            </button>
          </div>
        </div>

        {/* Fichas Grid */}
        {fichas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Ticket className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Nenhuma ficha cadastrada
            </h3>
            <p className="text-gray-600 mb-6">
              Comece cadastrando sua primeira ficha
            </p>
            <button
              onClick={() => setShowCadastro(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              <PackagePlus className="w-5 h-5" />
              Cadastrar Primeira Ficha
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fichas.map((ficha) => (
              <div
                key={ficha.ficha_id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <Ticket className="w-5 h-5 text-white flex-shrink-0" />
                      <h3 className="text-lg font-bold text-white break-words">
                        {ficha.nome_produto}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDelete(ficha.ficha_id)}
                      disabled={processingId === ficha.ficha_id || isDeletando}
                      className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                      title="Excluir ficha"
                    >
                      {processingId === ficha.ficha_id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() =>
                        handleUpdateQuantidade(
                          ficha.ficha_id,
                          ficha.quantidade - 1,
                        )
                      }
                      disabled={
                        ficha.quantidade === 0 ||
                        processingId === ficha.ficha_id
                      }
                      className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600 font-medium mb-1">
                        Quantidade
                      </span>
                      <span className="text-4xl font-bold text-gray-800 bg-gray-100 px-6 py-2 rounded-xl min-w-[120px] text-center">
                        {ficha.quantidade}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleUpdateQuantidade(
                          ficha.ficha_id,
                          ficha.quantidade + 1,
                        )
                      }
                      disabled={processingId === ficha.ficha_id}
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Data cadastro */}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">
                      Cadastrado em{" "}
                      {new Date(ficha.data_cadastro).toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Cadastro */}
      {showCadastro && (
        <CadFichasComponent
          onClose={() => setShowCadastro(false)}
          onSuccess={() => {
            refetch();
            setShowCadastro(false);
          }}
        />
      )}
    </div>
  );
}
