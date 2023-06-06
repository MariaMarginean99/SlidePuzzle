import React, { useEffect, useState } from "react";

const randomPuzzles = {
  0: [
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8],
  ],
  1: [
    [1, 3, 2],
    [4, 0, 7],
    [6, 5, 8],
  ],
  2: [
    [1, 2, 0],
    [4, 6, 3],
    [7, 5, 8],
  ],
};
function Puzzle({
  emoji,
  isPaused,
  message,
  handleChangeIsPaused,
  handleChangeMessage,
}) {
  const [moves, setMoves] = useState(0);
  const [puzzle, setPuzzle] = useState([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    resetPuzzle();
  }, []);

  useEffect(() => {
    for (let row = 0; row < puzzle.length; row++) {
      const column = puzzle[row].indexOf(0);
      if (column >= 0) {
        movePiece(row, column, emoji);
      }
    }
  }, [emoji]);

  /**
   *
   * @param {*} rowIndex
   * @param {*} columnIndex
   * @param {*} moveName
   * @returns
   */
  function movePiece(rowIndex, columnIndex, moveName) {
    const newPuzzle = puzzle.slice();
    if (complete) {
      if (moveName === "victory") {
        handleChangeIsPaused(false);
        resetPuzzle();
      }
    } else {
      switch (moveName) {
        case "point_up":
          if (!isPaused) {
            if (rowIndex > 0) {
              console.log("-------------up------------------");
              newPuzzle[rowIndex][columnIndex] =
                newPuzzle[rowIndex - 1][columnIndex];
              newPuzzle[rowIndex - 1][columnIndex] = 0;
              setMoves(moves + 1);
            }
          } else {
            const newMessage = message.slice();
            newMessage.push("You can't do that!");
            handleChangeMessage(newMessage);
          }
          break;
        case "point_down":
          if (!isPaused) {
            if (rowIndex < puzzle.length - 1) {
              console.log("-------------down------------------");
              newPuzzle[rowIndex][columnIndex] =
                newPuzzle[rowIndex + 1][columnIndex];
              newPuzzle[rowIndex + 1][columnIndex] = 0;
              setMoves(moves + 1);
            }
          } else {
            const newMessage = message.slice();
            newMessage.push("You can't do that!");
            handleChangeMessage(newMessage);
          }
          break;
        case "point_right":
          if (!isPaused) {
            if (columnIndex > 0) {
              console.log("-------------right------------------");
              newPuzzle[rowIndex][columnIndex] =
                newPuzzle[rowIndex][columnIndex - 1];
              newPuzzle[rowIndex][columnIndex - 1] = 0;
              setMoves(moves + 1);
            }
          } else {
            const newMessage = message.slice();
            newMessage.push("You can't do that!");
            handleChangeMessage(newMessage);
          }
          break;
        case "point_left":
          if (!isPaused) {
            if (columnIndex < newPuzzle.length - 1) {
              console.log("-------------left------------------");
              newPuzzle[rowIndex][columnIndex] =
                newPuzzle[rowIndex][columnIndex + 1];
              newPuzzle[rowIndex][columnIndex + 1] = 0;
              setMoves(moves + 1);
            }
          } else {
            const newMessage = message.slice();
            newMessage.push("You can't do that!");
            handleChangeMessage(newMessage);
          }
          break;
        case "raised_hand":
          handleChangeIsPaused(true);
          handleChangeMessage(["PAUSE!", "👌 - Resume the game", "✌️ - Reset"]);
          break;
        case "victory":
          handleChangeIsPaused(false);
          resetPuzzle();
          break;
        case "ok":
          handleChangeIsPaused(false);
          break;
        default:
          return "";
      }
      setPuzzle(newPuzzle);
      checkCompletion(newPuzzle);
    }
  }

  /**
   *
   * @param {*} arr
   * @returns
   */
  const flattenArray = (arr) => {
    const newPuzzle = arr.reduce(
      (flatArr, subArr) => flatArr.concat(subArr),
      []
    );
    return newPuzzle.join("");
  };

  /**
   *
   * @param {*} puzzle
   */
  const checkCompletion = (puzzle) => {
    if (flattenArray(puzzle) === "123456780") {
      setComplete(true);
      handleChangeIsPaused(true);
      handleChangeMessage(["You win!", "✌️ - Try again"]);
    }
  };

  /**
   *
   */
  function resetPuzzle() {
    const random = Math.floor(Math.random() * 3);
    setPuzzle(randomPuzzles[random]);
    setMoves(0);
    setComplete(false);
  }

  return (
    <div style={{ position: "absolute", top: 50, left: "30%" }}>
      <h1 style={{ textAlign: "center" }}>Moves: {moves}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "darkgray",
            border: `5px solid ${complete ? "black" : "gray"}`,
            borderRadius: 50,
            padding: 5,
          }}
        >
          {puzzle.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
              }}
            >
              {row.map((col, j) => {
                const color = col === 0 ? "transparent" : "lightgray";
                return (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 170,
                      height: 170,
                      margin: 3,
                      backgroundColor: color,
                      borderRadius: 50,
                      cursor: complete ? "not-allowed" : "pointer",
                      userSelect: "none",
                    }}
                  >
                    <h1 style={{ fontWeight: "bold", fontSize: "70px",  color: "white" }}>
                      {col !== 0 && col}
                    </h1>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Puzzle;
