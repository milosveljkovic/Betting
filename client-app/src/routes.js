//import AddCredit from "./components/Credit/AddCredit"
import Home from './pages/Home'
import Login from './pages/Auth/Login'

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
]

export default routes;