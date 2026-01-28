import Home from "@/pages/Home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import MyListedItems from "@/pages/userDashboard/MyListedItems";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import AddNewItem from "@/pages/userDashboard/AddNewItem";

const RequireUserAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const RequireAdminAuth = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user",
    element: (
      <RequireUserAuth>
        <UserDashboardLayout />
      </RequireUserAuth>
    ),
    children: [
      { path: "dashboard", element: <MyListedItems /> },
      { path: "add", element: <AddNewItem /> },
      { path: "edit-item/:id", element: <AddNewItem /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
