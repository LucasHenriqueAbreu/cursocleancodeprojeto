import Cpf from './Cpf';
import Coupom from './Cupom';
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

  get code(): string {
    return this._code.value;
  }

  // TODO: talvez deva mudar para um item e a quantidade, a classe não precisa saber como construiir um order item
  public addItem(orderItem: OrderItem): void {
    if (this.itemAlreadyExists(orderItem)) {
      throw new Error('Item already exists in the order');
    }
    this._orderItens.push(orderItem);
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

  private itemAlreadyExists(orderItem: OrderItem): boolean {
    return this._orderItens.some((orderItemAtTheTime: OrderItem) => orderItemAtTheTime.idItem === orderItem.idItem);
  }
}

export default Order;