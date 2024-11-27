import { useSelector } from "react-redux";

const Dashboard = () => {
  const RFI = useSelector((state) => state?.projectData?.rfiData);
  console.log(RFI);

  return (
    <div className="w-full h-[89vh] overflow-y-hidden mx-5">
      <div className="flex w-full justify-center items-center">
        <div className="text-3xl font-bold text-white bg-green-500/70 shadow-xl px-5 py-1 mt-2 rounded-lg">
          Dashboard
        </div>
      </div>

      <div className="h-[85vh] mt-2 overflow-y-auto">
        <div className="my-5 grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="grid text-center grid-cols-1 gap-3 ">
            <div className="grid grid-cols-2 gap-5">
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
            <div></div>
          </div>

          <div className="bg-white/70 rounded-lg md:w-full w-[90vw] p-4">
            <div className="flex justify-center bg-blue-gray-50 rounded-lg mb-2">
              RFI
            </div>
            <div className="overflow-x-auto h-[20vh]">
              <table className="min-w-full border-collapse text-center text-xs rounded-xl">
                <thead>
                  <tr className="bg-teal-200/70">
                    <th className="px-2 py-1">Project Name</th>
                    <th className="px-2 py-1">Subject/Remarks</th>
                    <th className="px-2 py-1">Date</th>
                    <th className="px-2 py-1">RFI Status</th>
                    <th className="px-2 py-1">RFI Forward</th>
                    <th className="px-2 py-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RFI?.length === 0 ? (
                    <tr className="bg-white">
                      <td colSpan="9" className="text-center">
                        No received RFI Found
                      </td>
                    </tr>
                  ) : (
                    RFI?.map((project) => (
                      <tr
                        key={project?.id}
                        className="hover:bg-blue-gray-100 border"
                      >
                        <td className="border px-2 py-1">
                          {project?.fabricator?.project?.name || "N/A"}
                        </td>
                        <td className="border px-2 py-1">
                          {project?.remarks || "No remarks"}
                        </td>
                        <td className="border px-2 py-1">
                          {project?.date || "N/A"}
                        </td>
                        <td className="border px-2 py-1">
                          {project?.status || "Open"}
                        </td>
                        <td className="border px-2 py-1">
                          <button className="bg-teal-300 px-2 py-1 rounded">
                            Forward
                          </button>
                        </td>
                        <td className="border px-2 py-1">
                          <button className="bg-blue-300 px-2 py-1 rounded">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
