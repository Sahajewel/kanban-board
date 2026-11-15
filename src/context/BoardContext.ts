import { createContext, type Dispatch } from "react";
import type { BoardState } from "../types";
import type { BoardAction } from "../reducers/boardReducer";
export type BoardContextType = {
  board: BoardState;
  dispatch: Dispatch<BoardAction>;
};
export const BoardContext = createContext<BoardContextType | null>(null);
