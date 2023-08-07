import { Actions } from "./App";

function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.addDigit, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
