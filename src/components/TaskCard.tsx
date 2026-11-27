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
    <div>
      <div>
        <h3>{task.title}</h3>
        <span className={`${priorityStyle[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && <p>{task.description}</p>}
      <div>
        <select
          value={column}
          onChange={(e) => onMove(e.target.value as ColumnId)}
        >
          {columnOrder.map((c) => (
            <option key={c} value={c}>
              {columnLabel[c]}
            </option>
          ))}
        </select>
        <div>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
