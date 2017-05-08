import { ITile, TilesFactory } from './tile';
import * as Utils from '../utils/utils';
import { IGameRender } from '../render/render';
export type Move = 'up' | 'down' | 'left' | 'right';

const BOARD_SIZE = 16;
const NUMBER_TILES = 2;
const WIN_SCORE = 2048;

const RANDOM_FACTOR = 0.8;

export interface ICoupleTiles {
  from: ITile;
  to: ITile;
}
export interface IBoard {

  init(boardSize: number, numberTiles: number): void;

  handleMove(move: Move | string): void;

  checkBoard(): void;

  printBoardState(): string;

  printBoard(): void;
}

export class Board implements IBoard {

  private width: number = 0;
  private boardGame: ITile[][];
  private activeGame: boolean;

  constructor(private render: IGameRender) {
  }

  public init(boardSize: number = BOARD_SIZE,
              numberTiles: number = NUMBER_TILES): void {

    this.width = this.calculateWidth(boardSize);
    this.boardGame = this.createBoard(this.width);
    this.resetEmptyBoard();
    this.randomSelectStartState(numberTiles);
    this.activeGame = true;
  }

  public handleMove(move: Move): void {
    if (!this.activeGame) {
      return;
    }
    switch (move) {
      case ('right') : {
        console.log('handle right move');
        this.moveRight();
        break;
      }
      case ('left') : {
        console.log('handle left move');
        this.moveLeft();
        break;
      }
      case ('down') : {
        console.log('handle down move');
        this.moveDown();
        break;
      }
      case ('up') : {
        console.log('handle up move');
        this.moveUp();
        break;
      }
      default: {
        console.log('empty move');
      }
    }
    this.printBoard();
    if (this.checkBoard()) {
      this.activeGame = false;
      alert('Game over');
    } else {
      this.createNewRandomTile();
    }
  }


  public checkBoard(): void {
    let isWin = false;
    this.boardGame.some((array: ITile[]) => {
      let tileWon: ITile = array.find((tile: ITile) => {


        return tile.getValue() > WIN_SCORE;
      });
      isWin = !!tileWon;
      return isWin;
    });
  }

