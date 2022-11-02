import TicTac3DController from "./Controller.js";
import Cs from "canvas";
import * as fs from "fs/promises";

const angleToRadian = function (angle: number) {
  return (Math.PI / 180) * angle;
};

export default class TicTac3dDisplayer {
  private static CANVAS_WIDTH = 600;
  private static CANVAS_HEIGHT = 200;
  private static GRID_THICKNESS = 5;
  private static CELL_SIZE = 66;

  private readonly canvas = Cs.createCanvas(
    TicTac3dDisplayer.CANVAS_WIDTH,
    TicTac3dDisplayer.CANVAS_HEIGHT
  );
  private readonly ctx = this.canvas.getContext("2d");

  private renderGridOnce(startX: number, gridIndex: number) {
    this.ctx.fillRect(
      startX + TicTac3dDisplayer.CELL_SIZE,
      0,
      TicTac3dDisplayer.GRID_THICKNESS,
      TicTac3dDisplayer.CANVAS_HEIGHT
    );
    this.ctx.fillRect(
      startX + TicTac3dDisplayer.CELL_SIZE * 2,
      0,
      TicTac3dDisplayer.GRID_THICKNESS,
      TicTac3dDisplayer.CANVAS_HEIGHT
    );

    this.ctx.fillRect(
      startX,
      TicTac3dDisplayer.CELL_SIZE,
      TicTac3dDisplayer.CELL_SIZE * 3,
      TicTac3dDisplayer.GRID_THICKNESS
    );
    this.ctx.fillRect(
      startX,
      TicTac3dDisplayer.CELL_SIZE * 2,
      TicTac3dDisplayer.CELL_SIZE * 3,
      TicTac3dDisplayer.GRID_THICKNESS
    );

    let index = 0;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        this.ctx.textAlign = "right";
        this.ctx.fillText(
          `${gridIndex}.${index}`,
          startX +
            x * TicTac3dDisplayer.CELL_SIZE +
            TicTac3dDisplayer.CELL_SIZE,
          y * TicTac3dDisplayer.CELL_SIZE + TicTac3dDisplayer.CELL_SIZE
        );
        index++;
      }
    }
  }

  private renderGrid() {
    this.ctx.fillStyle = "white";
    this.renderGridOnce(0, 0);
    this.renderGridOnce(TicTac3dDisplayer.CELL_SIZE * 3, 1);
    this.renderGridOnce(TicTac3dDisplayer.CELL_SIZE * 3 * 2, 2);
  }

  private render( gridId: number, fieldX: number, fieldY: number, playerIndex: 0 | 1 ) {
    const CELL_SIZE = TicTac3dDisplayer.CELL_SIZE;
    const startX = gridId * CELL_SIZE * 3;
    const cellX = startX + (fieldX + 1) * CELL_SIZE;
    const cellY = (fieldY  + 1) * CELL_SIZE;

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 4;

    if (playerIndex === 0) {
      this.ctx.beginPath();
      this.ctx.arc(
        startX + (fieldX + 1) * CELL_SIZE - CELL_SIZE/2,
        (fieldY + 1) * CELL_SIZE - CELL_SIZE/2,
        CELL_SIZE / 2.2,
        0,
        angleToRadian(360)
      );
      this.ctx.stroke();
    } else if (playerIndex === 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(cellX, cellY);
      this.ctx.lineTo(cellX + CELL_SIZE, cellY + CELL_SIZE);
      this.ctx.moveTo(cellX, cellY + CELL_SIZE);
      this.ctx.lineTo(cellX + CELL_SIZE, cellY);
      this.ctx.stroke();
    }
  }

  constructor(private readonly controller: TicTac3DController) {
    this.renderGrid();
  }

  public update( winnerName?: string) {
    const grid = this.controller.GameManager.Grid;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const item = grid[z][y][x];
          const playerIndex = item.occupiedBy?.playerIndex;
          if (playerIndex !== undefined) {
            this.render(z, x, y, playerIndex);
          }
        }
      }
    }

    if (this.controller.playerWon) {
      this.ctx.lineWidth = 10;
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'red';
      this.ctx.font = 'bold 20px serif';
      this.ctx.fillText(`Game won by player ${winnerName ?? this.controller.playerWon.playerIndex}!`, TicTac3dDisplayer.CANVAS_WIDTH/2, TicTac3dDisplayer.CANVAS_HEIGHT / 2 );
    }
  }

  public async toFile(fileName: string) {
    await fs.writeFile(fileName, this.canvas.toBuffer());
  }

  public async getBuffer() {
    return this.canvas.toBuffer();
  }
}
