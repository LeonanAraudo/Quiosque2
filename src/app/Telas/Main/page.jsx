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
                   <Link href={"#"}>
                      <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v6.png" alt="menu--v6"/>
                    </Link>
                </div>
                <div className={style.containerOptions}>
                    <div className={style.boxCircle}>
                        <Circle/>
                    </div>
                    <div className={style.containerCircleOptions}>    
                        <Link className={`ml-[152px] ${style.boxCircleOptions}`} href={'#'}>
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
                        <Link href={'#'} className={`ml-[162px] ${style.boxCircleOptions}`}>
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