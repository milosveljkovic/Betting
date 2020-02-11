//import AddCredit from "./components/Credit/AddCredit"
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Matches from './pages/Matches'
import Team from './pages/Team'
import Profile from './pages/Profile'
import Ticket from './pages/Ticket'

var routes= [
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/sport/:id",
        name: "Matches",
        component: Matches,
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
    {
        path: "/team/:id",
        name: "Team",
        component: Team,
    },
    {
        path: "/user/:id",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/ticket/:id",
        name: "Ticket",
        component: Ticket,
    }
]

export default routes;