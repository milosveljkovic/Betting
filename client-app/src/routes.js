//import AddCredit from "./components/Credit/AddCredit"
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

var routes= [
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
]

export default routes;