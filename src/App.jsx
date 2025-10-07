import { Plus } from "lucide-react";
import AddTask from "./components/AddTaks";
import { useEffect, useRef, useState } from "react";
import CardTask from "./components/CardTask";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const inputTask = useRef();

  useEffect(() => {
    const data = window.localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  const handleCheckTask = (idTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === idTask ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: inputTask.current.value,
      isDone: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setOpenModal(false);
  };

  const handleRenameTask = (idTask, newTitle) => {
    const data = JSON.parse(window.localStorage.getItem("tasks"));
    if (data) {
      const updatedTasks = data.map((item) =>
        item.id === idTask ? { ...item, title: newTitle } : item
      );
      setTasks(updatedTasks);
      window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  const handleDeleteTask = (idTask) => {
    const data = JSON.parse(window.localStorage.getItem("tasks"));
    if (data) {
      const updatedTasks = data.filter((item) => item.id !== idTask);
      setTasks(updatedTasks);
      window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  return (
    <main className="h-screen justify-items-center content-center">
      <AddTask
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleAddTask}
        ref={inputTask}
      />
      <div className="w-1/2 shadow-2xl h-3/4 rounded-4xl overflow-hidden relative">
        {/* navbar */}
        <div className="bg-[#6C63FF] px-20 py-10"></div>
        <div className="px-20 mt-10">
          {/* header */}
          <div className="flex flex-col gap-3 mb-5">
            <h1 className="font-medium text-4xl">Todoin</h1>
            <p className="text-2xl text-gray-500">Make your daily to-do list</p>
          </div>
          <div className="grid grid-rows-1">
            {/* list tasks */}
            {tasks.length === 0 ? (
              <div className="text-4xl text-gray-500 flex justify-center items-center h-64">
                Task is empty
              </div>
            ) : (
              tasks.map((task) => (
                <CardTask
                  key={task.title}
                  task={task}
                  onChange={() => handleCheckTask(task.id)}
                  onRename={handleRenameTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="absolute rounded-full size-18 bg-[#6C63FF] bottom-10 right-10 flex items-center justify-center cursor-pointer hover:bg-[#2822a3]"
        >
          <Plus color="#fff" size={32} />
        </button>
      </div>
    </main>
  );
}

export default App;
