import { Piece, State, Team } from "./types";

const arrayRange = (start: number, end: number) =>
  [...Array(end - start + 1).keys()].map((i) => i + start);

const isValid = (state: State, team: Team, row: number, col: number) => {
  if (row < 0 || row > 9) {
    return false;
  }
  if (col < 0 || col > 8) {
    return false;
  }
  if (state[row][col]?.team == team) {
    return false;
  }
  return true;
};

function findMoveChariot(state: State, piece: Piece): Array<Array<Number>> {
  const r: Piece[] = [],
    c: Piece[] = [];
  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[0].length; col++) {
      if (state[row][col] === null) {
        continue;
      }
      // ! is used as i have checked is not null above
      if (row == piece.row) {
        r.push(state[row][col]!);
      }
      if (col == piece.col) {
        c.push(state[row][col]!);
      }
    }
  }
  const moves: Array<Array<Number>> = [];
  function helper(isRow: boolean, arr: Piece[], idx: number) {
    const axis = isRow ? piece.row : piece.col;
    const [start, end] = [idx - 1, idx + 1].map((x) => {
      if (x == -1 || x == arr.length) {
        // if no piece between piece and border
        return x == -1 ? 0 : isRow ? 10 : 9;
      } else {
        if (piece.team == arr[x].team) {
          const add = x < idx ? 1 : -1;
          return isRow ? arr[x].col + add : arr[x].row + add;
        }
        return isRow ? arr[x].col : arr[x].row;
      }
    });
    if (start == end) {
      return;
    }
    arrayRange(start, end).map((b) => {
      if (isRow) {
        moves.push([axis, b]);
      } else {
        moves.push([b, axis]);
      }
    });
  }

  helper(true, r, r.indexOf(piece));
  helper(false, c, c.indexOf(piece));
  return moves;
}

function findMoveHorse(state: State, piece: Piece): Array<Array<Number>> {
  const row = piece.row,
    col = piece.col;
  const posMoves = [
    [row, col - 1],
    [row, col + 1],
    [row + 1, col],
    [row - 1, col],
  ];
  return posMoves
    .filter((move) => {
      if (move[0] < 0 || move[0] > 9) {
        return false;
      }
      if (move[1] < 0 || move[1] > 8) {
        return false;
      }
      // if blocked
      if (state[move[0]][move[1]]) {
        return false;
      }
      return true;
    })
    .flatMap((move) => {
      // first step taken is left or right
      if (move[0] == row) {
        const add = move[1] < col ? -1 : 1;
        return [
          [row - 1, move[1] + add],
          [row + 1, move[1] + add],
        ];
      }
      const add = move[0] < row ? -1 : 1;
      return [
        [move[0] + add, col - 1],
        [move[0] + add, col + 1],
      ];
    })
    .filter((move) => isValid(state, piece.team, move[0], move[1]));
}

function findMoveElephant(state: State, piece: Piece): Array<Array<Number>> {
  const row = piece.row,
    col = piece.col;

  const posMoves = [
    [row - 2, col - 2],
    [row - 2, col + 2],
    [row + 2, col - 2],
    [row + 2, col + 2],
  ];
  return (
    posMoves
      // check if accross river
      .filter((move) => (piece.team == "red" ? move[0] < 5 : move[0] > 4))
      // check if move is on board and has no friendly troop
      .filter((move) => isValid(state, piece.team, move[0], move[1]))
      // check if its blocked
      .filter(
        (move) =>
          state[Math.abs((move[0] + row) / 2)][Math.abs((move[1] + col) / 2)] ==
          null
      )
  );
}

function findMoveAdvisor(state: State, piece: Piece): Array<Array<Number>> {
  const row = piece.row,
    col = piece.col;

  const posMoves =
    piece.team == "red"
      ? [
          [0, 3],
          [0, 5],
          [1, 4],
          [2, 3],
          [2, 5],
        ]
      : [
          [9, 3],
          [9, 5],
          [8, 4],
          [7, 3],
          [7, 5],
        ];
  return (
    posMoves
      // check if moveable
      .filter(
        (move) => Math.abs(move[0] - row) == 1 || Math.abs(move[1] - col) == 1
      )
      // check if move is on board and has no friendly troop
      .filter((move) => isValid(state, piece.team, move[0], move[1]))
  );
}

function findMoveCannon(state: State, piece: Piece): Array<Array<Number>> {
  const r: Piece[] = [],
    c: Piece[] = [];
  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[0].length; col++) {
      if (state[row][col] === null) {
        continue;
      }
      // ! is used becaused i have checked earlier
      if (row == piece.row) {
        r.push(state[row][col]!);
      }
      if (col == piece.col) {
        c.push(state[row][col]!);
      }
    }
  }
  const moves: Array<Array<Number>> = [];
  function helper(isRow: boolean, arr: Piece[], idx: number) {
    [idx - 2, idx + 2].map((i) => {
      if (i < 0 || i > arr.length - 1) {
        return;
      }
      if (arr[i].team == piece.team) {
        return;
      }
      const target = arr[i];
      moves.push([target.row, target.col]);
    });
    const [start, end] = [idx - 1, idx + 1].map((i) => {
      if (i < 0 || i > arr.length - 1) {
        // if no piece between piece and border
        return i < idx ? 0 : isRow ? 10 : 9;
      } else {
        const add = i < idx ? 1 : -1;
        return isRow ? arr[i].col + add : arr[i].row + add;
      }
    });
    if (start == end) {
      return;
    }
    const axis = isRow ? piece.row : piece.col;
    arrayRange(start, end).map((b) => {
      if (isRow) {
        moves.push([axis, b]);
      } else {
        moves.push([b, axis]);
      }
    });
  }
  helper(true, r, r.indexOf(piece));
  helper(false, c, c.indexOf(piece));
  return moves;
}

function findMoveSoldier(state: State, piece: Piece): Array<Array<Number>> {
  const row = piece.row,
    col = piece.col;
  const posMoves = [piece.team == "red" ? [row + 1, col] : [row - 1, col]];
  if (piece.team == "red" ? row > 4 : row < 5) {
    posMoves.push([row, col + 1], [row, col - 1]);
  }
  return posMoves.filter((move) =>
    isValid(state, piece.team, move[0], move[1])
  );
}

function findMoveGeneral(state: State, piece: Piece): Array<Array<Number>> {
  // TODO
  const row = piece.row,
    col = piece.col;
  const posMoves = [
    [row, col - 1],
    [row, col + 1],
    [row + 1, col],
    [row - 1, col],
  ];
  return posMoves.filter((move) => {
    if (move[1] < 3 || move[1] > 5) {
      return false;
    }
    const [lower, upper] = piece.team == "red" ? [0, 2] : [7, 9];
    if (move[0] < lower || move[0] > upper) {
      return false;
    }
    if (state[move[0]][move[1]]?.team == piece.team) {
      return false;
    }
    return true;
  });
}

function findMove(state: State, piece: Piece) {
  switch (piece.type) {
    case "Chariot":
      return findMoveChariot(state, piece);
    case "Horse":
      return findMoveHorse(state, piece);
    case "Elephant":
      return findMoveElephant(state, piece);
    case "Advisor":
      return findMoveAdvisor(state, piece);
    case "Cannon":
      return findMoveCannon(state, piece);
    case "Soldier":
      return findMoveSoldier(state, piece);
    case "General":
      return findMoveGeneral(state, piece);
    default:
      return Array(10)
        .fill(null)
        .map((x) => Array(9).fill(true));
  }
}

export default findMove;
