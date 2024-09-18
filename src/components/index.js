//Authentication
import Login from './login/Login'
import LoginAuthentication from './login/LoginAuthentication'

//Dashboard
import MainContent from './dashboard/main/MainContent'
import ChangePassword from './dashboard/main/ChangePassword'
import Sidebar from './dashboard/sidebar/Sidebar'
import Header from './dashboard/header/Header'

//Project
import Projects from './dashboard/staff/admin/Project/Projects'
import AllProject from './dashboard/staff/admin/Project/AllProject'
import AddProject from './dashboard/staff/admin/Project/AddProject'
import EditProject from './dashboard/staff/admin/Project/EditProject'

//Fabricator
import Fabricators from './dashboard/staff/admin/fabricator/Fabricators'
import AddFabricator from './dashboard/staff/admin/fabricator/AddFabricator'
import AllFabricator from './dashboard/staff/admin/fabricator/AllFabricator'
import AddFabricatorUser from './dashboard/staff/admin/fabricator/AddFabricatorUser'
import AllClients from './dashboard/staff/admin/fabricator/AllClients'

//Team
import ManageTeam from './dashboard/staff/admin/Team/ManageTeam'
import AddEmployee from './dashboard/staff/admin/Team/AddEmployee'
import AllEmployees from './dashboard/staff/admin/Team/AllEmployees'
import AllDepartment from './dashboard/staff/admin/Team/AllDepartment'
import AddDepartment from './dashboard/staff/admin/Team/AddDepartment'
//Vendor 
import Vendor from './dashboard/staff/admin/vendor/Vendor'
import AddVendor from './dashboard/staff/admin/vendor/AddVendor'
import AllVendors from './dashboard/staff/admin/vendor/AllVendors'
//Error Handling
import ErrorBoundary from './error/ErrorBoundary'

// fields
import Button from './fields/Button'
import Input from './fields/Input'
import Select from './fields/Select'
import Toggle from './fields/Toggle'

export {
  Button,
  Input,
  Select,
  Toggle,
  Login,
  LoginAuthentication,
  MainContent,
  ChangePassword,
  Sidebar,
  Header,
  AddProject,
  Projects,
  AllProject,
  EditProject,
  Fabricators,
  AddFabricator,
  AddFabricatorUser,
  AllClients,
  AllFabricator,
  ManageTeam,
  AddEmployee,
  AllEmployees,
  AllDepartment,
  AddDepartment,
  Vendor,
  AddVendor,
  AllVendors,
  ErrorBoundary,
}
