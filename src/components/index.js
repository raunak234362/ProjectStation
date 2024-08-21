//Authentication
import Login from "./login/Login";
import LoginAuthentication from "./login/LoginAuthentication"; 

//Dashboard
import MainContent from "./dashboard/main/MainContent";
import Sidebar from "./dashboard/sidebar/Sidebar";
import Header from "./dashboard/header/Header";

//Project
import Projects from "./dashboard/staff/admin/Project/Projects";
import AddProject from "./dashboard/staff/admin/Project/AddProject";
import EditProject from "./dashboard/staff/admin/Project/EditProject";

//Error Handling
import ErrorBoundary from "./error/ErrorBoundary";

// fields
import Button from "./fields/Button";
import Input from "./fields/Input";
import Select from "./fields/Select";


export {
    Button,
    Input,
    Select,
    Login,
    LoginAuthentication,
    MainContent,
    Sidebar,
    Header,
    AddProject,
    Projects,
    EditProject,
    ErrorBoundary,
}