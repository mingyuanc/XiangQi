import { useState } from "react";
import Box from "./Box.js";
import findMoves from "./util";
import { IBoard, Coord } from "./Interfaces";

function Board({ state, redTurn, toggleTurn }: IBoard) {
  // TODO: make sure piece move is correct color
  const negCoord: Coord = { row: -1, col: -1 };
  const [moving, setMoving] = useState({ row: -1, col: -1 });
  const [moveable, setMovable] = useState(Array(10).fill(Array(9).fill(false)));
  function movePiece(row: number, col: number) {
    if (moving.row == -1) {
      const posMoves = findMoves(state, state[row][col]!);
      setMovable(posMoves);
      setMoving({ row: row, col: col });
      return;
    }
    const currPiece = state[row][col];
    // movPiece isnt null, checked in first if statement
    const movPiece = state[moving.row][moving.col];

    // if player wants to turn of moving
    if (row == moving.row && col == moving.col) {
      setMoving(negCoord);
      return;
    }

    // to view move of another tile of same team
    if (currPiece && movPiece!.team == currPiece.team) {
      const posMoves = findMoves(state, state[row][col]!);
      setMovable(posMoves);
      setMoving({ row: row, col: col });
      return;
    }

    const newState = state.map((arr) => arr.slice());
    newState[row][col] = movPiece;
    newState[moving.row][moving.col] = null;
    movPiece!.row = row;
    movPiece!.col = col;
    toggleTurn(newState);
    setMoving(negCoord);
  }
  const tmp = [...Array(9).keys()];
  return (
    <>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`0${x}`}
            box={state[0][x]}
            redTurn={redTurn}
            isMoveable={moveable[0][x]}
            isMoving={moving}
            movePiece={() => movePiece(0, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`1${x}`}
            box={state[1][x]}
            redTurn={redTurn}
            isMoveable={moveable[1][x]}
            isMoving={moving}
            movePiece={() => movePiece(1, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`2${x}`}
            box={state[2][x]}
            redTurn={redTurn}
            isMoveable={moveable[2][x]}
            isMoving={moving}
            movePiece={() => movePiece(2, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`3${x}`}
            box={state[3][x]}
            redTurn={redTurn}
            isMoveable={moveable[3][x]}
            isMoving={moving}
            movePiece={() => movePiece(3, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`4${x}`}
            box={state[4][x]}
            redTurn={redTurn}
            isMoveable={moveable[4][x]}
            isMoving={moving}
            movePiece={() => movePiece(4, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`5${x}`}
            box={state[5][x]}
            redTurn={redTurn}
            isMoveable={moveable[5][x]}
            isMoving={moving}
            movePiece={() => movePiece(5, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`6${x}`}
            box={state[6][x]}
            redTurn={redTurn}
            isMoveable={moveable[6][x]}
            isMoving={moving}
            movePiece={() => movePiece(6, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`7${x}`}
            box={state[7][x]}
            redTurn={redTurn}
            isMoveable={moveable[7][x]}
            isMoving={moving}
            movePiece={() => movePiece(7, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`8${x}`}
            box={state[8][x]}
            redTurn={redTurn}
            isMoveable={moveable[8][x]}
            isMoving={moving}
            movePiece={() => movePiece(8, x)}
          />
        ))}
      </div>
      <div className="game-row">
        {tmp.map((x) => (
          <Box
            key={`9${x}`}
            box={state[9][x]}
            redTurn={redTurn}
            isMoveable={moveable[9][x]}
            isMoving={moving}
            movePiece={() => movePiece(9, x)}
          />
        ))}
      </div>
    </>
  );
}

export default Board;
