
import Login from "views/lists/Login.js";
import Tables from "views/lists/Tables.js";



var routes = [
  {
    path: "/index",
    name: "List Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  
];
export default routes;
