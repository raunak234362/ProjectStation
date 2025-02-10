
import { Login } from '../../components/index'

const LoginContent = () => {

  return (
    <div>
      {/* {!isConnected && (
        <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50">
          <div className="flex items-center justify-center w-full h-full px-20 py-10">
            <div className="px-32 py-20 text-red-700 bg-white border-2 border-red-700 rounded-3xl">
              {
                result ? 'Connecting to Server, Please Wait...':'Connection Failed, Please Check Your Internet Connection'
              }
            </div>
          </div>
        </div>
      )} */}
      <Login />
    </div>
  )
}

export default LoginContent
