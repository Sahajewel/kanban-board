import type { ColumnId, Priority, Task } from "../types";

const priorityStyle: Record<Priority, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};
const columnOrder: ColumnId[] = ["todo", "inProgress", "done"];
const columnLabel: Record<ColumnId, string> = {
  todo: "Todo",
  inProgress: "In Progress",
  done: "Done",
};

type TaskCardProps = {
  task: Task;
  column: ColumnId;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (to: ColumnId) => void;
};
export default function TaskCard({
  task,
  column,
  onEdit,
  onDelete,
  onMove,
}: TaskCardProps) {
  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{task.title}</h3>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${priorityStyle[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <select
          value={column}
          onChange={(e) => onMove(e.target.value as ColumnId)}
          className="rounded border p-1 text-sm"
        >
          {columnOrder.map((c) => (
            <option key={c} value={c}>
              {columnLabel[c]}
            </option>
          ))}
        </select>
        <div className="flex gap-2 text-sm">
          <button onClick={onEdit} className="text-blue-600 hover:underline">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
