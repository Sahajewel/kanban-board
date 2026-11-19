export type Priority = "low" | "medium" | "high";
export type ColumnId = "todo" | "inProgress" | "done";
export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
};
export type BoardState = {
  [key in ColumnId]: Task[];
};
