export default class Coupom {
  constructor(
    readonly name: string, 
    readonly percent: number,
    readonly expirationDate: Date,
  ) {}

  public getDiscount(value: number): number {
    return (value * this.percent) / 100;
  }
}