'use client'
import style from './style.module.css'
import {junge,montserrat} from '../../Fontes/fonts'
import Circle from '../../componentes/circleTimer/circle'
import Link from 'next/link'

export default function Main(){
    return(
        <div className={style.container}>
            <div className={style.box}>
                <img className={style.backImage} src='/transferir.jpg'></img>
                <div className={style.header}>
                    <p className={`${style.logo} ${junge.className}`}>Quiosque 2</p>
                </div>
                <div className={style.containerOptions}>
                    <div className={style.boxCircle}>
                        <Circle/>
                    </div>
                    <div className={style.containerCircleOptions}>
                        <div>
                            <div className={style.rowCircleOptions}>
                                <Link className={`mt-[-10px] ${style.boxCircleOptions}`} href={'/Telas/Mesas'}>
                                    <div className={style.circleOptions}>
                                        <img width="38" height="38" src="https://img.icons8.com/ios/50/FFFFFF/table.png" alt="box--v1"/>
                                    </div>
                                    <p className={`${montserrat.className} ${style.optionsTitle}`}>Mesas</p>
                                </Link>
                            </div>  
                            <div className={style.rowCircleOptions}>
                                <Link className={`ml-[155px] mt-[5px] ${style.boxCircleOptions}`} href={'/Telas/Estoque'}>
                                    <div className={style.circleOptions}>
                                        <img width="38" height="38" src="https://img.icons8.com/pastel-glyph/128/FFFFFF/box--v1.png" alt="box--v1"/>
                                    </div>
                                    <p className={`${montserrat.className} ${style.optionsTitle}`}>Estoque</p>
                                </Link>
                                <Link href={"/Telas/Fichas"} className={`ml-[195px] mt-[30px] ${style.boxCircleOptions}`}>
                                    <div className={style.circleOptions}>
                                    <img width="38" height="38" src="https://img.icons8.com/ios/50/FFFFFF/ticket--v1.png" alt="survey--v1"/>
                                    </div>
                                    <p className={`${montserrat.className} ${style.optionsTitle}`}>Fichas</p>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className={style.rowCircleOptions}>
                                <Link className={`ml-[200px] mt-[30px] ${style.boxCircleOptions}`} href={'/Telas/Options'}>
                                    <div className={style.circleOptions}>
                                        <img width="38" height="38" src="https://img.icons8.com/comic/100/FFFFFF/milkshake.png" alt="box--v1"/>
                                    </div>
                                    <p className={`${montserrat.className} ${style.optionsTitle}`}>Guaraná</p>
                                </Link>
                                <Link href={'/Telas/ComandasCozinha'} className={`ml-[140px] mt-[20px] ${style.boxCircleOptions}`}>
                                    <div className={style.circleOptions}>
                                    <img width="38" height="38" src="https://img.icons8.com/ios-filled/50/FFFFFF/kitchen-room.png" alt="combo-chart"/>
                                    </div>
                                    <p className={`${montserrat.className} ${style.optionsTitle}`}>Cozinha</p>
                                </Link>
                            </div>
                            <div className={style.rowCircleOptions}>
                                <Link href={'#'} className={` ${style.boxCircleOptions}`}>
                                    <div className={style.circleOptions}>
                                    <img width="38" height="38" src="https://img.icons8.com/glyph-neue/64/FFFFFF/combo-chart.png" alt="combo-chart"/>
                                    </div>
                                    <p className={`${montserrat.className} ${style.optionsTitle}`}>Resultados</p>
                                </Link>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}