import * as Utils from '../utils/utils';
import { Board, IBoard } from './board';
import { IGameRender } from '../render/render';
class MockGameRender implements IGameRender{

  public setTile(i: number, j: number, width: number, txt: any, shouldAnimate?: boolean): void {
    return;
  }
}


describe('check board game management', () => {

  const board: IBoard = new Board(new MockGameRender());

  let reset = () => {
    board.init(16, 2);
    Utils.setTestMode();

  };
  beforeEach(() => {
    Utils.setTestMode();
    Utils.resetSeed();
    reset();
  });
  /*afterAll(() => {
   Utils.setProdMode();
   });*/

  it('should return different board each time', () => {
    const boardBefore: string = board.printBoardState();
    reset();
    const boardAfter: string = board.printBoardState();
    expect(boardBefore).not.toEqual(boardAfter);
  });

  it('should handle a simple move to the right', () => {
    board.handleMove('right');
    const boardAfter: string = board.printBoardState();
    expect(boardAfter).toEqual('[_____2_4________]');
  });
  it('should handle another simple move to the right', () => {
    board.handleMove('right');
    board.handleMove('right');
    const boardAfter: string = board.printBoardState();
    expect(boardAfter).toEqual('[___2__24________]');
  });
  it('should handle 3 simple move to the right', () => {
    board.handleMove('right');
    board.handleMove('right');
    board.handleMove('right');
    const boardAfter: string = board.printBoardState();
    expect(boardAfter).toEqual('[___2__24___2____]');
  });
  it('should handle 1 simple move to the down', () => {
    board.handleMove('down');

    const boardAfter: string = board.printBoardState();
    expect(boardAfter).toEqual('[_____2______2_2_]');
  });
  it('should handle 1 simple move to the down and then right and down again', () => {
    board.handleMove('down');
    board.handleMove('right');
    board.handleMove('down');
    const boardAfter: string = board.printBoardState();
    expect(boardAfter).toEqual('[___________2___8]');
  });
  it('should handle a circle movement', () => {
    board.handleMove('right');
    board.handleMove('down');
    board.handleMove('left');
    board.handleMove('up');
    const boardAfter: string = board.printBoardState();
    expect(boardAfter).toEqual('[44_2___________4]');
  });
});
