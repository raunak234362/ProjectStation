import { useSelector } from "react-redux"

const MainContent = () => {
const data = useSelector((state)=>state.userData)
console.log(data)
  
  return (
    <div>MainContent {data?.username} </div>
  )
}

export default MainContent