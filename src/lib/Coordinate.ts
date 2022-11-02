import Vec3 from "./Vec3.js";

export type CoordinateValue = 0 | 1 | 2;

export default class Coordinate extends Vec3 {
  public static *row() {
    for (let i: CoordinateValue = 0; i < 3; i++) {
      yield i as CoordinateValue;
    }
  }

  constructor(
    x: CoordinateValue,
    y: CoordinateValue,
    z: CoordinateValue,
  ) {
    super(x, y, z);
  }

}