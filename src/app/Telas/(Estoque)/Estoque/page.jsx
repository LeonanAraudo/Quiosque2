"use client"
import Header from '../../../componentes/Header/page'
import ArrayProdutos from '@/app/componentes/(ComponentesEstoque)/ArrayProdutos/produtos'
import style from './style.module.css'
import { useState } from 'react'
export default function Estoque(){
   
    return(
        <div>
            <Header linkDestino={'/Telas/Main'}/>    
        <div>
            <ArrayProdutos/>
        </div>
        </div>
    )
}