import { NavLink } from 'react-router-dom'
import LOGO from '../../../assets/logo.png'

const Sidebar = () => {
  return (
    <div className="fixed flex flex-col h-screen bg-slate-800 text-white">
      <div className="flex p-5">
        <div className="">
          <img src={LOGO} alt="logo" className="w-60 bg-white rounded-lg" />
        </div>
      </div>
      <nav className='p-5'>
        <ul className=' flex flex-col gap-5'>
          <li>
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/client">Client</NavLink>
          </li>
          <li>
            <NavLink to="/project">Project</NavLink>
          </li>
          <li>
            <NavLink to="/rfi">RFI</NavLink>
          </li>
          <li>
            <NavLink to="/rfi">Submittals</NavLink>
          </li>
          <li>
            <NavLink to="/rfi">Change Order</NavLink>
          </li>
          <li>
            <NavLink to="/rfi">Update Program</NavLink>
          </li>
          <li>
            <NavLink to="/rfi">Manage Team</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
