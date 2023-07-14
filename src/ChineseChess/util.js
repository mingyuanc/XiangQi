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
        moves[axis][b] = true;
      } else {
        moves[b][axis] = true;
      }
    });
  }

  helper(true, r, r.indexOf(piece));
  helper(false, c, c.indexOf(piece));
  return moves;
}

function findMoveHorse(state, piece, moves) {
  const row = piece.row,
    col = piece.col;
  const posMoves = [
    [row, col - 1],
    [row, col + 1],
    [row + 1, col],
    [row - 1, col],
  ];
  posMoves
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
    .filter((move) => isValid(state, piece.team, move[0], move[1]))
    .map((move) => (moves[move[0]][move[1]] = true));
  return moves;
  // function helper(isRow) {
  //   const max = isRow ? 8 : 9;
  //   const axis = isRow ? piece.row : piece.col;
  //   const initial = isRow ? piece.col : piece.row;
  //   const tmp = [initial - 1, initial + 1].map((val) => {
  //     if (val < 0 || val > max) {
  //       return;
  //     }
  //     if (isRow ? state[axis][val] : state[val][axis]) {
  //       return;
  //     }
  //     const v = val < initial ? val - 1 : val + 1;
  //     const tmp = [axis - 1, axis + 1].map((ax) => {
  //       if (ax < 0 || ax > (isRow ? 8 : 7)) {
  //         return;
  //       }
  //       if (isRow) {
  //         moves[ax][v] = piece.team == state[ax][v]?.team ? false : true;
  //       } else {
  //         moves[v][ax] = piece.team == state[v][ax]?.team ? false : true;
  //       }
  //       return;
  //     });
  //     return;
  //   });
  // }
  // helper(true);
  // helper(false);
  // return moves;
}

function findMoveElephant(state, piece, moves) {
  const row = piece.row,
    col = piece.col;

  const posMoves = [
    [row - 2, col - 2],
    [row - 2, col + 2],
    [row + 2, col - 2],
    [row + 2, col + 2],
  ];
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
    .map((move) => (moves[move[0]][move[1]] = true));
  return moves;
}

function findMoveAdvisor(state, piece, moves) {
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
  posMoves
    // check if moveable
    .filter(
      (move) => Math.abs(move[0] - row) == 1 || Math.abs(move[0]) - col == 1
    )
    // check if move is on board and has no friendly troop
    .filter((move) => isValid(state, piece.team, move[0], move[1]))
    .map((move) => (moves[move[0]][move[1]] = true));
  return moves;
}

function findMoveCannon(state, piece, moves) {
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
    [idx - 2, idx + 2].map((i) => {
      if (i < 0 || i > arr.length - 1) {
        return;
      }
      if (arr[i].team == piece.team) {
        return;
      }
      const target = arr[i];
      moves[target.row][target.col] = true;
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
        moves[axis][b] = true;
      } else {
        moves[b][axis] = true;
      }
    });
  }
  helper(true, r, r.indexOf(piece));
  helper(false, c, c.indexOf(piece));
  return moves;
}

function findMoveSoldier(state, piece, moves) {
  const row = piece.row,
    col = piece.col;
  const posMoves = [piece.team == "red" ? [row + 1, col] : [row - 1, col]];
  if (piece.team == "red" ? row > 4 : row < 5) {
    posMoves.push([row, col + 1], [row, col - 1]);
  }
  posMoves
    .filter((move) => isValid(state, piece.team, move[0], move[1]))
    .map((move) => (moves[move[0]][move[1]] = true));
  return moves;
}

function findMoveGeneral(state, piece, moves) {
  const row = piece.row,
    col = piece.col;
  const posMoves = [
    [row, col - 1],
    [row, col + 1],
    [row + 1, col],
    [row - 1, col],
  ];
  posMoves
    .filter((move) => {
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
    })
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
    case "Cannon":
      return findMoveCannon(state, piece, moves);
    case "Soldier":
      return findMoveSoldier(state, piece, moves);
    case "General":
      return findMoveGeneral(state, piece, moves);
    default:
      return Array(10)
        .fill(null)
        .map((x) => Array(9).fill(true));
  }
}

export default findMove;
