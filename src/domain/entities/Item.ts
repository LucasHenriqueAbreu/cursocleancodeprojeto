import Dimension from "./Dimension";

class Item {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly value: number,
    readonly dimension: Dimension,
  ) {
  }
}

export default Item;