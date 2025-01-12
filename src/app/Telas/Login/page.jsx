import style from './style.module.css'
import { junge, montserratBold } from '../../Fontes/fonts'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Login(){
    const [inputType, setInputType] = useState('password');
    const toggleInputType = () => {
        if (inputType === 'password') {
        setInputType('text');
        } else {
        setInputType('password');
        }
    };
    return(
        <div className={style.body}>
            <header className={style.header}> 
                <p className={`text-2xl bold ${junge.className}`}>Quiosque 2</p>
                <div className={style.line}></div>
            </header>
            <div className={style.container}> 
                <div className={style.login}>
                    <div className={style.icon}>
                        <div className={style.line2}></div>
                        <div className={style.circle}>
                            <img width="40" height="40" src="https://img.icons8.com/pulsar-line/48/user.png" alt="user"/>
                        </div>
                        <div className={style.line2}></div>
                    </div>
                    <form className={style.form}>
                        <div className={style.boxInput}>
                            <label htmlFor='nome'  className={`text-[13px] ${montserratBold.className}`}>Nome</label>
                            <input type='text' id='nome' className={style.input}/>
                        </div>
                        <div className={style.boxInput}>
                            <label htmlFor='senha' className={`text-[13px] ${montserratBold.className}`}>Senha</label>
                            <input type={inputType} id='senha' className={style.input}/>
                            {inputType === 'text' ? 
                            (  <img className={style.eye} width="25" onClick={toggleInputType} height="25" src="https://img.icons8.com/sf-black-filled/64/visible.png" alt="visible"/>
                            ) : ( <img className={style.eye} onClick={toggleInputType} width="25" height="25" src="https://img.icons8.com/sf-black-filled/64/invisible.png" alt="invisible"/>  )}
                        </div>
                        <div className={style.boxButton}>
                        <Stack spacing={2} direction="row">
                          <Button variant="contained">Entrar</Button>
                        </Stack>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}