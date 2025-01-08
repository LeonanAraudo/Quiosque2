'use client'
import style from './style.module.css'

export default function Main(){
    return(
        <div className={style.container}>
            <div className={style.box}>
                <img className={style.backImage} src='/comida.jpg'></img>
                <div className={style.header}>
                    <p>Quiosque 2</p>
                    <p>icon</p>
                </div>
            </div>
        </div>
    )
}