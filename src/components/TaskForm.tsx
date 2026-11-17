import { useState, type SyntheticEvent } from "react";
import type { Priority, Task } from "../types";

type TaskFormProps = {
  initialTask?: Task;
  onSubmit: (data: Omit<Task, "id">) => void;
  onCancel: () => void;
};
export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? "",
  );
  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority ?? "medium",
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title must be written");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setTitle("");
          }}
          placeholder="Task Title"
          className="w-full rounded p-2"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description(optional)"
        rows={3}
        className="w-full rounded border p-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="w-full rounded p-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
