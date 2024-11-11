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
import GetProject from './dashboard/staff/admin/Project/GetProject'


//Work Breakdown
import WorkBreakdown from './dashboard/staff/admin/Project/WorkBreakdown'
import AddWB from './dashboard/staff/admin/Project/AddWB'
import EditWB from './dashboard/staff/admin/Project/EditWB'


//Fabricator
import Fabricators from './dashboard/staff/admin/fabricator/Fabricators'
import AddFabricator from './dashboard/staff/admin/fabricator/AddFabricator'
import AllFabricator from './dashboard/staff/admin/fabricator/AllFabricator'
import AddFabricatorUser from './dashboard/staff/admin/fabricator/AddFabricatorUser'
import AllClients from './dashboard/staff/admin/fabricator/AllClients'
import GetFabricator from './dashboard/staff/admin/fabricator/GetFabricator'
import GetClient from './dashboard/staff/admin/fabricator/GetClient'
import AddBranch from './dashboard/staff/admin/fabricator/AddBranch'
import EditFabricator from './dashboard/staff/admin/fabricator/EditFabricator'

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
import GetVendor from './dashboard/staff/admin/vendor/GetVendor'
import GetVendorUser from './dashboard/staff/admin/vendor/GetVendorUser'
import AddVendorBranch from './dashboard/staff/admin/vendor/AddVendorBranch'

//RFI
import RFI from './dashboard/staff/admin/rfi/RFI'
import CreateRFI from './dashboard/staff/admin/rfi/CreateRFI'
import AllSentRFI from './dashboard/staff/admin/rfi/AllSentRFI'
import AllReceivedRFI from './dashboard/staff/admin/rfi/AllReceivedRFI'
import GetSentRFI from './dashboard/staff/admin/rfi/GetSentRFI'

//Submittals
import Submittals from './dashboard/staff/admin/submittals/Submittals'
import SendSubmittals from './dashboard/staff/admin/submittals/SendSubmittals'
import AllReceivedSubmittals from './dashboard/staff/admin/submittals/AllReceivedSubmittals'
import AllSubmittals from './dashboard/staff/admin/submittals/AllSubmittals'

//Change Order
import CO from './dashboard/staff/admin/co/CO'
import AllSentCO from './dashboard/staff/admin/co/AllSentCO'
import AllReceivedCO from './dashboard/staff/admin/co/AllReceivedCO'
import SendCO from './dashboard/staff/admin/co/SendCO'

//Error Handling
import ErrorBoundary from './error/ErrorBoundary'

// fields
import Button from './fields/Button'
import Input from './fields/Input'
import CustomSelect from './fields/Select'
import Toggle from './fields/Toggle'
import MultipleFileUpload from './fields/MultipleFileUpload'

export {
  Button,
  Input,
  CustomSelect,
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
  GetProject,
  EditProject,
  WorkBreakdown,
  EditWB,
  AddWB,
  Fabricators,
  AddFabricator,
  AddFabricatorUser,
  AllClients,
  AllFabricator,
  GetFabricator,
  GetClient,
  AddBranch,
  EditFabricator,
  ManageTeam,
  AddEmployee,
  AllEmployees,
  AllDepartment,
  AddDepartment,
  Vendor,
  AddVendor,
  AllVendors,
  AllVendorUser,
  GetVendor,
  AddVendorUser,
  GetVendorUser,
  AddVendorBranch,
  RFI,
  CreateRFI,
  AllSentRFI,
  AllReceivedRFI,
  GetSentRFI,
  Submittals,
  SendSubmittals,
  AllReceivedSubmittals,
  AllSubmittals,
  CO,
  AllSentCO,
  AllReceivedCO,
  SendCO,
  ErrorBoundary,
}
