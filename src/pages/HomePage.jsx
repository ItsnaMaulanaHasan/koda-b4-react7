import { useContext, useRef, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTasks from "../components/AddTaks";
import CardTask from "../components/CardTask";
import { Plus } from "lucide-react";

function HomePage() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [openModal, setOpenModal] = useState(false);
  const inputTask = useRef();

  const handleCheckTask = (idTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === idTask ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: inputTask.current.value,
      isDone: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setOpenModal(false);
  };

  const handleRenameTask = (idTask, newTitle) => {
    const updatedTasks = tasks.map((item) =>
      item.id === idTask ? { ...item, title: newTitle } : item
    );
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (idTask) => {
    const updatedTasks = tasks.filter((item) => item.id !== idTask);
    setTasks(updatedTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  return (
    <main className="h-screen justify-items-center content-center">
      <AddTasks
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleAddTask}
        ref={inputTask}
      />
      <div className="w-1/2 shadow-2xl rounded-4xl overflow-hidden">
        {/* navbar */}
        <div className="bg-[#7F265B] px-20 py-10"></div>
        <div className="mt-5 px-20 pb-40 relative min-h-120">
          {/* header */}
          <div className="flex flex-col gap-3 mb-5">
            <h1 className="font-medium text-4xl">Todoin</h1>
            <p className="text-2xl text-gray-500">Make your daily to-do list</p>
          </div>
          <div className="grid grid-rows-1">
            {/* list tasks */}
            {tasks.length === 0 ? (
              <div className="text-4xl text-gray-500 flex justify-center items-center h-32">
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
          <button
            onClick={() => setOpenModal(true)}
            className="absolute rounded-full size-18 bg-[#7F265B] bottom-10 right-10 flex items-center justify-center cursor-pointer hover:bg-[#481333]"
          >
            <Plus color="#fff" size={32} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
