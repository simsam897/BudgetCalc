import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Signin from "./Pages/Auth/Signin";
import Signup from "./Pages/Auth/Signup";

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
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
