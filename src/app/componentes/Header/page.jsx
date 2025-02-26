import Link from 'next/link';
import { junge } from '../../Fontes/fonts';
import style from './style.module.css';

export default function Header({ linkDestino }) {
  return (
    <div className={style.backBlack}>
      <header className={style.headerCircle}>
        <div className={style.options}>
          <Link href={linkDestino}>          
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/left.png"
                alt="left"
              />
          </Link>
          <p className={`${style.title} ${junge.className}`}>Quiosque 2</p>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v6.png"
            alt="menu--v6"
          />
        </div>
      </header>
    </div>
  );
}
