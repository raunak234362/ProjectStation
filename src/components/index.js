//Authentication
import Login from "./login/Login";
import LoginAuthentication from "./login/LoginAuthentication"; 

//Dashboard
import MainContent from "./dashboard/main/MainContent";
import Sidebar from "./dashboard/sidebar/Sidebar";
import Header from "./dashboard/header/Header";

//Project
import Projects from "./dashboard/staff/admin/Project/Projects";
import AllProject from "./dashboard/staff/admin/Project/AllProject";
import AddProject from "./dashboard/staff/admin/Project/AddProject";
import EditProject from "./dashboard/staff/admin/Project/EditProject";

//Error Handling
import ErrorBoundary from "./error/ErrorBoundary";

// fields
import Button from "./fields/Button";
import Input from "./fields/Input";
import Select from "./fields/Select";
import Toggle from "./fields/Toggle";

export {
    Button,
    Input,
    Select,
    Toggle,
    Login,
    LoginAuthentication,
    MainContent,
    Sidebar,
    Header,
    AddProject,
    Projects,
    AllProject,
    EditProject,
    ErrorBoundary,
}