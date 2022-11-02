import TicTac3DController from "./Controller.js";
import TicTac3DGameManager from "./GameManager.js";



export default class TicTacToe3DGame {
  private readonly players = [0, 1];

  constructor(
    private readonly controller: TicTac3DController,
    private readonly gameManager: TicTac3DGameManager,
  ) {}


}