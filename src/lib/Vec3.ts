export default class Vec3 {
  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly z: number
  ) {}

  public get X(): number { return this.x; }
  public get Y(): number { return this.y; }
  public get Z(): number { return this.z; }

  public new(): Vec3 { return new Vec3(this.x, this.y, this.z); }
}
