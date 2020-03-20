import App from "../layouts/Dashboard/App";
import Dashboard from "../layouts/Dashboard/Dashboard";
import About from "../layouts/Dashboard/About";
import Post from "../layouts/Dashboard/Post";

const dashboardRoutes = [
  { 
    path: "/app", 
    component: App
  },
  { 
    path: "/about", 
    component: About
  },
  { 
    path: "/post/:slug/:title", 
    component: Post
  },
  { 
    path: "/dashboard/:id/:title", 
    component: Dashboard
  }
];

export default dashboardRoutes;
