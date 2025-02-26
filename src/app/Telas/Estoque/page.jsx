import Header from '../../componentes/Header/page'
import ArrayProdutos from '@/app/componentes/ArrayProdutos/produtos'
import style from './style.module.css'
import { useState } from 'react'
export default function Estoque(){
   
    return(
        <div>
            <Header/>
           
        <div>
            <ArrayProdutos/>
        </div>
        </div>
    )
}