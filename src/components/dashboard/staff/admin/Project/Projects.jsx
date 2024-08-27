import { Link } from 'react-router-dom'

const Projects = () => {
  return (
    <div className='w-full'>
      <div className='flex  w-full justify-between items-center'>
        <div className=" text-3xl font-bold text-white bg-gray-800 px-5 py-1 mt-2 rounded-full">Projects</div>
        <div>
          <Link to="add-project" className='bg-gray-500 text-white px-5 py-1 rounded-full mt-2'>Add Project</Link>
        </div>
      </div>
      <div>
        {/* boxes for numerical data */}
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Projects
