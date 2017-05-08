import { ITile, EmptyTile, Tile } from './tile';

export type TileType = 'random' | 'empty';

export class TilesFactory {

  private static cache: Map<TileType, ITile> = new Map<TileType, ITile>();

  public static getTile(tileType: TileType): ITile {
    switch (tileType) {
      case 'random':
        return new Tile();

      default: {
        let tile = this.createCachedNullTile();
        return tile;
      }
    }

  }

  private static createCachedNullTile() {

    let tile: ITile = TilesFactory.cache.get('empty');
    if (!tile) {
      tile = new EmptyTile();
      TilesFactory.cache.set('empty', tile);
    }
    return tile;
  }
}
