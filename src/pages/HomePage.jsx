import { useContext, useRef, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { Plus } from "lucide-react";
import CardTask from "../components/CardTask";
import AddTasks from "../components/AddTaks";

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
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <AddTasks
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleAddTask}
        ref={inputTask}
      />
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-2xl rounded-4xl overflow-hidden">
        {/* navbar */}
        <div className="bg-[#7F265B] px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-10"></div>
        <div className="mt-5 px-6 sm:px-10 md:px-16 lg:px-20 pb-28 sm:pb-32 md:pb-40 relative min-h-96 sm:min-h-120">
          {/* header */}
          <div className="flex flex-col gap-2 sm:gap-3 mb-5">
            <h1 className="font-medium text-3xl sm:text-4xl">Todoin</h1>
            <p className="text-xl sm:text-2xl text-gray-500">
              Make your daily to-do list
            </p>
          </div>
          <div className="grid grid-rows-1">
            {/* list tasks */}
            {tasks.length === 0 ? (
              <div className="text-2xl sm:text-3xl md:text-4xl text-gray-500 flex justify-center items-center h-32">
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
            className="absolute rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-[#7F265B] bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 flex items-center justify-center cursor-pointer hover:bg-[#481333] transition-colors shadow-lg"
          >
            <Plus color="#fff" size={28} className="sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
