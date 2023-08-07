import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const Actions = {
  addDigit: "add-digit",
  chooseOperation: "choose-operation",
  clear: "clear",
  deleteDigit: "delete-digit",
  evaluate: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.addDigit:
      if (state.overwrite) {
        return {
          ...state,
          current: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.current === "0") return state;
      if (payload.digit === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    case Actions.clear:
      return {};
    case Actions.chooseOperation:
      if (state.current == null && state.previous == null) {
        return state;
      }
      if (state.current == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previous == null)
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        };
      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      };
    case Actions.evaluate: {
      if (
        state.operation == null ||
        state.current == null ||
        state.previous == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),
      };
    }
    case Actions.deleteDigit:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          current: null,
        };
      if (state.current == null) return state;
      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        };
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    default:
      throw new Error("Unknown error");
  }
}

function evaluate({ current, previous, operation }) {
  const prevNum = parseFloat(previous);
  const currentNum = parseFloat(current);
  if (isNaN(prevNum) || isNaN(currentNum)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prevNum + currentNum;
      break;
    case "-":
      computation = prevNum - currentNum;
      break;
    case "*":
      computation = prevNum * currentNum;
      break;
    case "÷":
      computation = prevNum / currentNum;
      break;
    default:
      throw new Error("");
  }
  return computation.toString();
}

// const integerFormatter = new Intl.NumberFormat("en-us", {
//   maximumFractionDigits: 0,
// });

function App() {
  const [{ previous, current, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="container">
      <div className="grid">
        <div className="results">
          <div className="previous">
            {previous} {operation}
          </div>
          <div className="current">{current}</div>
        </div>

        <button
          className="span-two"
          onClick={() => dispatch({ type: Actions.clear })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: Actions.deleteDigit })}>
          DEL
        </button>
        <OperationButton dispatch={dispatch} operation="÷" />
        <DigitButton dispatch={dispatch} digit="1" />
        <DigitButton dispatch={dispatch} digit="2" />
        <DigitButton dispatch={dispatch} digit="3" />
        <OperationButton dispatch={dispatch} operation="*" />
        <DigitButton dispatch={dispatch} digit="4" />
        <DigitButton dispatch={dispatch} digit="5" />
        <DigitButton dispatch={dispatch} digit="6" />
        <OperationButton dispatch={dispatch} operation="+" />
        <DigitButton dispatch={dispatch} digit="7" />
        <DigitButton dispatch={dispatch} digit="8" />
        <DigitButton dispatch={dispatch} digit="9" />
        <OperationButton dispatch={dispatch} operation="-" />
        <DigitButton dispatch={dispatch} digit="." />
        <DigitButton dispatch={dispatch} digit="0" />
        <button
          className="span-two"
          onClick={() => dispatch({ type: Actions.evaluate })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
