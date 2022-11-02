import TicTac3DController from "./Controller.js";
import TicTac3dDisplayer from "./Displayer.js";

export default class TicTacToe3DGame {
  public readonly controller = new TicTac3DController();
  public readonly displayer = new TicTac3dDisplayer(this.controller);
}