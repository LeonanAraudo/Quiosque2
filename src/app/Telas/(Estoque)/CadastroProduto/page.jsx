"use client"
import Header from '../../../componentes/Header/header'
import {inter} from '../../../Fontes/fonts'
import { useState } from 'react'
import {robotoBold, roboto} from '../../../Fontes/fonts'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import useForm1 from '../../../../../hook/CadastoProdutosHook/form';
import { ToastContainer, Zoom } from 'react-toastify';

const theme = createTheme({
    palette:{
        primary:{
          main:"#000000"
      }
    },
    typography: {
            fontFamily: roboto.style.fontFamily,
            button: {
                textTransform: 'none',
              },
          },
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  fontSize: '15px', 
                  padding: '5px 35px', 
                  minWidth: '120px', 
                },
              },
            },
          },
})

export default function CadastroProduto(){
    const {register, handleSubmit,handleFileChange,onSubmit} = useForm1()

   const [imageSrc, setImageSrc] = useState(null);
  
   const localHandleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
    handleFileChange(e);
  };

  const onSubmitHandler = async (data) => {
    await onSubmit(data);
    setImageSrc(null); 
  };

    return( 
        <div>
            <div>
                 <Header linkDestino={'/Telas/Estoque'}/>    
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom}
                />
            <div>
             <p className={`w-full flex items-center justify-center text-xl mt-4 ${inter.className}`}>Adicionar Produto</p>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)} >
                <div className="w-full flex items-center justify-center mt-3">
                <label htmlFor="image" className='flex items-center justify-center'>
                    {imageSrc ? <img src={imageSrc} className='bg-cover w-[85%] h-56' alt="Prévia da imagem" /> : <p className='bg-gray-300 w-[100%] h-56 rounded cursor-pointer flex items-center justify-center'>Clique para enviar uma imagem</p>}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    {...register('foto', {
                        onChange: (e) => {
                        localHandleFileChange(e);
                        }
                    })}
                    id="image"
                    className="hidden"
                    
                    />
                </div>
                <div className='w-full flex items-center justify-center flex-col mt-5'>
                    <label htmlFor='Nome' className={`w-[85%] flex justify-start ${robotoBold.className}`}>Nome</label>
                    <input {...register('nome')} type='text' id='Nome' className='w-[85%] h-9 bg-gray-300 rounded pl-1 border-0 focus:outline-none'required/>
                </div>
                <div className='w-full flex items-center justify-center mt-5'>
                   <div className='w-[85%] flex items-center justify-between gap-[2%]'>
                        <div className='flex flex-col '>
                            <label htmlFor='select' className={`${robotoBold.className}`}>Categoria</label>
                            <select {...register('categorias')} id='select' className='bg-gray-300 rounded h-9 w-[207%]'required>
                                <option value='Bebidas'>Bebidas</option>
                                <option value='Lanches'>Lanches</option>
                                <option value='Shakes'>Shakes</option>
                                <option value='Porcoes'>Porções</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="DataVenc" className={`${robotoBold.className}`}>Data Vencimento</label>
                            <input type="date" id='DataVenc' {...register('data_vencimento')} className='w-[100%] bg-gray-300 rounded h-9 border-0 focus:outline-none' required/>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center mt-5' >
                    <div className='flex items-center justify-between flex-row w-[85%] gap-[2%]'>
                        <div className='flex flex-col'>
                        <label htmlFor='precoCompra' className={`${robotoBold.className}`}>Pre Compra</label>
                            <input {...register('preco_compra')} type='number' min={1} id='precoCompra' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'required/>
                        </div>
                        <div className='flex flex-col '>
                        <label htmlFor='precoVenda' className={`${robotoBold.className}`}>Pre Venda</label>
                            <input {...register('preco_venda')} type='number'  min={1} id='precoVenda' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'required/>
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor="marca" className={`${robotoBold.className}`}>Marca</label>
                            <input {...register('marca')} type="text" id='marca' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none' />
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center flex-col mt-5'>
                    <label htmlFor='desc' className={`flex w-[85%] justify-start ${robotoBold.className}`}>Descrição</label>
                    <textarea {...register('descricao')} id='desc' className='w-[85%] bg-gray-300 rounded h-20 pl-1 border-0 focus:outline-none'></textarea>
                </div>
                <div className='w-full flex items-center justify-center mt-5 '>
                    <div className='w-[85%] flex items-center justify-between gap-[2%]'>
                        <div className='flex flex-col '>
                            <label htmlFor="quantiMin" className={`${robotoBold.className}`}>Quant.Minima</label>
                            <input {...register('quantidade_minima')} type="number"  min={1} id='quantiMin' className='w-[100%] flex justify-start bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='quantDispo' className={`${robotoBold.className}`}>Quant.Disponivel</label>
                            <input type='number' min={1} {...register('quantidade_disponivel')} id='quantDispo' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'required/>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center mt-5 '>
                    <div className='w-[85%] flex items-center justify-between'>
                        <div className='flex flex-col w-[100%] '>
                            <label htmlFor='fornecedor' className={`${robotoBold.className}`}>Fornecedor</label>
                            <input {...register('fornecedor')} type="text" id='fornecedor' className='w-[100%] flex justify-end bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'/>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center flex-col mt-5'>
                    <label className={` w-[85%] flex justify-start ${robotoBold.className}`}>Modelo</label>
                    <input {...register('modelo')} type="text" className='w-[85%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none' />
                </div>
                <ThemeProvider theme={theme}>
                    <Stack spacing={2} direction="row" className='w-full flex items-center justify-center mt-10 mb-10'>
                     <Button type='submit' variant="contained">Cadastrar</Button>
                    </Stack>
                </ThemeProvider>
            </form>
        </div>
    )
}