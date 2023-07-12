import React from "react";

function Box({ box, redTurn, isMoveable, isMoving, movePiece }) {

    let name = ""
    let element
    if (box.hasPiece) {
        name = `piece ${box.team}`

        if (!isMoving) {
            if (box.team == "red") {
                element = redTurn
                    ? <div className={name += " active"} onClick={movePiece}>{box.piece}</div>
                    : <div className={name} >{box.piece}</div>
            } else {
                element = !redTurn
                    ? <div className={name += " active"} onClick={movePiece}>{box.piece}</div>
                    : <div className={name} >{box.piece}</div>
            }
            return (<div className="box">{element}</div>)
        }

        if (isMoveable) {
            name += " active"
            element = <div className={name} onClick={movePiece}>{box.piece}</div>
        } else {
            element = <div className={name} >{box.piece}</div>
        }
        return (<div className="box">{element}</div>)
    }

    if (isMoveable) {
        return (<div className="box">
            <div className="moveable" onClick={movePiece}></div>
        </div>)
    }
    return (<div className="box">
    </div>)

}

export default Box
