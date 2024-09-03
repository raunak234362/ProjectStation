import { useEffect, useState } from 'react';
import {Login} from '../../components/index'
import Service from '../../config/Service';

const LoginContent = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      Service.ping().then((result) => {
        console.log(result)
        setIsConnected(result)
        if (result) {
          clearInterval(interval)
        }
      })
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, []);


  return (
    <div>
      {
        !isConnected && (
          <>
            <div className='absolute z-50 top-0 left-0 bg-black bg-opacity-50 w-screen h-screen'>
              <div className='flex w-full h-full items-center justify-center px-20 py-10'>
                  <div className='bg-white text-red-700 px-32 py-20 rounded-3xl border-2 border-red-700'>Connecting to Server, Please Wait...</div>
              </div>
            </div>
          </>
        )
      }
        <Login/>
    </div>
  )
}

export default LoginContent