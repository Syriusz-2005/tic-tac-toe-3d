import { PlayerSignature } from "./Controller.js";


export default class GridItem {
  public occupiedBy: undefined | PlayerSignature;

  public static compare( first: GridItem, second: GridItem, third: GridItem ) {
    return (
      first.occupiedBy?.playerIndex === second.occupiedBy?.playerIndex &&
      second.occupiedBy?.playerIndex === third.occupiedBy?.playerIndex
      && first.occupiedBy?.playerIndex !== undefined
    );
  }
}