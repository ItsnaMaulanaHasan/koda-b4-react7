import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    try {
      const data = window.localStorage.getItem("tasks");
      if (data) {
        setTasks(JSON.parse(data));
      }
    } catch (error) {
      console.log("Failed to parse tasks from localStorage:", error);
    }
  }, []);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <RouterProvider router={router} />;
    </TaskContext.Provider>
  );
}

export default App;
