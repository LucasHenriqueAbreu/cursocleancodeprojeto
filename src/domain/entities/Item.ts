import Dimension from "./Dimension";

class Item {
  static MIN_FREIGHT = 10;
	static DEFAULT_DISTANCE = 1000;

  constructor(
    readonly id: number,
    readonly description: string,
    readonly value: number,
    readonly dimension: Dimension
  ) {
  }

  get freight(): number {
    const value = Item.DEFAULT_DISTANCE * this.dimension.volume * (this.dimension.density / 100);
    return value >= Item.MIN_FREIGHT ? value : Item.MIN_FREIGHT;
  }
}

export default Item;