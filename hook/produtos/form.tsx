import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {useForm} from 'react-hook-form'

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
    Foto: FileList | null;
  }

export default function useForm1(){
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormDataProps>();
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const router = useRouter();

    const onSubmit = async (data: FormDataProps) => {
        const formDataToSend = new FormData();
      
        // Adiciona os dados do formulário ao FormData
        for (const key in data) {
          const value = data[key as keyof FormDataProps];
          
          // Verifica se o valor não é undefined ou null
          if (value !== undefined && value !== null) {
            if (key !== 'Foto') {
              formDataToSend.append(key, value.toString()); // Converte para string se não for o arquivo
            }
          }
        }
      
        // Adiciona o arquivo de imagem ao FormData
        if (data.Foto && data.Foto.length > 0) {
          formDataToSend.append('Foto', data.Foto[0]);
        }
      
        try {
          const response = await axios.post('/api/CadProdutos/cadastrarProduto', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setMessage({ type: 'success', text: 'Produto criado com sucesso!' });
          router.push('/telas/Estoque');
        } catch (error) {
          if (error instanceof Error) {
            setMessage({ type: 'error', text: 'Erro ao criar produto: ' + error.message });
          }
        }
      };
      
      return { register,handleSubmit,setValue,onSubmit }
}