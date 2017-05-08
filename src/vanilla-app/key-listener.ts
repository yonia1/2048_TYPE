import { IPubSub, PubSub } from './utils/pub-sub';

// export type Keys = 'Up' | 'Down' | 'Left' | 'Right';

export class KeyListener {


  private pubSub: IPubSub = new PubSub(); // Todo : Inject the pubSub implementation at run time


  constructor() {
    // todo: abstract the event listener
    document.addEventListener('keydown', (key: KeyboardEvent)=>{

      const keyString: number = key.which;
      console.log(keyString + 'key was pressed');
      this.emitOnKey(keyString.toString());
    });
  }


  public addKeyListener(key: number, func: Function, ctx: any, args: string[] ): string {
    const keyString: string = key.toString();
    return this.pubSub.addListener(keyString, func, ctx, args);
  }

  private emitOnKey(key: string) {
    this.pubSub.emit(key);
  }
}
