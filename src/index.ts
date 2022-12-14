import Coordinate from "./lib/Coordinate.js";
import TicTacToe3DGame from "./lib/Game.js";


const game = new TicTacToe3DGame();
const {controller,displayer} = game;

controller.on('win', (event) => {
  console.log('Player', event.player.playerIndex, 'won!');
});
controller.on('currentPlayerChange', () => {
  displayer.update();
  displayer.toFile('test.png');
});

controller.makeMove(new Coordinate(1, 1, 1));
//player 0
controller.makeMove(new Coordinate(0, 0, 0));
// //p 1
controller.makeMove(new Coordinate(0, 0, 0));
//p 0
controller.makeMove(new Coordinate(0, 0, 2));
//p 1
//p 0
controller.makeMove(new Coordinate(0, 0, 1));
//p 1
controller.makeMove(new Coordinate(2, 0, 0));