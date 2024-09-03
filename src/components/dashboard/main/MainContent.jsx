import { useSelector } from 'react-redux'

const MainContent = () => {
  const data = useSelector((state) => state.userData.userData)

  // console.log(data)

  return (
    <div className=" md:m-4 m-2 w-full">
      <div className="flex bg-white md:mx-0 mx-2 justify-center rounded-xl">
        <div className="px-5 py-2  text-teal-400 text-lg md:text-2xl font-semibold ">
          Profile{' '}
        </div>
      </div>
      <div className="bg-white md:mx-0 mx-2 px-2 rounded-lg mt-2">
        <div className="flex flex-row w-full">
          <div className='block mb-1 w-fit min-w-32 font-semibold'>Name:</div> <div>{data?.username}</div>
        </div>
        <div className="flex flex-row w-full">
          <div className='block mb-1 w-fit min-w-32 font-semibold'>Role:</div> <div>{data?.username}</div>
        </div>
        <div className="flex flex-row w-full">
          <div className='block mb-1 w-fit min-w-32 font-semibold'>Username:</div> <div>{data?.username}</div>
        </div>
        <div className="flex flex-row w-full">
          <div className='block mb-1 w-fit min-w-32 font-semibold'>Mail ID:</div> <div>{data?.username}</div>
        </div>
        <div className="flex flex-row w-full">
          <div className='block mb-1 w-fit min-w-32 font-semibold'>Contact No.:</div>
          <div>{data?.username}</div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
