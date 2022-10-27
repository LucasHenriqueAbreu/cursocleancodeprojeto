export default class Cupom {
  constructor(
    readonly name: string, 
    readonly percent: number,
  ) {}

  public getDiscount(value: number): number {
    return (value * this.percent) / 100;
  }
}