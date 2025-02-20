/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Clock, Users, CheckCircle, AlertCircle } from "lucide-react";

const ProjectStatus = ({ projectId, onClose }) => {
  const projectData = useSelector((state) =>
    state?.projectData.projectData.find((project) => project.id === projectId)
  );
  const taskData = useSelector((state) => state.taskData.taskData);
  const userData = useSelector((state) => state.userData.staffData);

  const projectTasks = taskData.filter((task) => task.projectId === projectId);

  const calculateHours = (type) => {
    const tasks = projectTasks.filter((task) => task.name.startsWith(type));
    return {
      assigned: tasks.reduce((sum, task) => sum + (task.assignedHours || 0), 0),
      taken: tasks.reduce((sum, task) => sum + (task.takenHours || 0), 0),
    };
  };

  const taskTypes = {
    MODELING: calculateHours("MODELING"),
    DETAILING: calculateHours("DETAILING"),
    CHECKING: calculateHours("CHECKING"),
    ERECTION: calculateHours("ERECTION"),
  };

  const totalAssignedHours = Object.values(taskTypes).reduce(
    (sum, type) => sum + type.assigned,
    0
  );

  const userContributions = userData
    .map((user) => {
      const userTasks = projectTasks.filter((task) => task.assignedTo === user.id);
      return {
        ...user,
        totalTasks: userTasks.length,
        totalHours: userTasks.reduce((sum, task) => sum + (task.takenHours || 0), 0),
      };
    })
    .filter((user) => user.totalTasks > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
      <div className="bg-white h-[80vh] overflow-y-auto p-5 rounded-lg shadow-lg w-11/12 md:w-8/12">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="bg-blue-600 text-white px-4 py-2 text-xl font-bold rounded-lg shadow-md">
              Project: {projectData?.name || "Unknown"}
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={onClose}>
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Clock className="h-5 w-5" /> Hours Overview
              </h2>
              <p>Estimated Hours: {projectData?.estimatedHours || 0}</p>
              <p>Total Assigned Hours: {totalAssignedHours}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Users className="h-5 w-5" /> Team Contribution
              </h2>
              <ul>
                {userContributions.map((user) => (
                  <li key={user.id}>{user.name}: {user.totalHours} hours</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <CheckCircle className="h-5 w-5" /> Task Type Breakdown
            </h2>
            {Object.entries(taskTypes).map(([type, hours]) => (
              <p key={type}>{type}: {hours.taken}/{hours.assigned} hours</p>
            ))}
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <AlertCircle className="h-5 w-5" /> Project Status
            </h2>
            <p>Total Tasks: {projectTasks.length}</p>
            <p>
              Completed: {projectTasks.filter(task => task.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
