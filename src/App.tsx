import "./App.css";
import Saha from "./components/Saha";

import { useBoard } from "./hook/useBoard";

function App() {
  const { board, dispatch } = useBoard();
  return (
    <div>
      <Saha />
      <button
        onClick={() =>
          dispatch({
            type: "ADD_TASK",
            payload: {
              column: "inProgress",
              task: {
                id: crypto.randomUUID(),
                title: "Test Task",
                description: "",
                priority: "low",
              },
            },
          })
        }
      >
        Add To Task
      </button>
      <pre>{JSON.stringify(board, null, 11)}</pre>
    </div>
  );
}

export default App;
