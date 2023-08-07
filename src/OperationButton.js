import { Actions } from "./App";

function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.chooseOperation, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
