import { EmptyTile, Tile } from './tile';
describe('test nullTile functionality', () => {
  const nullTile: EmptyTile = new EmptyTile();
  it('should keep the same value after increase', () => {
    const valueBefore: number = nullTile.getValue();
    nullTile.increase();
    const valueAfter: number = nullTile.getValue();
    expect(valueBefore).toEqual(valueAfter);
  });
  it('should have a non positive value ', () => {
    expect(nullTile.getValue()).toBeLessThan(0);
  });

  it('should be able to print an empty tile', () => {
    expect(nullTile.printTile()).toEqual('_');
  });
  it('should be cloneable ', () => {
    expect(nullTile.clone()).toBeDefined();
  });
});

describe('test nullTile functionality', () => {
  let tile: Tile = new Tile();
  it('should change value after increase', () => {
    const valueBefore: number = tile.getValue();
    tile.increase();
    const valueAfter: number = tile.getValue();
    expect(valueBefore).toBeLessThan(valueAfter);
  });
  it('should be 2 or 4 at first', () => {
    tile = new Tile();
    expect(tile.getValue()).toBeGreaterThanOrEqual(2);
    expect(tile.getValue()).toBeLessThanOrEqual(4);
  });

  it('should be able to print a tile', () => {
    expect(tile.printTile()).not.toEqual('_');
  });
  it('should be cloneable ', () => {
    expect(tile.clone()).toBeDefined();
  });
});
