import { useState, useEffect } from "react";
import Board from "./Board.js";
import starting from "./starting.js";
import "./ChineseChess.css";
import { State, Team, Piece, NPiece } from "./types.js";

function updateDiemsions() {
  let mult = 0.7;
  if (window.innerWidth < 640) {
    mult = 0.9;
  } else if (window.innerWidth < 1007) {
    mult = 0.8;
  }

  let width = window.innerWidth * mult - ((window.innerWidth * mult) % 9);
  width = Math.max(Math.min(width, 900), 380);
  return {
    width: width,
    height: (width / 9) * 10,
  };
}

function startingPieces(isRed: boolean): Piece[] {
  // casting is safe as i checked for nullity
  return starting.flatMap((row) =>
    row.filter((piece) => piece?.team === (isRed ? Team.red : Team.black))
  ) as Piece[];
}

function ChineseChess() {
  const [history, setHistory] = useState([starting]);
  const [redTurn, setRedTurn] = useState(true);
  const [redPieces, setRedPieces] = useState(startingPieces(true));
  const [blackPieces, setBlackPieces] = useState(startingPieces(false));
  // to size the board correctly
  const [dimensions, setDimensions] = useState(updateDiemsions());
  const currState = history[history.length - 1];
  const nextTurn = (state: State, piece: NPiece) => {
    if (piece != null) {
      piece.team === Team.red
        ? setRedPieces((arr) => arr.filter((p) => p.id != piece.id))
        : setBlackPieces((arr) => arr.filter((p) => p.id != piece.id));
    }
    setHistory((hist) => [...hist, state]);
    setRedTurn((x) => !x);
  };

  // for responsive design
  useEffect(() => {
    function handleResize() {
      setDimensions(updateDiemsions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const size = dimensions.height / 20;
  const reactive = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    margin: "10px 0px",
    backgroundSize: `${dimensions.width - 2 * size}px ${
      dimensions.height - 2 * size
    }px`,
    backgroundPosition: `${size}px ${size}px`,
  };

  return (
    <main className="game-area">
      <h1 className="game-turn">
        {`Turn Number: ${history.length}, `}
        {redTurn ? "Red" : "Black"}'s turn
      </h1>
      <div className="game-container" style={reactive}>
        <Board
          state={currState}
          redTurn={redTurn}
          redPieces={redPieces}
          blackPieces={blackPieces}
          toggleTurn={nextTurn}
        />
      </div>
    </main>
  );
}

export default ChineseChess;
