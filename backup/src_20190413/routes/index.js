import About from "../layouts/Home/About";
import Register from "../layouts/Home/Register";
import Authentification from "../layouts/Home/Login";
import Price from "../layouts/Home/Price";
//import Dashboard from "./Dashboard.js";

const indexRoutes = [
  { 
    path: "/", 
    component: About,
    exact: true
  },
  { 
    path: "/register", 
    component: Register 
  },
  { 
    path: "/login", 
    component: Authentification 
  },
  { 
    path: "/prices", 
    component: Price 
  }
];

//const dashboardRoutes = Dashboard;

export default indexRoutes;
