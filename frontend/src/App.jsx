import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Signin from "./Pages/Auth/Signin";
import Signup from "./Pages/Auth/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Dashboard from "./Pages/Dashboard";
import Budget from "./Pages/Budget";
import CreateBudget from "./Pages/CreateBudget";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "signin",
        element: <Signin />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/budget",
        element: <Budget />,
      },
      {
        path: "/createbudget",
        element: <CreateBudget />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
