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
import AllVendorUser from './dashboard/staff/admin/vendor/AllVendorUser'
import AddVendorUser from './dashboard/staff/admin/vendor/AddVendorUser'


//RFI
import RFI from './dashboard/staff/admin/rfi/RFI'
import CreateRFI from './dashboard/staff/admin/rfi/CreateRFI'
import AllSentRFI from './dashboard/staff/admin/rfi/AllSentRFI'
import AllReceivedRFI from './dashboard/staff/admin/rfi/AllReceivedRFI'

//Submittals
import Submittals from './dashboard/staff/admin/submittals/Submittals'
import SendSubmittals from './dashboard/staff/admin/submittals/SendSubmittals'
import AllReceivedSubmittals from './dashboard/staff/admin/submittals/AllReceivedSubmittals'
import AllSubmittals from './dashboard/staff/admin/submittals/AllSubmittals'
//Error Handling
import ErrorBoundary from './error/ErrorBoundary'

// fields
import Button from './fields/Button'
import Input from './fields/Input'
import Select from './fields/Select'
import Toggle from './fields/Toggle'
import MultipleFileUpload from './fields/MultipleFileUpload'

export {
  Button,
  Input,
  Select,
  Toggle,
  MultipleFileUpload,
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
  AllVendorUser,
  AddVendorUser,
  RFI,
  CreateRFI,
  AllSentRFI,
  AllReceivedRFI,
  Submittals,
  SendSubmittals,
  AllReceivedSubmittals,
  AllSubmittals,
  ErrorBoundary,
}
