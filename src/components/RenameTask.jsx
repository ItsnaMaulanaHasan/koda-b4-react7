function RenameTask({ isOpen, onClose, onConfirm, taskTitle, ref }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      {/* modal content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4 animate-fade-in flex flex-col gap-10">
        {/* title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          RENAME TASK
        </h2>
        {/* input */}
        <form onSubmit={onConfirm} className="flex flex-col gap-10">
          <input
            ref={ref}
            type="text"
            name="nameTask"
            id="nameTask"
            defaultValue={taskTitle}
            required
            className="border border-gray-500 rounded-md px-5 py-2 w-full focus:outline-none"
          />
          {/* buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition bg-[#6C63FF] text-white hover:bg-[#2822a3]`}
            >
              APPLY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RenameTask;
