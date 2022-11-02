import Coordinate from "./lib/Coordinate.js";
import TicTacToe3DGame from "./lib/Game.js";


const game = new TicTacToe3DGame();
const {controller,displayer} = game;

controller.on('win', (event) => {
  console.log('Player', event.player.playerIndex, 'won!');
  displayer.update();
  displayer.toFile('test.png');
});

//player 0
controller.makeMove(new Coordinate(0, 0, 0));
//p 1
controller.makeMove(new Coordinate(0, 0, 0));
//p 0
controller.makeMove(new Coordinate(0, 0, 2));
//p 1
controller.makeMove(new Coordinate(1, 0, 0));
//p 0
controller.makeMove(new Coordinate(0, 0, 1));
//p 1
controller.makeMove(new Coordinate(2, 0, 0));