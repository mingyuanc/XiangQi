type Unit =
  | "Soldier"
  | "Cannon"
  | "Chariot"
  | "Horse"
  | "Elephant"
  | "Advisor"
  | "General";
export type NPiece = Piece | null;
export type State = NPiece[][];

export enum Team {
  black = "black",
  red = "red",
}

export interface Piece {
  type: Unit;
  img: String;
  team: Team;
  row: number;
  col: number;
}

export interface Coord {
  row: number;
  col: number;
}

export interface IBox {
  box: NPiece;
  redTurn: boolean;
  isMoveable: boolean;
  isMoving: Coord;
  movePiece: () => void;
}

export interface IBoard {
  state: State;
  redTurn: boolean;
  toggleTurn: (state: State) => void;
}