import type { BoardState, ColumnId, Task } from "../types";

export const initialBoardState: BoardState = {
  todo: [],
  inProgress: [],
  done: [],
};
export type BoardAction =
  | {
      type: "ADD_TASK";
      payload: { column: ColumnId; task: Task };
    }
  | { type: "DELETE_TASK"; payload: { column: ColumnId; id: string } }
  | { type: "EDIT_TASK"; payload: { column: ColumnId; task: Task } }
  | {
      type: "MOVE_TASK";
      payload: { from: ColumnId; to: ColumnId; id: string };
    };

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "ADD_TASK": {
      const { column, task } = action.payload;
      return {
        ...state,
        [column]: [...state[column], task],
      };
    }
    case "DELETE_TASK": {
      const { column, id } = action.payload;
      return {
        ...state,
        [column]: state[column].filter((t) => t.id !== id),
      };
    }
    case "EDIT_TASK": {
      const { column, task } = action.payload;
      return {
        ...state,
        [column]: state[column].map((t) => (t.id === task.id ? task : t)),
      };
    }
    case "MOVE_TASK": {
      const { from, to, id } = action.payload;
      if (from === to) {
        return state;
      }
      const task = state[from].find((t) => t.id === id);
      if (!task) return state;
      return {
        ...state,
        [from]: state[from].filter((t) => t.id !== id),
        [to]: [...state[to], task],
      };
    }
    default:
      return state;
  }
}
