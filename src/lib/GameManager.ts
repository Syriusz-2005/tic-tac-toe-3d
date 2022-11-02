import { PlayerSignature } from "./Controller.js";
import Coordinate, { CoordinateValue } from "./Coordinate.js";
import GridItem from "./GridItem.js";


export default class TicTac3DGameManager {
  private readonly grid: (readonly (readonly (readonly GridItem[])[])[]) = 
    [
      [
        [ new GridItem(), new GridItem(), new GridItem() ], 
        [ new GridItem(), new GridItem(), new GridItem() ],
        [ new GridItem(), new GridItem(), new GridItem() ],
      ],
      [
        [ new GridItem(), new GridItem(), new GridItem() ],
        [ new GridItem(), new GridItem(), new GridItem() ],
        [ new GridItem(), new GridItem(), new GridItem() ],
      ],
      [
        [ new GridItem(), new GridItem(), new GridItem() ],
        [ new GridItem(), new GridItem(), new GridItem() ],
        [ new GridItem(), new GridItem(), new GridItem() ],
      ],
    ];

  public get Grid() { return this.grid }
  public logGrid() {
    console.log(this.grid[0])
    console.log(this.grid[1])
    console.log(this.grid[2])
  }

  private gridGetXSlice( x: CoordinateValue ) {
    const grid: GridItem[][] = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[i][j] = this.grid[i][j][x];
      }
    }
    return grid;
  }

  private gridGetYSlice( y: CoordinateValue ) {
    const grid: GridItem[][] = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[i][j] = this.grid[i][y][j];
      }
    }
    return grid;
  }

  private getItem( c: Coordinate ) {
    return this.grid[c.Z][c.Y][c.X];
  }

  public setItem(c: Coordinate, value: PlayerSignature): boolean {
    const item = this.getItem(c);
    if (item.occupiedBy !== undefined) return false;
    item.occupiedBy = {...value};
    return true;
  }

  private checkSlice( slice: readonly (readonly GridItem[])[] ): PlayerSignature | undefined {
    for (const row of slice) {
      const foundWin = GridItem.compare( row[0], row[1], row[2] );
      if (foundWin) return row[0].occupiedBy;
    }

    for (const i of Coordinate.row()) {
      const foundWin = GridItem.compare(slice[0][i], slice[1][i], slice[2][i]);
      if (foundWin) return slice[0][i].occupiedBy;
    }
    
    const foundCross1 = GridItem.compare(slice[0][0], slice[1][1], slice[2][2]);
    if (foundCross1) return slice[1][1].occupiedBy;

    const foundCross2 = GridItem.compare(slice[2][0], slice[1][1], slice[0][2]);
    if (foundCross2) return slice[1][1].occupiedBy;

    return undefined;
  }

  public checkForWin(): PlayerSignature | undefined {
    for (let z: CoordinateValue = 0; z < 3; z++) {
      const isWin = this.checkSlice(this.grid[z]);
      if (isWin) return isWin;
    }
    
    for (let x: CoordinateValue = 0; x < 3; x++) {
      const slice = this.gridGetXSlice(x as CoordinateValue);
      const isWin = this.checkSlice(slice);
      if (isWin) return isWin;
    }

    for (let y: CoordinateValue = 0; y < 3; y++) {
      const isWin = this.checkSlice(this.gridGetYSlice(y as CoordinateValue));
      if (isWin) return isWin;
    }

    return undefined;
  }
}