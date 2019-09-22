import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.js";
import Information from "../views/Information/Information.jsx";

const indexRoutes = [
    { path: "/login", component: Login },
    { path: "/information", component: Information },
    { path: "/", component: Dashboard }
];

export default indexRoutes;
