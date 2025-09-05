import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormDataProps = {
  nome: string;
  preco_venda: string;
  preco_compra: string;
  descricao: string;
  marca: string;
  fornecedor: string;
  quantidade_disponivel: string;
  categorias: string;
  quantidade_minima: string;
  modelo: string;
  data_vencimento: string;
  foto: File[] | null;
};

export default function useForm1() {
  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<FormDataProps>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  // Função para lidar com a alteração do arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("🟢 Arquivo selecionado:", file);
      setValue('foto', Array.from(files));
    }
  };

  const onSubmit = async (data: FormDataProps) => {
    const formDataToSend = new FormData();

    // Adiciona os dados do formulário ao FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "foto" && Array.isArray(value) && value.length > 0) {
        formDataToSend.append("foto", value[0]);
      } else if (typeof value === "string") {
        formDataToSend.append(key, value);
      }
    });

    if (!data.foto || !Array.isArray(data.foto) || data.foto.length === 0) {
      setMessage({ type: "error", text: "Nenhuma imagem foi anexada!" });
      return;
    }

    // Aqui entra o toast.promise para feedback visual
    toast.promise(
      axios.post("/api/Posts/CadProdutos/cadastrarProduto", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: 'Cadastrando produto...',
        success: 'Produto criado com sucesso!',
        error: 'Erro ao criar produto.',
      }
    ).then(() => {
      reset()
      router.push("/Telas/CadastroProduto"); 
    }).catch((error) => {
      if (error instanceof Error) {
        setMessage({ type: "error", text: "Erro ao criar produto: " + error.message });
      }
    });
  };

  return { register, handleSubmit, setValue, onSubmit, handleFileChange,  };
}
