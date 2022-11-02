import Vec3 from "./Vec3.js";

export type CoordinateValue = 0 | 1 | 2;

export default class Coordinate extends Vec3 {
  constructor(
    x: CoordinateValue,
    y: CoordinateValue,
    z: CoordinateValue,
  ) {
    super(x, y, z);
  }
}