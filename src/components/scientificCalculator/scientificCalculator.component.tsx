"use client";

import { useState, useEffect, useCallback } from "react";

type Operation =
  | "+"
  | "-"
  | "*"
  | "/"
  | "sin"
  | "cos"
  | "tan"
  | "log"
  | "ln"
  | "sqrt"
  | "pow"
  | "fact";
type AngleMode = "deg" | "rad";

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForOperand: boolean;
  memory: number;
  angleMode: AngleMode;
  parentheses: number;
  history: string[];
}

const factorial = (n: number): number => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

export default function ScientificCalculator() {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    memory: 0,
    angleMode: "deg",
    parentheses: 0,
    history: [],
  });

  // Basic input functions
  const inputDigit = useCallback((digit: number) => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: String(digit),
          waitingForOperand: false,
        };
      }

      return {
        ...prev,
        display: prev.display === "0" ? String(digit) : prev.display + digit,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: "0.",
          waitingForOperand: false,
        };
      }

      if (prev.display.indexOf(".") === -1) {
        return {
          ...prev,
          display: prev.display + ".",
        };
      }

      return prev;
    });
  }, []);

  const clear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: "0",
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      parentheses: 0,
    }));
  }, []);

  const clearEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: "0",
      waitingForOperand: false,
    }));
  }, []);

  // Memory functions
  const memoryClear = useCallback(() => {
    setState((prev) => ({ ...prev, memory: 0 }));
  }, []);

  const memoryRecall = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: String(prev.memory),
      waitingForOperand: true,
    }));
  }, []);

  const memoryAdd = useCallback(() => {
    setState((prev) => ({
      ...prev,
      memory: prev.memory + parseFloat(prev.display),
    }));
  }, []);

  const memorySubtract = useCallback(() => {
    setState((prev) => ({
      ...prev,
      memory: prev.memory - parseFloat(prev.display),
    }));
  }, []);

  // Scientific functions
  const performOperation = useCallback(
    (nextOperation: Operation) => {
      const inputValue = parseFloat(state.display);

      if (state.previousValue === null) {
        setState((prev) => ({
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
        }));
      } else if (state.operation) {
        const currentValue = state.previousValue || 0;
        let result: number;

        try {
          switch (state.operation) {
            case "+":
              result = currentValue + inputValue;
              break;
            case "-":
              result = currentValue - inputValue;
              break;
            case "*":
              result = currentValue * inputValue;
              break;
            case "/":
              if (inputValue === 0) throw new Error("Division by zero");
              result = currentValue / inputValue;
              break;
            case "pow":
              result = Math.pow(currentValue, inputValue);
              break;
            default:
              result = inputValue;
          }

          setState((prev) => ({
            ...prev,
            display: String(result),
            previousValue: result,
            operation: nextOperation,
            waitingForOperand: true,
            history: [
              ...prev.history.slice(-9),
              `${currentValue} ${prev.operation} ${inputValue} = ${result}`,
            ],
          }));
        } catch {
          setState((prev) => ({
            ...prev,
            display: "Error",
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          }));
        }
      }
    },
    [state.display, state.previousValue, state.operation]
  );

  const performScientificFunction = useCallback(
    (func: Operation) => {
      const inputValue = parseFloat(state.display);
      let result: number;

      try {
        switch (func) {
          case "sin":
            result =
              state.angleMode === "deg"
                ? Math.sin((inputValue * Math.PI) / 180)
                : Math.sin(inputValue);
            break;
          case "cos":
            result =
              state.angleMode === "deg"
                ? Math.cos((inputValue * Math.PI) / 180)
                : Math.cos(inputValue);
            break;
          case "tan":
            result =
              state.angleMode === "deg"
                ? Math.tan((inputValue * Math.PI) / 180)
                : Math.tan(inputValue);
            break;
          case "log":
            if (inputValue <= 0) throw new Error("Invalid input for log");
            result = Math.log10(inputValue);
            break;
          case "ln":
            if (inputValue <= 0) throw new Error("Invalid input for ln");
            result = Math.log(inputValue);
            break;
          case "sqrt":
            if (inputValue < 0) throw new Error("Invalid input for sqrt");
            result = Math.sqrt(inputValue);
            break;
          case "fact":
            if (inputValue < 0 || !Number.isInteger(inputValue))
              throw new Error("Invalid input for factorial");
            result = factorial(inputValue);
            break;
          default:
            result = inputValue;
        }

        setState((prev) => ({
          ...prev,
          display: String(result),
          waitingForOperand: true,
          history: [
            ...prev.history.slice(-9),
            `${func}(${inputValue}) = ${result}`,
          ],
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          display: "Error",
          waitingForOperand: true,
        }));
      }
    },
    [state.display, state.angleMode]
  );

  const toggleAngleMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      angleMode: prev.angleMode === "deg" ? "rad" : "deg",
    }));
  }, []);

  const inputConstant = useCallback((constant: "pi" | "e") => {
    const value = constant === "pi" ? Math.PI : Math.E;
    setState((prev) => ({
      ...prev,
      display: String(value),
      waitingForOperand: true,
    }));
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= "0" && key <= "9") {
        inputDigit(parseInt(key));
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+") {
        performOperation("+");
      } else if (key === "-") {
        performOperation("-");
      } else if (key === "*") {
        performOperation("*");
      } else if (key === "/") {
        performOperation("/");
      } else if (key === "Enter" || key === "=") {
        performOperation("+"); // Trigger calculation
      } else if (key === "Escape") {
        clear();
      } else if (key === "Backspace") {
        clearEntry();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [inputDigit, inputDecimal, performOperation, clear, clearEntry]);

  const buttonClass =
    "flex h-9 w-full items-center justify-center rounded-md border border-gray-300 bg-white text-xs font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

  const operationButtonClass =
    "flex h-9 w-full items-center justify-center rounded-md border border-blue-300 bg-blue-50 text-xs font-medium text-blue-700 shadow-sm transition-all duration-200 hover:bg-blue-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-800/30";

  const scientificButtonClass =
    "flex h-9 w-full items-center justify-center rounded-md border border-purple-300 bg-purple-50 text-xs font-medium text-purple-700 shadow-sm transition-all duration-200 hover:bg-purple-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:border-purple-600 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-800/30";

  return (
    <div className="max-w-2lg rounded-xl bg-white p-4 shadow-2xl dark:bg-gray-800">
      {/* Display */}
      <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Scientific Calculator</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">MEM: {state.memory}</span>
            <button
              onClick={toggleAngleMode}
              className="rounded px-1.5 py-0.5 text-xs font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {state.angleMode.toUpperCase()}
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
            {state.display}
          </div>
        </div>
        {state.history.length > 0 && (
          <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
            {state.history[state.history.length - 1]}
          </div>
        )}
      </div>

      {/* Memory Functions */}
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        <button onClick={memoryClear} className={buttonClass}>
          MC
        </button>
        <button onClick={memoryRecall} className={buttonClass}>
          MR
        </button>
        <button onClick={memoryAdd} className={buttonClass}>
          M+
        </button>
        <button onClick={memorySubtract} className={buttonClass}>
          M-
        </button>
      </div>

      {/* Scientific Functions Row 1 */}
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        <button
          onClick={() => performScientificFunction("sin")}
          className={scientificButtonClass}
        >
          sin
        </button>
        <button
          onClick={() => performScientificFunction("cos")}
          className={scientificButtonClass}
        >
          cos
        </button>
        <button
          onClick={() => performScientificFunction("tan")}
          className={scientificButtonClass}
        >
          tan
        </button>
        <button
          onClick={() => performScientificFunction("log")}
          className={scientificButtonClass}
        >
          log
        </button>
      </div>

      {/* Scientific Functions Row 2 */}
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        <button
          onClick={() => performScientificFunction("ln")}
          className={scientificButtonClass}
        >
          ln
        </button>
        <button
          onClick={() => performScientificFunction("sqrt")}
          className={scientificButtonClass}
        >
          √
        </button>
        <button
          onClick={() => inputConstant("pi")}
          className={scientificButtonClass}
        >
          π
        </button>
        <button
          onClick={() => inputConstant("e")}
          className={scientificButtonClass}
        >
          e
        </button>
      </div>

      {/* Scientific Functions Row 3 */}
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        <button
          onClick={() => performOperation("pow")}
          className={scientificButtonClass}
        >
          x^y
        </button>
        <button
          onClick={() => performScientificFunction("fact")}
          className={scientificButtonClass}
        >
          n!
        </button>
        <button
          onClick={() =>
            setState((prev) => ({ ...prev, display: prev.display + "(" }))
          }
          className={scientificButtonClass}
        >
          (
        </button>
        <button
          onClick={() =>
            setState((prev) => ({ ...prev, display: prev.display + ")" }))
          }
          className={scientificButtonClass}
        >
          )
        </button>
      </div>

      {/* Main Calculator */}
      <div className="grid grid-cols-4 gap-1.5">
        {/* Row 1 */}
        <button onClick={clear} className={operationButtonClass}>
          C
        </button>
        <button onClick={clearEntry} className={operationButtonClass}>
          CE
        </button>
        <button
          onClick={() =>
            setState((prev) => ({
              ...prev,
              display: prev.display.slice(0, -1) || "0",
            }))
          }
          className={operationButtonClass}
        >
          ⌫
        </button>
        <button
          onClick={() => performOperation("/")}
          className={operationButtonClass}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button onClick={() => inputDigit(7)} className={buttonClass}>
          7
        </button>
        <button onClick={() => inputDigit(8)} className={buttonClass}>
          8
        </button>
        <button onClick={() => inputDigit(9)} className={buttonClass}>
          9
        </button>
        <button
          onClick={() => performOperation("*")}
          className={operationButtonClass}
        >
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => inputDigit(4)} className={buttonClass}>
          4
        </button>
        <button onClick={() => inputDigit(5)} className={buttonClass}>
          5
        </button>
        <button onClick={() => inputDigit(6)} className={buttonClass}>
          6
        </button>
        <button
          onClick={() => performOperation("-")}
          className={operationButtonClass}
        >
          -
        </button>

        {/* Row 4 */}
        <button onClick={() => inputDigit(1)} className={buttonClass}>
          1
        </button>
        <button onClick={() => inputDigit(2)} className={buttonClass}>
          2
        </button>
        <button onClick={() => inputDigit(3)} className={buttonClass}>
          3
        </button>
        <button
          onClick={() => performOperation("+")}
          className={operationButtonClass}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() =>
            setState((prev) => ({
              ...prev,
              display: prev.display.startsWith("-")
                ? prev.display.slice(1)
                : "-" + prev.display,
            }))
          }
          className={buttonClass}
        >
          ±
        </button>
        <button onClick={() => inputDigit(0)} className={buttonClass}>
          0
        </button>
        <button onClick={inputDecimal} className={buttonClass}>
          .
        </button>
        <button
          onClick={() => performOperation("+")}
          className={operationButtonClass}
        >
          =
        </button>
      </div>
    </div>
  );
}
