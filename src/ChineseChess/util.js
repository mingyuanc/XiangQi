const moveables = () =>
  Array(10)
    .fill(null)
    .map((x) => Array(9).fill(false));

const arrayRange = (start, end) =>
  [...Array(end - start + 1).keys()].map((i) => i + start);

const isValid = (state, team, row, col) => {
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

function findMoveChariot(state, piece, moves) {
  const r = [],
    c = [];
  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[0].length; col++) {
      if (state[row][col] === null) {
        continue;
      }
      if (row == piece.row) {
        r.push(state[row][col]);
      }
      if (col == piece.col) {
        c.push(state[row][col]);
      }
    }
  }
  function helper(isRow, arr, idx) {
    if (idx == -1) {
      return;
    }
    const axis = isRow ? piece.row : piece.col;
    const bounds = [idx - 1, idx + 1].map((x) => {
      if (x == -1 || x == arr.length) {
        return x == -1 ? 0 : isRow ? 10 : 9;
      } else {
        if (piece.team == arr[x].team) {
          const add = x < idx ? 1 : -1;
          return isRow ? arr[x].col + add : arr[x].row + add;
        }
        return isRow ? arr[x].col : arr[x].row;
      }
    });
    console.log(bounds[1], bounds[0]);
    if (bounds[0] == bounds[1]) {
      return;
    }
    arrayRange(bounds[0], bounds[1]).map((b) => {
      if (isRow) {
        moves[axis][b] = true;
      } else {
        moves[b][axis] = true;
      }
    });
  }
  console.log("r", r);

  helper(true, r, r.indexOf(piece));
  console.log("moves", moves);
  console.log("c", c);
  helper(false, c, c.indexOf(piece));
  console.log("moves", moves);
  return moves;
}

function findMoveHorse(state, piece, moves) {
  function helper(isRow) {
    const max = isRow ? 8 : 9;
    const axis = isRow ? piece.row : piece.col;
    const initial = isRow ? piece.col : piece.row;
    const tmp = [initial - 1, initial + 1].map((val) => {
      if (val < 0 || val > max) {
        return;
      }
      if (isRow ? state[axis][val] : state[val][axis]) {
        return;
      }
      const v = val < initial ? val - 1 : val + 1;
      const tmp = [axis - 1, axis + 1].map((ax) => {
        if (ax < 0 || ax > (isRow ? 10 : 9)) {
          return;
        }
        if (isRow) {
          moves[ax][v] = piece.team == state[ax][v]?.team ? false : true;
        } else {
          moves[v][ax] = piece.team == state[v][ax]?.team ? false : true;
        }
        return;
      });
      return;
    });
  }
  helper(true);
  helper(false);
  return moves;
}

function findMoveElephant(state, piece, moves) {
  const row = piece.row,
    col = piece.col;

  const posMove = [
    [row - 2, col - 2],
    [row - 2, col + 2],
    [row + 2, col - 2],
    [row + 2, col + 2],
  ];
  posMove
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
    .map((move) => (moves[move[0]][move[1]] = true));
  return moves;
}

function findMoveAdvisor(state, piece, moves) {
  const row = piece.row,
    col = piece.col;

  const posMove =
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
  posMove
    // check if moveable
    .filter(
      (move) => Math.abs(move[0] - row) == 1 || Math.abs(move[0]) - col == 1
    )
    // check if move is on board and has no friendly troop
    .filter((move) => isValid(state, piece.team, move[0], move[1]))
    .map((move) => (moves[move[0]][move[1]] = true));
  return moves;
}

function findMove(state, piece) {
  const moves = moveables();

  switch (piece.type) {
    case "Chariot":
      return findMoveChariot(state, piece, moves);
    case "Horse":
      return findMoveHorse(state, piece, moves);
    case "Elephant":
      return findMoveElephant(state, piece, moves);
    case "Advisor":
      return findMoveAdvisor(state, piece, moves);
    // case "Cannon":
    //   return findMoveCannon(state, piece, moves);
    // case "Soldier":
    //   return findMoveSoldier(state, piece, moves);
    // case "General":
    //   return findMoveGeneral(state, piece, moves);
    default:
      console.log("todo");
      return Array(10)
        .fill(null)
        .map((x) => Array(9).fill(true));
  }
}

export default findMove;
