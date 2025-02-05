import Header from  '../../componentes/Header/page'
import {inter} from '../../Fontes/fonts'
import { useState } from 'react'

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
            <div className="w-full flex items-center justify-center">
                <label 
                style={{
                    backgroundImage: backImage ? `url(${backImage})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                htmlFor="image" className="w-[85%] h-40 bg-gray-300 flex items-center justify-center cursor-pointer">
                    <input type="file" accept="image/*" id="image" className="hidden" onChange={handleImageChange}/>
                    {!backImage && <span>Clique para enviar uma imagem</span>}
                </label>
            </div>
            </form>
        </div>
    )
}