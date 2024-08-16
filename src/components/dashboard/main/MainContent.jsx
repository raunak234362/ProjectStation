import { useSelector } from "react-redux";

const MainContent = () => {
  const data = useSelector((state) => state.userData.userData);

  console.log(data);

  return (
    <div className="text-xl md:text-6xl text-green-500 p-5 md:p-10">
      MainContent {data?.username}
    </div>
  );
}

export default MainContent;
