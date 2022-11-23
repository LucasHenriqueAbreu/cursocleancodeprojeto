import Cpf from './Cpf';
import Coupom from './Cupom';
import Item from './Item';
import OrderCode from './OderCode';
import OrderItem from './OrderItem';

class Order {
  private readonly _cpf: Cpf;
  private _orderItens: OrderItem[] = [];
  private _cupom?: Coupom;
  private _code: OrderCode;

  constructor(cpf: string, date: Date = new Date(), sequence: number = 1) {
    this._cpf = new Cpf(cpf);
    this._code = new OrderCode(date, sequence);
  }

  get cpf(): string {
    return this._cpf.value;
  }

  get code(): string {
    return this._code.value;
  }

  public addItem(item: Item, quantity: number): void {
    if (this.itemAlreadyExists(item.id)) {
      throw new Error('Item already exists in the order');
    }
    this._orderItens.push(new OrderItem(item.id, quantity, item.value));
  }

  public addCoupom(cupom: Coupom): void {
    if (new Date().getTime() > cupom.expirationDate.getTime()) {
      throw new Error('Expired coupon');
    }
    this._cupom = cupom;
  }

  public getTotal(): number {
    const total = this._orderItens.reduce<number>(
      (previousValue: number, currentValue: OrderItem) => previousValue + currentValue.total,
      0);
    return this._cupom ? total - this._cupom.getDiscount(total) : total;
  }

  private itemAlreadyExists(idItem: number): boolean {
    return this._orderItens.some((orderItemAtTheTime: OrderItem) => orderItemAtTheTime.idItem === idItem);
  }
}

export default Order;