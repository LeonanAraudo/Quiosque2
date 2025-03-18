"use client"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {robotoBold, roboto} from '../../Fontes/fonts'
import { useState } from 'react';
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


export default function PatchComponent(){
       const [imageSrc, setImageSrc] = useState(null);

    return(
        <>
        <div className="flex items-center justify-center">
            <form className="bg-[#EDEDED] w-[90%] h-[70%] " >
                            <div className="w-full flex items-center justify-center mt-3">
                            <label htmlFor="image">
                                {imageSrc ? <img src={imageSrc} alt="Prévia da imagem" /> : "Clique para enviar uma imagem"}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                className="hidden"
                                />
                            </div>
                            <div className='w-full flex items-center justify-center flex-col mt-5'>
                                <label htmlFor='Nome' className={`w-[85%] flex justify-start ${robotoBold.className}`}>Nome</label>
                                <input type='text' id='Nome' className='w-[85%] h-9 bg-gray-300 rounded pl-1 border-0 focus:outline-none'/>
                            </div>
                            <div className='w-full flex items-center justify-center mt-5'>
                               <div className='flex items-center justify-between flex-row w-[85%] gap-[2%]'>
                                    <div className='flex flex-col'>
                                        <label htmlFor='quantDispo' className={`${robotoBold.className}`}>Quant.Disponivel</label>
                                        <input type='number' min={1}  id='quantDispo' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'/>
                                    </div>
                                    <div className='flex flex-col '>
                                        <label htmlFor='select' className={`${robotoBold.className}`}>Categoria</label>
                                        <select  id='select' className='bg-gray-300 rounded h-9'>
                                            <option value='Bebidas'>Bebidas</option>
                                            <option value='Lanches'>Lanches</option>
                                            <option value='Shakes'>Shakes</option>
                                            <option value='Porcoes'>Porções</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col '>
                                        <label htmlFor="DataVenc" className={`${robotoBold.className}`}>Data venc</label>
                                        <input type="date" id='DataVenc'  className='w-[120px] bg-gray-300 rounded h-9 border-0 focus:outline-none' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center mt-5' >
                                <div className='flex items-center justify-between flex-row w-[85%] gap-[2%]'>
                                    <div className='flex flex-col'>
                                        <label htmlFor='precoCompra' className={`${robotoBold.className}`}>Preço Compra</label>
                                        <input type='number' min={1} id='precoCompra' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'/>
                                    </div>
                                    <div className='flex flex-col '>
                                        <label htmlFor='precoVenda' className={`${robotoBold.className}`}>Preço Venda</label>
                                        <input  type='number'  min={1} id='precoVenda' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'/>
                                    </div>
                                    <div className='flex flex-col '>
                                        <label htmlFor="marca" className={`${robotoBold.className}`}>Marca</label>
                                        <input  type="text" id='marca' className='w-[100%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center flex-col mt-5'>
                                <label htmlFor='desc' className={`flex w-[85%] justify-start ${robotoBold.className}`}>Descrição</label>
                                <textarea  id='desc' className='w-[85%] bg-gray-300 rounded h-20 pl-1 border-0 focus:outline-none'></textarea>
                            </div>
                            <div className='w-full flex items-center justify-center mt-5 '>
                                <div className='w-[85%] flex items-center justify-between'>
                                <div className='flex flex-col w-[30%] '>
                                    <label htmlFor="quantiMin" className={`${robotoBold.className}`}>Quant. Min</label>
                                    <input  type="number"  min={1} id='quantiMin' className='w-[100%] flex justify-start bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none' />
                                </div>
                                <div className='flex flex-col w-[68%] '>
                                    <label htmlFor='fornecedor' className={`${robotoBold.className}`}>Fornecedor</label>
                                    <input  type="text" id='fornecedor' className='w-[100%] flex justify-end bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none'/>
                                </div>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center flex-col mt-5'>
                                <label className={` w-[85%] flex justify-start ${robotoBold.className}`}>Modelo</label>
                                <input  type="text" className='w-[85%] bg-gray-300 rounded h-9 pl-1 border-0 focus:outline-none' />
                            </div>
                            <ThemeProvider theme={theme}>
                                <Stack spacing={2} direction="row" className='w-full flex items-center justify-center mt-10 mb-10'>
                                <Button type='submit' variant="contained">Cadastrar</Button>
                                </Stack>
                            </ThemeProvider>
                        </form>
            </div>
        </>
    )
}