import { Pencil, Trash } from "lucide-react";
import Checkbox from "./Checkbox";
import RenameTask from "./RenameTask";
import DeleteTask from "./DeleteTask";
import { useRef, useState } from "react";

function CardTask({ task, onChange, onRename, onDelete }) {
  const [openModalRename, setOpenModalRename] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const renameTask = useRef();
  const handleRenameTask = () => {
    const newTitle = renameTask.current.value.trim();
    onRename(task.id, newTitle);
    setOpenModalRename(false);
  };
  const handleDeleteTask = () => {
    onDelete(task.id);
    setOpenModalDelete(false);
  };
  return (
    <div className="flex justify-between items-center py-5 px-3 border-b-2 border-b-gray-500 w-full hover:bg-gray-200">
      <RenameTask
        taskTitle={task.title}
        isOpen={openModalRename}
        onClose={() => setOpenModalRename(false)}
        onConfirm={handleRenameTask}
        ref={renameTask}
      />
      <DeleteTask
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        onConfirm={handleDeleteTask}
      />
      <div className="flex items-center gap-5">
        <Checkbox checked={task.isDone} onChange={onChange} />
        <div className={`text-2xl ${task.isDone && "line-through"}`}>
          {task.title}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpenModalRename(true)}
          className="cursor-pointer"
        >
          <Pencil color="gray" />
        </button>
        <button
          onClick={() => setOpenModalDelete(true)}
          className="cursor-pointer"
        >
          <Trash color="gray" />
        </button>
      </div>
    </div>
  );
}

export default CardTask;
