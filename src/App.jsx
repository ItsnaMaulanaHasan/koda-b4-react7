import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { TaskContext } from "./context/TaskContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./context/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);

function App() {
  // handle authcontext
  const [userLogin, setUserLogin] = useState(() => {
    try {
      const data = window.localStorage.getItem("userLogin");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log("Failed to parse tasks from localStorage:", error);
      return null;
    }
  });
  useEffect(() => {
    window.localStorage.setItem("userLogin", JSON.stringify(userLogin));
  }, [userLogin]);

  // handle taskcontext
  const [tasks, setTasks] = useState(() => {
    try {
      const data = window.localStorage.getItem("tasks");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log("Failed to parse tasks from localStorage:", error);
      return [];
    }
  });
  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <AuthContext.Provider value={{ userLogin, setUserLogin }}>
      <TaskContext.Provider value={{ tasks, setTasks }}>
        <RouterProvider router={router} />;
      </TaskContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
