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
    <div>
      <div>
        <h2>
          {title} <span>{tasks.length}</span>
        </h2>
        <button onClick={onAdd}>+Add</button>
      </div>
      <div>
        {tasks.length === 0 && <p>There is no Task</p>}
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
