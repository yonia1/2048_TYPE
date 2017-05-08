export type AnimationType = 'fade-in' | 'fade-out';

export  interface Animation {
  keyframes: any[];
  options: object;

}

export abstract class AbstractAnimationFactory {
  public getAnimation(type: AnimationType): Animation {
    return null;
  };
}
const DURATION = 1500; // in ms

export class HtmlAnimationFactory extends AbstractAnimationFactory {

  public getAnimation(type: AnimationType): Animation {
    switch (type) {
      case ('fade-in'):
        return {
          keyframes: [
            // keyframes
            {
              visibility: 'hidden',
              opacity: 0
            },
            {visibility: 'visible', opacity: 1}
          ],
          options: {
            // timing options
            duration: DURATION,

          }
        };
      case ('fade-out'):
        return {
          keyframes: [
            // keyframes
            {
              visibility: 'visible',
              opacity: 1
            },
            {visibility: 'hidden', opacity: 0}
          ],
          options: {
            // timing options
            duration: DURATION / 3,

          }
        };
      default:
        return;
    }

  }
}

