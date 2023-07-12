import { useState } from "react";
import Box from "./Box.jsx"

function Board({ state, redTurn, toggleTurn }) {
    // TODO: make sure piece move is correct color
    const [moving, setMoving] = useState(false)
    console.log(moving)
    function movePiece(piece) {
        if (moving) {
            toggleTurn(state.map(x => {
                if (x.id == moving.id) {
                    return { ...x, piece: "", hasPiece: false, team: "" }
                }
                if (x.id == piece.id) {
                    return { ...moving, id: x.id }
                }
                return x

            }))
            setMoving(false)
        } else {
            // TODO: find avail move and set isMoveable
            setMoving(piece)
        }
    }

    return (
        <>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>
            <div className="game-row">{Array(9).fill(<Box box={null} redTurn={false} isMoveable={true} isMoving={true} movePiece={null} />)}</div>

        </>
    )
}

export default Board



// {state.map(piece => <Box key={piece.id} box={piece} redTurn={redTurn} isMoveable={moving} isMoving={moving} movePiece={() => movePiece(piece)} />)}