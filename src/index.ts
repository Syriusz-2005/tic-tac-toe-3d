import Coordinate from "./lib/Coordinate.js";
import TicTacToe3DGame from "./lib/Game.js";


const game = new TicTacToe3DGame();
const {controller} = game;


controller.makeMove(new Coordinate(0, 0, 0));