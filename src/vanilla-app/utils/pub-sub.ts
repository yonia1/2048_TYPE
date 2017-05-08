let GUID: number = -1;
export interface IPubSubObject {
  guid: number;
  func: Function;
  context: Object;
  args: any[];
}
export interface IPubSub {
  addListener: (topic: string, func: Function, context: any, args: any[]) => string
  removeListener: (id: string) => void;
  emit: (topic: string) => void;
  contains: (topic: string, id: string) => boolean;
}
export class PubSub implements IPubSub {
  private topics: {} = {};  // todo switch to Map


  public addListener(topic: string, func: Function, context: any, args: any[]): string {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push({
      guid: ++GUID,
      func: func,
      context: context,
      args: args
    })
    return GUID.toString();
  };

  public removeListener(id: string) {
    for (const topic in this.topics) {
      this.topics[topic] = this.topics[topic].filter((item: IPubSubObject) => {
        return item.guid != Number.parseInt(id)
      });
    }
  };

  public emit(topic: string): void {
    if (!this.topics[topic]) return;

    this.topics[topic].forEach((item: IPubSubObject) => {
      item.func.apply(item.context);
    });
  }

  public contains(topic: string, id: string): boolean {
    if (!this.topics[topic]) {
      return false;
    }
    return (this.topics[topic].filter((item: IPubSubObject) => {
      return item.guid == Number.parseInt(id)
    }).length > 0);
  }
}
