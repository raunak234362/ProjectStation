const Dashboard = () => {
  return (
    <div className="w-full h-[89vh] overflow-y-hidden mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Dashboard
        </div>
      </div>

      <div className="h-[85vh] mt-2 overflow-y-auto">
        <div className="my-5 grid md:grid-cols-3 grid-cols-1 gap-5">

          <div className="grid text-center md:grid-cols-2 grid-cols-2 gap-5 ">
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                All Projects
              </div>
              <div className="text-3xl font-bold">{2343}</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-white/50 rounded-lg p-3 shadow-lg">
              <div className="font-bold text-base text-gray-800">
                Completed Projects
              </div>
              <div className="text-3xl font-bold">{452}</div>
            </div>

          </div>

          <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
