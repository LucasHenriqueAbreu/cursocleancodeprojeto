export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly amount: number,
    readonly value: number,
  ) {
    if (this.amount <= 0) {
      throw new Error('Amount must have value');
    }
  }

  get total(): number {
    return this.amount * this.value;
  }
}