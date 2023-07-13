const moveables = () =>
  Array(10)
    .fill(null)
    .map((x) => Array(9).fill(false));

const arrayRange = (start, end) =>
  [...Array(end - start + 1).keys()].map((i) => i + start);

function findMoveChariot(state, piece) {
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
  const moves = moveables();
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

function findMoveHorse(state, piece) {
  const moves = moveables();
  moves[piece.row][piece.col] = true;
  function helper(isRow) {
    const max = isRow ? 8 : 9;
    const axis = isRow ? piece.row : piece.col;
    const initial = isRow ? piece.col : piece.row;
    const tmp = [initial - 1, initial + 1].map((val) => {
      console.log(val);
      if (val < 0 || val > max) {
        console.log("border");
        return;
      }
      if (isRow ? state[axis][val] : state[val][axis]) {
        console.log("blocked");
        return;
      }
      const v = val < initial ? val - 1 : val + 1;
      const tmp = [axis - 1, axis + 1].map((ax) => {
        console.log("ax", ax);
        if (ax < 0 || ax > (isRow ? 10 : 9)) {
          console.log("axis border");
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

function findMove(state, piece) {
  switch (piece.type) {
    case "Chariot":
      return findMoveChariot(state, piece);
    case "Horse":
      return findMoveHorse(state, piece);
    // case "Elephant":
    //   return findMoveElephant(state, piece);
    // case "Advisor":
    //   return findMoveAdvisor(state, piece);
    // case "Cannon":
    //   return findMoveCannon(state, piece);
    // case "Soldier":
    //   return findMoveSoldier(state, piece);
    // case "General":
    //   return findMoveGeneral(state, piece);
    default:
      console.log("todo");
      return Array(10)
        .fill(null)
        .map((x) => Array(9).fill(true));
  }
}

export default findMove;
