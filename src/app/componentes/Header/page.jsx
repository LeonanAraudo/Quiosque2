import {junge} from '../../Fontes/fonts'
import style from './style.module.css'
export default function Header(){
    return(
        <div className={style.backBlack}>
            <header className={style.headerCircle}>
                <div className={style.options}>
                <img width="40" height="40" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/left.png" alt="left"/>
                <p className={`${style.title} ${junge.className}`}>Quiosque 2</p>
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v6.png" alt="menu--v6"/>
                </div>
            </header>
        </div>
    )
}