import { useState } from "react";
import Box from "./Box.jsx"

function Board({ state, redTurn, toggleTurn }) {
    // TODO: make sure piece move is correct color
    const [moving, setMoving] = useState(false)
    console.log(state)
    function movePiece(row, col) {
        if (moving) {
            if (row == moving.row && col == moving.col) {
                setMoving(false)
                return
            }
            const newState = state.map(arr => arr.slice())
            newState[row][col] = state[moving.row][moving.col]
            newState[moving.row][moving.col] = null
            toggleTurn(newState)
            setMoving(false)
        } else {
            // TODO: find avail move and set isMoveable
            setMoving({ row: row, col: col })
        }
    }
    const tmp = [...Array(9).keys()]
    return (
        <>
            <div className="game-row">{tmp.map(x => <Box box={state[0][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(0, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[1][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(1, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[2][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(2, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[3][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(3, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[4][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(4, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[5][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(5, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[6][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(6, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[7][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(7, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[8][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(8, x)} />)}</div>
            <div className="game-row">{tmp.map(x => <Box box={state[9][x]} redTurn={redTurn} isMoveable={true} isMoving={moving} movePiece={() => movePiece(9, x)} />)}</div>

        </>
    )
}

export default Board
