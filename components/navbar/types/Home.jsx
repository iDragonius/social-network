import React, { useContext } from 'react'
import { Context } from '../../../pages/_app'
import Link from 'next/link'
const Home = () => {
    const {store} = useContext(Context)
    return (
        <div className='flex cursor-pointer'>
                    <Link href={`/user/${store.userInfo.nickname}`}>
                        <div className='py-3 bg-gray-200 px-6 rounded-lg z-0 relative left-7 font-semibold text-purple-900 text-semibold' >{store.userInfo.nickname} </div>
                    </Link>
                    <Link href={`/user/${store.userInfo.nickname}`}>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg z-10 bg-purple-700  ml-4 cursor-pointer' >
                                <img src="./img/user.png" alt="logout" width='25px' />
                        </div>  
                    </Link>

                    <Link href='/settings'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg z-10 bg-purple-700  ml-4 cursor-pointer' >
                                <img src="./img/setting.png" alt="logout" width='25px' />
                        </div>
                    </Link>
                    
                </div>
    )
}

export default Home