  public printBoard(render?: IGameRender) {
    if (this.render) {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.width; j++) {
          this.render.setTile(i, j, this.width, this.boardGame[i][j].getValue());
        }
      }
      return;
    }
    console.log('******   start Board    ******');
    for (let i = 0; i < this.width; i++) {
      let row = this.rowToString(i);
      console.log([row]);
    }
    console.log('******   end Board    ******');
  }


  public printBoardState(): string {
    let boardString = '[';
    for (let i = 0; i < this.width; i++) {
      let row = this.rowToString(i);
      boardString += row;
    }
    boardString += ']';
    console.log(boardString);
    return boardString;
  }

  private randomSelectStartState(numberTiles: number = NUMBER_TILES) {
    let tiles: number = numberTiles;
    while (tiles--) {
      // todo : switch random range to util lib
      const idx: number = Utils.getRandomRange(0, this.width);
      const idy: number = Utils.getRandomRange(0, this.width);
      this.boardGame[idx][idy] = TilesFactory.getTile('random');
      this.render.setTile(idx, idy, this.width, true);
    }
  }

  private resetEmptyBoard() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.width; j++) {
        this.boardGame[i][j] = TilesFactory.getTile('empty');
      }
    }
  }

  private createBoard(rows) {
    return this.create2DArray(rows);
  }

  private create2DArray(rows) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array<ITile>(rows);
    }
    return arr;
  }

  private moveUp() {
    const runUpTo = this.width;
    for (let j = 0; j < runUpTo; j++) {
      let isChange: boolean = true;
      while (isChange) {
        const before = this.columnToString(j);
        for (let i = runUpTo - 1; i > 0; i--) {
          const res: ICoupleTiles = this.tilesBump(
            this.boardGame[i][j],
            this.boardGame[i - 1][j]
          );
          this.boardGame[i][j] = res.from;
          this.boardGame[i - 1][j] = res.to;
        }
        const after = this.columnToString(j);
        isChange = this.compareRow(before, after);
      }

    }
  }

  private moveDown() {
    const runUpTo = this.width;
    for (let j = 0; j < runUpTo; j++) {
      let isChange: boolean = true;
      while (isChange) {
        const before = this.columnToString(j);
        for (let i = 1; i < runUpTo; i++) {
          const res: ICoupleTiles = this.tilesBump(
            this.boardGame[i - 1][j],
            this.boardGame[i][j]
          );
          this.boardGame[i - 1][j] = res.from;
          this.boardGame[i][j] = res.to;
        }
        const after = this.columnToString(j);
        isChange = this.compareRow(before, after);
      }

    }
  }

  private moveLeft() {
    const runUpTo = this.width;
    for (let i = 0; i < this.width; i++) {

      let isChange: boolean = true;
      let maxIterations = this.width + 1;
      while (isChange && (maxIterations ) > 0) {
        const before = this.rowToString(i)
        for (let j = runUpTo - 1; j > 0; j--) {

          const res: ICoupleTiles = this.tilesBump(
            this.boardGame[i][j],
            this.boardGame[i][j - 1]
          );
          this.boardGame[i][j] = res.from;
          this.boardGame[i][j - 1] = res.to;

        }
        const after = this.rowToString(i);
        isChange = this.compareRow(before, after);
        --maxIterations;
      }
    }
  }

  private moveRight() {
    const runUpTo = this.width;
    for (let i = 0; i < this.width; i++) {

      let isChange: boolean = true;

      while (isChange) {
        const before = this.rowToString(i)
        for (let j = 1; j < runUpTo; j++) {

          const res: ICoupleTiles = this.tilesBump(
            this.boardGame[i][j - 1],
            this.boardGame[i][j]
          );
          this.boardGame[i][j - 1] = res.from;
          this.boardGame[i][j] = res.to;

        }
        const after = this.rowToString(i);
        isChange = this.compareRow(before, after);
      }
    }

  }

  private createNewRandomTile() {
    let {x, y} = this.findRandomEmptyTile();
    let tile = this.randomCreateTile();
    this.boardGame[x][y] = tile;
    this.render.setTile(x, y, this.width, this.boardGame[x][y].getValue(), true);
  }

  private findRandomEmptyTile() {
    let numberOfTries = this.width * this.width;
    const triedNumbers: Map<{ x, y }, boolean> = new Map<{ x, y }, boolean>();
    let x = Utils.getRandomRange(0, this.width);
    let y = Utils.getRandomRange(0, this.width);
    while (this.boardGame[x][y].getValue() > 0 && triedNumbers.size < numberOfTries) {
      triedNumbers.set({x, y}, true);
      x = Utils.getRandomRange(0, this.width);
      y = Utils.getRandomRange(0, this.width);
    }
    console.log('random set at ');
    console.log({x, y});
    return {x, y};
  }

  private randomCreateTile() {
    let tile: ITile = TilesFactory.getTile('random');
    if (this.shouldIncrease()) {
      tile.increase();
    }
    return tile;
  }

  private shouldIncrease() {

    return Utils.getRadnom() > RANDOM_FACTOR;
  }

  private tilesBump(f: ITile, t: ITile): ICoupleTiles {

    if (this.areSameTile(f, t) && this.isActualTIle(f) && this.isActualTIle(t)) {

      t.increase();
      f = TilesFactory.getTile('empty');
      return {
        from: f,
        to: t
      };

    }
    if (this.isActualTIle(f) && !this.isActualTIle(t)) {

      t = TilesFactory.getTile('empty');
      return this.swapTiles(f, t);
    }
    return {
      from: f,
      to: t
    };
  }

  private isActualTIle(from: ITile) {
    return from.getValue() > 0;
  }

  private areSameTile(from: ITile, to: ITile) {
    return from.getValue() === to.getValue();
  }

  private swapTiles(from: ITile, to: ITile): ICoupleTiles {
    let tempTile = from.clone();
    return {
      from: to,
      to: tempTile
    };
  }


  private calculateWidth(boardSize: number) {
    return Math.sqrt(boardSize);
  }

  private rowToString(i: number) {
    let row: string = '';
    for (let j_dix = 0; j_dix < this.width; j_dix++) {
      let value: string = this.boardGame[i][j_dix].printTile();
      row += value;
    }
    return row;
  }

  private columnToString(j: number) {
    let column: string = '';
    for (let i = 0; i < this.width; i++) {
      let value: string = this.boardGame[i][j].printTile();
      column += value;
    }
    return column;
  }

  private compareRow(before: string, after: string) {

    return before === after ? false : true;
  }

}
