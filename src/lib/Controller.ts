import Coordinate from './Coordinate.js';
import { Emitter } from './Emitter.js';
import TicTac3DGameManager from './GameManager.js';

export type PlayerSignature = { playerIndex: 0 | 1 }

export default class TicTac3DController extends Emitter<{ ready: { readyState: true }, currentPlayerChange: { newPlayer: PlayerSignature } }> {
  private readonly gameManager = new TicTac3DGameManager();
  private currentPlayer: PlayerSignature = {playerIndex: 0}; 

  constructor() {
    super();
    this.emit('ready', {readyState: true});
  }

  private setNextCurrentPlayer() {
    this.currentPlayer = this.currentPlayer.playerIndex === 0 ? { playerIndex: 1 } : { playerIndex: 0 };
    this.emit('currentPlayerChange', {newPlayer: this.currentPlayer});
  }

  public get CurrentPlayer(): PlayerSignature {
    return this.currentPlayer;
  }

  public makeMove( coordinate: Coordinate ): boolean {
    const acknowledged = this.gameManager.setItem(coordinate, this.currentPlayer);
    if (acknowledged) {
      this.setNextCurrentPlayer();
    }
    this.gameManager.logGrid();
    console.log(acknowledged, this.gameManager.checkForWin());
    return acknowledged;
  }
}
