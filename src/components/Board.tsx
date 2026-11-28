import { useState } from "react";
import { useBoard } from "../hook/useBoard";
import type { ColumnId, Task } from "../types";
import Column from "./Column";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

const columns: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "Todo" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

type ModalState =
  | { mode: "closed" }
  | { mode: "add"; column: ColumnId }
  | { mode: "edit"; column: ColumnId; task: Task };

export default function Board() {
  const { board, dispatch } = useBoard();
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const closeModal = () => setModal({ mode: "closed" });

  const handleSubmit = (data: Omit<Task, "id">) => {
    if (modal.mode === "add") {
      dispatch({
        type: "ADD_TASK",
        payload: {
          column: modal.column,
          task: { id: crypto.randomUUID(), ...data },
        },
      });
    }
    if (modal.mode === "edit") {
      dispatch({
        type: "EDIT_TASK",
        payload: { column: modal.column, task: { id: modal.task.id, ...data } },
      });
    }
    closeModal();
  };
  return (
    <div>
      <h1>Kanban Board</h1>
      <div>
        {columns.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={board[col.id]}
            onAdd={() => setModal({ mode: "add", column: col.id })}
            onEdit={(task) => setModal({ mode: "edit", column: col.id, task })}
            onDelete={(id) =>
              dispatch({
                type: "DELETE_TASK",
                payload: { column: col.id, id },
              })
            }
            onMove={(id, to) =>
              dispatch({ type: "MOVE_TASK", payload: { from: col.id, to, id } })
            }
          />
        ))}
      </div>
      <Modal
        isOpen={modal.mode !== "closed"}
        onClose={closeModal}
        title={modal.mode === "edit" ? "Edid Task" : "Add Task"}
      >
        {modal.mode !== "closed" && (
          <TaskForm
            initialTask={modal.mode === "edit" ? modal.task : undefined}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}
