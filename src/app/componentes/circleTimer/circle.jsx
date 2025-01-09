import moment from 'moment'
import style from './style.module.css'
import 'moment/locale/pt-br';
import  {roboto}  from '../../Fontes/fonts'

export default function Circle(){
    moment.locale('pt-br')
    const agoraDate = moment().format('DD/MM/YY')
    const agoraHour = moment().format('HH:mm')
    const agoraDay = moment().format('dddd').replace('-feira', '').toUpperCase();

    return(
        <div className={`${roboto.className} ${style.circle}`}>
            <p className={style.agoraA}>{agoraDay}</p>
            <div className={style.linha}></div>
            <p className={style.agoraB}>{agoraHour}</p>
            <div className={style.linha}></div>
            <p className={style.agoraC}>{agoraDate}</p>
        </div>
    )
}