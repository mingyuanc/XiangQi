import { useState } from "react";
import Board from "./Board.jsx"
import starting from "./starting.js"
import "./ChineseChess.css"

// TODO: find avail move and set isMoveable


function ChineseChess() {
    const [history, setHistory] = useState([starting])
    const [redTurn, setRedTurn] = useState(true)
    const currState = history[history.length - 1]
    const nextTurn = (state) => {
        setHistory(hist => [...hist, state])
        setRedTurn(x => !x)
    }


    return (
        <main className="game-area">
            <h1 className="game-turn">{`Turn Number: ${history.length}, `}{redTurn ? "Red" : "Black"}'s turn</h1>
            <div className="game-container">
                <Board state={currState} redTurn={redTurn} toggleTurn={nextTurn} />
            </div>
        </main>
    )
}

export default ChineseChess