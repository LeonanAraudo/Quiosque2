import Header from '../../../componentes/Header/page'
import { robotoBold, roboto } from '../../../Fontes/fonts'
import style from './style.module.css'
import { Button } from "@/components/ui/button"

export default function DataProduto(){
    return(
            <div className={`${style.container} ${roboto.className}`}>
                <header>
                    <Header linkDestino={""}/>
                </header>
                <div className={style.boxImage}>
                    <img className={style.image} src="/aga.png" alt="" />
                </div>
                <div className={style.dataBox}>
                        <div className={style.box1}>
                            <p className={`text-3xl ${robotoBold.className}`}>Agua mineral</p>
                            <img width="25" height="25" src="https://img.icons8.com/windows/32/pencil.png" alt="pencil"/>
                        </div>
                        <div className={style.box2}>
                            <p className={style.amount}>Disponivel em estoque: 10</p>
                            <p className={`${robotoBold.className} text-[23px]`}>R$100,00</p>
                        </div> 
                        <div className={style.box3}>
                            <p className={`${robotoBold.className} text-lg`}>Informações do Produto</p>
                            <div className='flex flex-col gap-2 mt-2 ml-2'>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Preço de Compra</p>
                                    <p className={`${roboto.className} text-xs`}>R$ 10,00</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Descrição</p>
                                    <p className={`${roboto.className} text-xs`}> Produto de agua vindo direto da antardida super agua muita agua agua 
                                    chichica auauauauauu</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Marca</p>
                                    <p className={`${roboto.className} text-xs`}>Nike</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Modelo</p>
                                    <p className={`${roboto.className} text-xs`}>Garrafa pet</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Fornecedor</p>
                                    <p className={`${roboto.className} text-xs`}>Jorge</p>
                                </div>                             
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between mt-4'>
                            <Button className='w-[130px] h-[25px]' variant="destructive">Apagar</Button>
                            <p className='text-xs'>Adicionado em: 10/10/2000</p>
                        </div>
                    </div>
                </div>
    )
}