export interface ITile {

  getValue(): number;
  printTile(): string;
  increase(): number;
  clone(): ITile;
}

export class EmptyTile implements ITile {

  public increase(): number {
    return this.getValue();
  }

  public getValue(): number {
    return -1; // No tile has no value
  }

  public printTile(): string {
    return '_';
  }

  public clone(): ITile {
    return new EmptyTile();

  }
}
const START_BASE = 2;
const START_FACTOR = 1;
export class Tile implements ITile {

  private base: number = START_BASE;
  private factor: number = START_FACTOR;

  constructor() {
    return;
  }

  public increase(): number {
    this.factor++;
    return this.getValue();
  }

  public getValue(): number {
    return Math.pow(this.base, this.factor);
  }

  public printTile(): string {
    return this.getValue().toString();
  }

  public clone(): ITile {
    let tile = new Tile();
    while (this.getValue() !== tile.getValue()) {
      tile.increase();
    }
    return tile;
  }
}
