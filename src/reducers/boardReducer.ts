import type { BoardState, ColumnId, Task } from "../types";

export const initialState: BoardState = {
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
