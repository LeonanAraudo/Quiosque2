"use client"
import style from './style.module.css'
import { junge, montserratBold,montserrat } from '../../Fontes/fonts'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import { ToastContainer, toast, Flip } from 'react-toastify';

const theme = createTheme({
    palette:{
        primary:{
          main:"#000000"
      }
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
        button: {
            textTransform: 'none',
          },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              fontSize: '15px', 
              padding: '0px 30px', 
              minWidth: '120px', 
            },
          },
        },
      },
      
    })
    
    
export default function Login(){ 
    const { register , handleSubmit  } =useForm()
    const [inputType, setInputType] = useState('password');
    const toggleInputType = () => {
        if (inputType === 'password') {
        setInputType('text');
        } else {
        setInputType('password');
        }
    };
    const router = useRouter()
    const handleOnSubmit = async (data) => {
        try {
          const response = await axios.post('/api/Posts/login/login', {
            nome: data.nome,
            senha: data.senha
          })

          if(response.status === 200){
            router.push('/Telas/Main')
          }
        } catch (error) {
          if(error.response){
            if(error.response.status === 404){
             toast.error('Nome de usuário não encontrado');
            }else if(error.response.status === 401){
              toast.error('Senha incorreta')
            }
            
          }
        }
      };
      
    return(
        <div className={style.body}>
            <header className={style.header}> 
                <p className={`text-2xl bold ${junge.className}`}>Quiosque 2</p>
                <div className={style.line}></div>
            </header>
              <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Flip}
              />
              
            <div className={style.container}> 
                <div className={style.login}>
                    <div className={style.icon}>
                        <div className={style.line2}></div>
                        <div className={style.circle}>
                            <img width="40" height="40" src="https://img.icons8.com/pulsar-line/48/user.png" alt="user"/>
                        </div>
                        <div className={style.line2}></div>
                    </div>
                    <form  onSubmit={handleSubmit(handleOnSubmit)} className={style.form}>
                        <div className={style.boxInput}>
                            <label htmlFor='nome'  className={`text-[13px] ${montserratBold.className}`}>Nome</label>
                            <input type='text' id='nome' {...register('nome')} className={style.input} required/>
                        </div>
                        <div className={style.boxInput}>
                            <label htmlFor='senha' className={`text-[13px] ${montserratBold.className}`}>Senha</label>
                            <input type={inputType} id='senha' {...register('senha')} className={style.input} required/>
                            {inputType === 'text' ? 
                            (  <img className={style.eye} width="25" onClick={toggleInputType} height="25" src="https://img.icons8.com/sf-black-filled/64/visible.png" alt="visible"/>
                            ) : ( <img className={style.eye} onClick={toggleInputType} width="25" height="25" src="https://img.icons8.com/sf-black-filled/64/invisible.png" alt="invisible"/>  )}
                        </div>
                        <div className={style.boxButton}>
                            <ThemeProvider theme={theme}>
                                <Stack spacing={2} direction="row">
                                    <Button type='submit' variant="contained" color='primary'>Entrar</Button>
                                </Stack>
                            </ThemeProvider>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}