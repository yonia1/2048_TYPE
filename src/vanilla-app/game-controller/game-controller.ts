import { KeyListener } from '../key-listener';
import { Board, IBoard } from '../board-game/board';
import { HtmlGameRender, IGameRender } from '../render/render';
import { HtmlAnimationFactory } from '../render/animations/animationFactory';

const keyMap: Object = {
  38: 'up', // Up
  39: 'right', // Right
  40: 'down', // Down
  37: 'left', // Left
  56: 'up', // Vim up
  76: 'right', // Vim right
  50: 'down', // Vim down
  52: 'left', // Vim left
  54: 'right', // D
  83: 'down', // S
  65: ' left'  // Aor change to enum or typescript type
}

export interface IGameController {

  init(): void;

  run(): void;

  clean(): void;

  paint(): void;

}

export class GameController implements IGameController {

  private keyListener: KeyListener; // todo switch to DI
  private board: IBoard;
  private render: IGameRender;

  constructor() {
    this.render = new HtmlGameRender(new HtmlAnimationFactory());
    this.keyListener = new KeyListener();
    this.board = new Board(this.render);

  }

  public init(): void {

    this.regiesterToKeys();
    this.board.init(16, 2);
    this.board.printBoard();
  }

  public run(): void {
    return;
  }

  public clean(): void {
    return;
  }

  public paint(): void {
    this.board.printBoard();
  }

  private regiesterToKeys(): void {
    // For each key register event
    Object.keys(keyMap).forEach((key: string) => {
      this.keyListener.addKeyListener(Number.parseInt(key), () => {
        this.board.handleMove(keyMap[key]);
        this.paint();
      }, this.board, null);
    });
    // this.keyListener.addKeyListener()
  }
}
