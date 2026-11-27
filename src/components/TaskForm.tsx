import { useState, type SubmitEvent } from "react";
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

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Must be written title");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tilte"
        />
        {error && <p>{error}</p>}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description(optional)"
        rows={3}
      ></textarea>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
