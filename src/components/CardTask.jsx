import { Pencil, Trash } from "lucide-react";
import Checkbox from "./Checkbox";

function CardTask({ task, onChange }) {
  return (
    <div className="flex justify-between items-center py-5 border-b-2 border-b-gray-500 w-full">
      <div className="flex items-center gap-5">
        <Checkbox checked={task.isDone} onChange={onChange} />
        <div className={`text-2xl ${task.isDone && "line-through"}`}>
          {task.title}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer">
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
