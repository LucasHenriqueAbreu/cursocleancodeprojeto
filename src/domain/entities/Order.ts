import Cpf from './Cpf';
import Coupom from './Cupom';
import OrderItem from './OrderItem';

export default class Order {
  private readonly cpf: Cpf;
  private orderItens: OrderItem[] = [];
  private cupom?: Coupom;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }

  public addItem(item: OrderItem): void {
    this.orderItens.push(item);
  }

  public addCoupom(cupom: Coupom): void {
    if (new Date().getTime() > cupom.expirationDate.getTime()) {
      throw new Error('Expired coupon');
    }
    this.cupom = cupom;
  }

  public getTotal(): number {
    const total = this.orderItens.reduce<number>(
      (previousValue: number, currentValue: OrderItem) => previousValue + currentValue.total,
      0);
    return this.cupom ? total - this.cupom.getDiscount(total) : total;
  }

}