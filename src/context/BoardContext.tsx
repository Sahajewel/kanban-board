import { useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { boardReducer, initialBoardState } from "../reducers/boardReducer";
import type { BoardState } from "../types";
import { BoardContext } from "./BoardContext";

const STORAGE_KEY = "kanban-board";

function init(initial: BoardState): BoardState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as BoardState) : initial;
  } catch {
    return initial;
  }
}

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, dispatch] = useReducer(boardReducer, initialBoardState, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    } catch {
      // ignore
    }
  }, [board]);

  return (
    <BoardContext.Provider value={{ board, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
