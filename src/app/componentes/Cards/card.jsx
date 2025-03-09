"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

export default function Card({categorias}) {
    const [ produto, setProduto ] = useState([])

    useEffect(() => {
        async function fetchProdutos() {
            const url = categorias ? `/api/GetCategory/${categorias}` : '/api/GetProdutos/produtos'
            const response = await fetch(url)
            const data = await response.json();
            setProduto(data)
        }
        fetchProdutos();
      }, [categorias]);
    return (
        <>
       {produto.map((produto) => (  
            <div className="container-fluid p-3">
                    <div className="card d-flex flex-row" style={{ maxWidth: "100%" }}>
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            <img
                                src={produto.foto}
                                className="img-fluid rounded-start"
                                alt="Imagem aleatória"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-6.5">
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text text-success">R${produto.preco_venda}</p>
                                <p className="card-text">
                                    <small className="text-body-secondary">Quantidade disponível: {produto.quantidade_disponivel}</small>
                                </p>
                            </div>
                        </div>
                        <div className='col-1.5 mt-11'>
                        <button className="btn btn-dark">+</button>
                        </div>
                    </div>
            </div>
       ))} 
        </>
    );
}
