import { useEffect, useState, type FormEvent } from "react";
import type { Priority, Task } from "../types";

const STORAGE_KEY = "kanban-boards";
export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Task[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Must be written title");
      return;
    }
    setError("");

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDiscription("");
    setPriority("medium");
  };
  return (
    <div>
      <h2>Kanban Board</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          rows={3}
          placeholder="Description(optional)"
          value={description}
          onChange={(e) => setDiscription(e.target.value)}
        ></textarea>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Save</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.priority}</p>
        </div>
      ))}
    </div>
  );
}
