'use client'
import style from './style.module.css'
import {junge,montserrat} from '../../Fontes/fonts'
import Circle from '../../componentes/circleTimer/circle'
import Link from 'next/link'

export default function Main(){
    return(
        <div className={style.container}>
            <div className={style.box}>
                <img className={style.backImage} src='/comida.jpg'></img>
                <div className={style.header}>
                    <p className={`${style.logo} ${junge.className}`}>Quiosque 2</p>
                </div>
                <div className={style.containerOptions}>
                    <div className={style.boxCircle}>
                        <Circle/>
                    </div>
                    <div className={style.containerCircleOptions}>    
                        <Link className={`ml-[140px] mt-[40px] ${style.boxCircleOptions}`} href={'/Telas/Estoque'}>
                            <div className={style.circleOptions}>
                                <img width="38" height="38" src="https://img.icons8.com/pastel-glyph/128/FFFFFF/box--v1.png" alt="box--v1"/>
                            </div>
                            <p className={`${montserrat.className} ${style.optionsTitle}`}>Estoque</p>
                        </Link>
                        <Link href={"#"} className={`ml-[198px] ${style.boxCircleOptions}`}>
                            <div className={style.circleOptions}>
                            <img width="38" height="38" src="https://img.icons8.com/glyph-neue/64/FFFFFF/survey--v1.png" alt="survey--v1"/>
                            </div>
                            <p className={`${montserrat.className} ${style.optionsTitle}`}>Pedidos</p>
                        </Link>
                        <Link href={'#'} className={`ml-[142px] ${style.boxCircleOptions}`}>
                            <div className={style.circleOptions}>
                            <img width="38" height="38" src="https://img.icons8.com/glyph-neue/64/FFFFFF/combo-chart.png" alt="combo-chart"/>
                            </div>
                            <p className={`${montserrat.className} ${style.optionsTitle}`}>Resultados</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}