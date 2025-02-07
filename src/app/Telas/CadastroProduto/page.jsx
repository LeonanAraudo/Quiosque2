import Header from  '../../componentes/Header/page'
import {inter} from '../../Fontes/fonts'
import { useState } from 'react'
import {robotoBold} from '../../Fontes/fonts'

export default function CadastroProduto(){
    const [backImage, setBackImage] = useState(null)
    function handleImageChange(event){
        const file = event.target.files[0];
        if(file){
            setBackImage(URL.createObjectURL(file))
        }
    }
    return( 
        <div>
            <div className=''>
             <Header/>
            </div>
            <div>
             <p className={`w-full flex items-center justify-center text-xl mt-4 ${inter.className}`}>Adicionar Produto</p>
            </div>
            <form>
                <div className="w-full flex items-center justify-center mt-2">
                    <label 
                    style={{
                        backgroundImage: backImage ? `url(${backImage})` : "none",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat:'no-repeat'
                    }}
                    htmlFor="image" className="w-[85%] h-40 bg-gray-300 flex items-center justify-center cursor-pointer rounded">
                        <input type="file" accept="image/*" id="image" className="hidden" onChange={handleImageChange}/>
                        {!backImage && <span>Clique para enviar uma imagem</span>}
                    </label>
                </div>
                <div className='w-full flex items-center justify-center flex-col mt-3'>
                    <label htmlFor='nome' className={`w-[85%] flex justify-start ${robotoBold.className}`}>Nome</label>
                    <input type='text' id='nome' className='w-[85%] h-8 bg-gray-300 rounded pl-1 border-0 focus:outline-none'/>
                </div>
                <div className='w-full flex items-center justify-center mt-3'>
                    <div className='flex items-center justify-between flex-row w-[85%] gap-[2%]'>
                        <div className='flex flex-col'>
                            <label htmlFor='quantDispo' className={`${robotoBold.className}`}>Quant.Disponivel</label>
                            <input type='number' id='quantDispo' className='w-[100%] bg-gray-300 rounded h-8 pl-1 border-0 focus:outline-none'/>
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor='select' className={`${robotoBold.className}`}>Categoria</label>
                            <select id='select' className='bg-gray-300 rounded h-8'>
                                <option value='opção1'>Opção 1</option>
                                <option value='opção2'>Opção 2</option>
                            </select>
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor="DataVenc" className={`${robotoBold.className}`}>Data venc</label>
                            <input type="date" id='DataVenc' className='bg-gray-300 rounded h-8 border-0 focus:outline-none' />
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center mt-3' >
                    <div className='flex items-center justify-between flex-row w-[85%] gap-[2%]'>
                        <div className='flex flex-col'>
                            <label htmlFor='precoCompra' className={`${robotoBold.className}`}>Preço Compra</label>
                            <input type='number' id='precoCompra' className='w-[100%] bg-gray-300 rounded h-8 pl-1 border-0 focus:outline-none'/>
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor='precoVenda' className={`${robotoBold.className}`}>Preço Venda</label>
                            <input type='number' id='precoVenda' className='w-[100%] bg-gray-300 rounded h-8 pl-1 border-0 focus:outline-none'/>
                        </div>
                        <div className='flex flex-col '>
                            <label htmlFor="marca" className={`${robotoBold.className}`}>Marca</label>
                            <input type="text" id='marca' className='w-[100%] bg-gray-300 rounded h-8 pl-1 border-0 focus:outline-none' />
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center flex-col mt-3'>
                    <label htmlFor='desc' className={`flex w-[85%] justify-start ${robotoBold.className}`}>Descrição</label>
                    <textarea id='desc' className='w-[85%] bg-gray-300 rounded h-20 pl-1 border-0 focus:outline-none'></textarea>
                </div>
                <div className='w-full flex items-center justify-center mt-3 '>
                    <div className='w-[85%] flex items-center justify-between'>
                    <div className='flex flex-col w-[30%] '>
                        <label htmlFor="quantiMin" className={`${robotoBold.className}`}>Quant. Minima</label>
                        <input type="number" id='quantiMin' className='w-[100%] flex justify-start bg-gray-300 rounded h-8 pl-1 border-0 focus:outline-none' />
                    </div>
                    <div className='flex flex-col w-[68%] '>
                        <label htmlFor='fornecedor' className={`${robotoBold.className}`}>Fornecedor</label>
                        <input type="text" id='fornecedor' className='w-[100%] flex justify-end bg-gray-300 rounded h-8 pl-1 border-0 focus:outline-none'/>
                    </div>
                    </div>
                </div>
                <div>
                    <label>Modelo</label>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}