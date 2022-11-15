import Dimension from "./Dimension";

class Item {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly value: number
  ) {
  }
}

export default Item;