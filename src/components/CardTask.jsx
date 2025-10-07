import { Pencil, Trash } from "lucide-react";
import Checkbox from "./Checkbox";
import RenameTask from "./RenameTask";
import { useRef, useState } from "react";

function CardTask({ task, onChange, onRename }) {
  const [openModal, setOpenModal] = useState(false);
  const renameTask = useRef();
  const handleRenameTask = () => {
    const newTitle = renameTask.current.value.trim();
    onRename(task.id, newTitle);
    setOpenModal(false);
  };
  return (
    <div className="flex justify-between items-center py-5 border-b-2 border-b-gray-500 w-full">
      <RenameTask
        taskTitle={task.title}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleRenameTask}
        ref={renameTask}
      />
      <div className="flex items-center gap-5">
        <Checkbox checked={task.isDone} onChange={onChange} />
        <div className={`text-2xl ${task.isDone && "line-through"}`}>
          {task.title}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setOpenModal(true)} className="cursor-pointer">
          <Pencil color="gray" />
        </button>
        <button className="cursor-pointer">
          <Trash color="gray" />
        </button>
      </div>
    </div>
  );
}

export default CardTask;
