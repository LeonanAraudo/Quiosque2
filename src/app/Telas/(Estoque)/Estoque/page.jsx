"use client"
import Header from '../../../componentes/Header/header'
import ArrayProdutos from '../../../componentes/(ComponentesEstoque)/ArrayProdutos/produtos'
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