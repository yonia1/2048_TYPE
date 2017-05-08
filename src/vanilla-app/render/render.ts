import { AbstractAnimationFactory, Animation, AnimationType } from './animations/animationFactory';
import { setTimeout } from 'timers';

export interface IGameRender {

  setTile(i: number, j: number, width: number, txt: any, shouldAnimate?: boolean): void;
}

export class HtmlGameRender implements IGameRender {

  constructor(private animationFactory: AbstractAnimationFactory) {

  }

  public setTile(i: number, j: number, width: number, txt: any, shouldAnimate: boolean = false) {
    const value: string = this.getParsedValue(txt);
    const tileElement = this.getTileElement(i, j, width);
    this.clearOldTile(tileElement);
    this.updateInnerTile(value, tileElement, shouldAnimate);

  }



  private updateInnerTile(value: string, tileElement: Element, shouldAnimate: boolean) {


      console.log('update txt')
      const childElement: Element = document.createElement('div');
      childElement.innerHTML = `${value}`;
      childElement.classList.add('tile-inner');
      tileElement.appendChild(childElement);
      if (shouldAnimate) {
        this.handleAnimations(tileElement);
      }



  }
  private handleAnimations(tileElement: Element) {

    const animation: Animation = this.animationFactory.getAnimation('fade-in');
    (tileElement as any).animate(animation.keyframes, animation.options);

  }
  private getTileElement(i: number, j: number, width: number) {
    const boardContainer: Element = document.querySelector('.divTableBody');
    const {rowIndex, columnIndex} = this.getCoordinates(i, j, width);
    const children: NodeListOf<Element> = boardContainer.getElementsByClassName('divTableRow');
    const row: Element = children.item(rowIndex);
    const tileElement: Element = row.getElementsByClassName('divTableCell').item(columnIndex);
    return tileElement;
  }

  private clearOldTile(tileElement: Element): boolean {
    if (tileElement.children.length) {
      // this.handleAnimations(true, tileElement);
      tileElement.removeChild(tileElement.children[0]);
      return true;
    }
    return false;
  }

  private getParsedValue(value: any) {
    return value > 0 ? value.toString() : '';
  }

  private getCoordinates(i: number, j: number, width: number) {

    const rowIndex: number = i;
    const columnIndex: number = j;
    return {rowIndex, columnIndex};
  }

  private selectAnimation(element: Element): AnimationType {
    const childCound: number = element.childElementCount;
    return (childCound === 0 ? 'fade-in' : 'fade-out');
  }


}
