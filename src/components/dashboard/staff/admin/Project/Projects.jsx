import { Link } from "react-router-dom"

const Projects = () => {
  return (
    <div>
        <div className="text-4xl font-bold text-gray-800">
            Projects
        </div>
        <div>
           <div>
            <Link to='add-project'>Add Project</Link>
           </div>
        </div>
    </div>
  )
}

export default Projects