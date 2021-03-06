import React, {useState, useRef, useContext, useEffect} from 'react'
import axios  from 'axios'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import { useRouter } from 'next/router'
import { Context } from './_app'
import { observer } from 'mobx-react-lite'

const Registration = () => {
    const {store} = useContext(Context)
    const emailRef =useRef()
    const passwordRef =useRef()
    const confPasswordRef = useRef()
    const nickanmeRef = useRef()
    const router = useRouter()
    const [status, setStatus] = useState(true)
    const regUser = async (e) =>{
      e.preventDefault()
      if(confPasswordRef.current.value !== passwordRef.current.value || (passwordRef.current.value).length<5){
        setStatus(false)
        return
      }
      store.registration(emailRef.current.value, passwordRef.current.value, nickanmeRef.current.value.trim()  ) 
              .then(()=>{
                if(store.status === 200){
                  router.push('/activation')
                } else {
                  setStatus(false)
                }
              })
      }

      useEffect( ()=>{
        store.checkAuth().then(()=>{
           if(store.isAuth){
             router.push('/')
             
           }
        })
       
     },[])

     if(store.isLoading){
      return(
        <div className='bg-indigo-800 h-screen flex justify-center items-center' >
            <h1 className = 'text-3xl text-white font-bold'>Loading....</h1>
        </div>
      )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-800 ">
            <Head>
              <title>Registration</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar type = {'login'} />
            <div className = {status 
                                  ? 'font-mono text-3xl text-white font-bold' 
                                  : 'font-mono text-3xl text-red-700 font-bold' 
                              }
            >
                      Registration
            </div>
            <form  action = '' className = 'flex flex-col '>
            <input 
                type='text' 
                placeholder= 'Nickname' 
                className = { status 
                              ?  'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white  focus:bg-purple-900 focus:text-white outline-none mt-10'
                              : ' transition border-2 border-red-600 duration-300 px-10 py-5 text-red-600 placeholder-red-700  font-bold font-mono text-xl rounded-xl bg-white  outline-none mt-10'
                            }
                ref={nickanmeRef}
                />
              <input 
                type='text' 
                placeholder= 'Email' 
                className = { status 
                              ?  'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-purple-900 focus:text-white outline-none mt-10'
                              : ' transition border-2 border-red-600 duration-300 px-10 py-5 text-red-600 placeholder-red-700  font-bold font-mono text-xl rounded-xl bg-white mb-10   outline-none mt-10'
                            }
                ref={emailRef}
                />
              <input 
                type = 'text' 
                placeholder= 'Password' 
                className = { status 
                              ?  'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-purple-900 focus:text-white outline-none '
                              : ' transition border-2 border-red-600 duration-300 px-10 py-5 text-red-600  placeholder-red-700 font-bold font-mono text-xl rounded-xl bg-white mb-10   outline-none'
                            }
                ref={passwordRef}
               />
               <input 
                type = 'text' 
                placeholder= 'Repeat password' 
                className = { status 
                              ?  'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-purple-900 focus:text-white outline-none '
                              : ' transition border-2 border-red-600 duration-300 px-10 py-5 text-red-600  placeholder-red-700 font-bold font-mono text-xl rounded-xl bg-white mb-10   outline-none'
                            }
                ref={confPasswordRef}
               />
              <button onClick={regUser}  className = ' text-center transition duration-300 cursor-pointer px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-2xl focus:bg-purple-900 outline-none text-purple-800 focus:text-white'>Registration</button>
               
               
              
              
          </form>
          
        </div>
          
    )
}

export default observer(Registration)

