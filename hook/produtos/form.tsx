import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormDataProps = {
  Nome: string;
  Preco_Venda: string;
  Preco_Compra: string;
  Descricao: string;
  Marca: string;
  Fornecedor: string;
  Quantidade_Disponivel: string;
  Categoria: string;
  Quantidade_Minima: string;
  Modelo: string;
  Data_Vencimento: string;
  Foto: File[] | null;
};

export default function useForm1() {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormDataProps>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  // Função para lidar com a alteração do arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("🟢 Arquivo selecionado:", file);
      // Converte FileList em Array e armazena
      setValue('Foto', Array.from(files));
    }
  };

  const onSubmit = async (data: FormDataProps) => {
    const formDataToSend = new FormData();
  
    // Adiciona os dados do formulário ao FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "Foto" && Array.isArray(value) && value.length > 0) {
        console.log("🟢 Arquivo anexado:", value[0]); // Verifica no console
        formDataToSend.append("Foto", value[0]);
      } else if (typeof value === "string") {
        formDataToSend.append(key, value);
      }
    });
  
    if (!data.Foto || !Array.isArray(data.Foto) || data.Foto.length === 0) {
      console.error("❌ Nenhuma imagem foi anexada!");
      setMessage({ type: "error", text: "Nenhuma imagem foi anexada!" });
      return;
    }
  
    try {
      const response = await axios.post("/api/CadProdutos/cadastrarProduto", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setMessage({ type: "success", text: "Produto criado com sucesso!" });
      router.push("/telas/Estoque");
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: "error", text: "Erro ao criar produto: " + error.message });
      }
    }
  };
  

  return { register, handleSubmit, setValue, onSubmit, handleFileChange };
}
