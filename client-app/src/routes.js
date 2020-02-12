//import AddCredit from "./components/Credit/AddCredit"
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Matches from './pages/Matches'
import Team from './pages/Team'
import Profile from './pages/Profile'
import Ticket from './pages/Ticket'
import CurrentTicket from './pages/CurrentTicket'
import Bank from './pages/Bank'
import TopTickets from './pages/TopTickets'

var routes= [
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path:"/current-ticket",
        name:"CurrentTicket",
        component:CurrentTicket
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
    },
    {
        path: "/bank",
        name: "Bank",
        component: Bank,
    },
    {
        path: "/top-tickets",
        name: "TopTickets",
        component: TopTickets,
    }
]

export default routes;