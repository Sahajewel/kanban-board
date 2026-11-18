import type { ColumnId, Task } from "../types";
import TaskCard from "./TaskCard";

type ColumnProps = {
  id: ColumnId;
  title: string;
  tasks: Task[];
  onAdd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMove: (taskId: string, to: ColumnId) => void;
};

export default function Column({
  id,
  title,
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onMove,
}: ColumnProps) {
  return (
    <div className="flex w-full flex-col rounded-lg bg-gray-100 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold">
          {title} <span className="text-gray-500">({tasks.length})</span>
        </h2>
        <button
          onClick={onAdd}
          className="rounded bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700"
        >
          +Add
        </button>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-center text-sm text-gray-400">There is no task</p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            column={id}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onMove={(to) => onMove(task.id, to)}
          />
        ))}
      </div>
    </div>
  );
}
