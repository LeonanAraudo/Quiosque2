"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import style from '../../../Telas/(Estoque)/Estoque/style.module.css'
import DialogDemo from './modalComponentCard';
import { useProdutosByCategoria } from '../../../../../hook/Produtos/useProdutosByCategoria';

export default function Card({ categorias, comanda_id }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [mud, setMud] = useState(true)
    const toggleMud = () => setMud((prevMud) => !prevMud);
    
    const { produtos: produto, isLoading } = useProdutosByCategoria(categorias);
    console.log("Comanda_id no card", comanda_id)
    const filteredPosts = produto.filter((produto) => produto.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <>
            <div className='w-full flex items-center justify-center'>
                <input value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onBlur={toggleMud}
                    onClick={toggleMud}
                    type='text' placeholder='pesquise um produto'
                    className={style.input} />
                {mud && <img className={style.lupa} width="28" height="28" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1" />
                }
            </div>
            {filteredPosts.map((produto) => (
                <div key={produto.produto_id} className="container-fluid p-3">
                    <div className="card h-[100%] flex flex-row" style={{ maxWidth: "100%" }}>
                        <div className='w-[90%] h-full flex flex-ro'>
                            <div className=" flex align-items-center justify-content-center w-[40%] h-auto">
                                <img
                                    src={produto.foto}
                                    className="img-fluid rounded-start"
                                    alt="Imagem aleatória"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className=" w-[60%]">
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text text-success">R${produto.preco_venda}</p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">Quantidade disponível: {produto.quantidade_disponivel}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=' flex items-center justify-baseline w-[10%] h-auto'>
                            <DialogDemo produto_id={produto.produto_id} comanda_id={comanda_id} quantidade_disponivel={produto.quantidade_disponivel} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
